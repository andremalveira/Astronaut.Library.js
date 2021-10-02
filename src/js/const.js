  
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
    change(favicon, title) {
      document.title = title
      HEAD.get('link[rel="shortcut icon"]').href = favicon
    },
    default(){
      HEAD.insertAdjacentHTML('beforeend', `<link rel="shortcut icon" href="src/img/favicon.svg" type="image/x-icon">`)
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

