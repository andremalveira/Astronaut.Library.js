  
  const loading = {
    start(e, options) {
      var bg = (options) ? options.style.bg : '',
          spinner = (options) ? options.style.spinner : ''
  
      e.insertAdjacentHTML('beforeend',`
        <div id="loading" style="${bg}">
        <svg class="spinner" viewBox="0 0 50 50" style="${spinner}">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="3"></circle>
        </svg>
        </div>
      `);
    },
    stop() {
      if(GET("#loading")){
        var L = GET("#loading");
        L.style.transition='ease 0.2s';
        L.style.opacity='0';
        setTimeout(() => {if(GET("#loading")){GET("#loading").remove()}}, 200);
      }
    }, 
    auto(selector, options) {
      var time = (options) ? options.time : 500
      loading.start(selector, options)
      setTimeout(() => {
        loading.stop();
      }, time);
    }
  }

  const theme = {
    toggle(themeValue) {
      var themeDefault = 'github',
          newTheme = (themeValue) 
          ? themeValue
          : themeDefault;

      HTML.setAttribute('themecolor', newTheme)
      return themeDefault
    },
    check() {
      if(storageLocal.get()){
        if(storageLocal.get().theme) {
          theme.toggle(storageLocal.get().theme)
        } else {theme.toggle()}
      } else {theme.toggle()}
    },
    actual(){
      var themeDefault = this.toggle();
      if(storageLocal.get() && storageLocal.get().theme){
       return storageLocal.get().theme
      } else {
        return themeDefault
      }
    }
  }
        
  const storageLocal = {
    get(params) {
      if(JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME))){
        if(params){
          return JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME))[params]
        } else {
          return JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME))
        }

      } else {return false}
    },
    set(id, value){
      if(storageLocal.get()){
        var obj = storageLocal.get()
            obj[id] = value
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(obj));
      } else {
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify({[id]:value}));
      }
    },
    remove(id){
      localStorage.removeItem([id]);
    },
    cacheData(dataName, data) {
      var cacheData = 'cacheData', dataName = (dataName) ? dataName : ''
    
      chrome.storage.local.get(function (result) {
        if (result[cacheData]) {
          result[cacheData][dataName] = data
          chrome.storage.local.set({[cacheData]:result[cacheData]}, () =>{
            storageLocal.update()
          });  
        } else {
          chrome.storage.local.set({[cacheData]:{[dataName]:data} }, () =>{
            storageLocal.update()
          });
        }
      })
    }
  }

  const contextMenu = (options) => { 
    return `
      <div id="contextMenu">
        <div class="contextMenuCustom">
          ${options}
        </div>
        <span class="caret">${icons.caret}</span>
        <span class="caret before">${icons.caret}</span>
      </div>
    `
  }

  const custonScrollBarinFrame = () => {
    setTimeout(() => {
      var documentframe = preview.get('iframe').contentDocument
      var styled = documentframe.createElement('style')
      styled.textContent = `
      html::-webkit-scrollbar {
        width: 10px;
        border-radius: 0.4rem;
        background: #373e47;
      }
      html::-webkit-scrollbar-thumb {
        height: 8px;
        background: #22272e;
        border-radius: 0.4rem;
      }
      html::-webkit-scrollbar-track {
        border-radius: 0.4rem;
      }
    `
      documentframe.head.appendChild(styled)
    }, 200);
  }

  const keypress = {
    down(params) {
      var key=(params)?params.key:false,func=(params)?params.func:false,selector,
      ctrl=(params)?params.ctrl:false,shift=(params)?params.shift:false,condition;
      if(params.selector) {selector = params.selector} else {selector = window}
  
      selector.addEventListener('keydown', e => {
        (!ctrl && !shift) 
        ? (condition = e.keyCode == key) 
        : (ctrl && !shift) 
        ? (condition = e.ctrlKey && e.keyCode == key) 
        : (shift && !ctrl)
        ? (condition = e.shiftKey && e.keyCode == key) 
        : (ctrl && shift)
        ? (condition = e.ctrlKey && e.shiftKey && e.keyCode == key) : false;
        
        if(condition){
          e.preventDefault()
          func()
        }
      })
    }
  }


  const titleTab = {
    change(title) {
      document.title = TITLE_DEFAULT + ` - ${title.capitalize()}`
      document.head.querySelector('meta[property="og:title"]').setAttribute('content', TITLE_DEFAULT + ` - ${title.capitalize()}`)
    },
    default(){
      document.title = TITLE_DEFAULT 
      document.head.querySelector('meta[property="og:title"]').setAttribute('content', TITLE_DEFAULT)
    }
  }

  const fullscreen = {
    getFullScreenElement() {
      return document.fullscreenElement
          || document.webkitFullscreenElement
          || document.mozFullscreenElement
          || document.msFullscreenElement;
    },
    request() {
      document.documentElement.requestFullscreen()
        .catch(console.error)
    },
    exit() { 
      if(this.getFullScreenElement()){
        document.exitFullscreen()
      }

    }
  }

  const scrooll = {
    smooth(selector){
      var all = document.querySelectorAll('a[smooth]')
      all.forEach(a => {
        var check = false;
        a.addEventListener('click', () => {
          if(!check){
            selector.style.scrollBehavior = 'smooth'
            check = true
          }
        })
      })
    }
  }

  const hyperlink = () => {
    var sections = document.querySelectorAll('[hyperlink]');

    sections.forEach(s => {
      var id = s.getAttribute('hyperlink')

      s.style.position='relative'
      s.insertAdjacentHTML('beforeend', `

      <a href="#${id}" class="s-hyperlink" title="Copy Hash">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
          <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
          <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
        </svg>
      </a>
      `)

      s.querySelector('a.s-hyperlink').addEventListener('click', e => {
        e.preventDefault()
        var href=  s.querySelector('a.s-hyperlink').href
        astronaut.copy(href)
      })
    })
  }
  