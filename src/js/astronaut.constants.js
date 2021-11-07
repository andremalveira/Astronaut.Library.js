  
  const loading = {
    start(e, options) {
      var bg = (options && options.style) ? options.style.bg : '',
          spinner = (options && options.style) ? options.style.spinner : ''
      e.style.display='relative'
      document.documentElement.setAttribute('loading','')
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
        document.documentElement.removeAttribute('loading')
        setTimeout(() => {if(GET("#loading")){GET("#loading").remove()}}, 200);
      }
    }, 
    auto(selector, options) {
      var time = (options && options.time) ? options.time : 500,
          iframeLoaded =  (options && options.iframeLoaded) ? options.iframeLoaded : false;

      loading.start(selector, options)

      if(iframeLoaded){
        document.querySelectorAll('#layout [window] iframe').forEach(e => {
          e.addEventListener('load', ()=> {
            loading.stop();
            background.check()
          })
        })
      } else {
        setTimeout(() => {
          loading.stop();
        }, time);
      }
    }
  }

  const themeColor = {
    toggle(themeValue) {
      var themeDefault = THEME_COLOR_DEFAULT,
          newTheme = (themeValue) 
          ? themeValue
          : themeDefault;

      HTML.setAttribute('themecolor', newTheme)
      return themeDefault
    },
    check() {
      if(storageLocal.get()){
        if(storageLocal.get().themeColor) {
          themeColor.toggle(storageLocal.get().themeColor)
        } else {themeColor.toggle()}
      } else {themeColor.toggle()}
    },
    actual(){
      var themeDefault = this.toggle();
      if(storageLocal.get() && storageLocal.get().themeColor){
       return storageLocal.get().themeColor
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
    update(){
      chrome.storage.local.get(function (result) {
        if (result != undefined) {
          localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(result)); 
        }
      })
    },
    set(id, value, i){
      chrome.storage.local.set({[id]:value }, () =>{
        storageLocal.update()
      });
    },
    remove(id){
      chrome.storage.local.remove([id], (result) => {
        storageLocal.update()
      });
    },
    cacheData(dataName, data) {
      var cacheData = 'apiCacheData', dataName = (dataName) ? dataName : ''
    
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
    },
    noShared: {
      get(id) {
        if(localStorage.getItem(LOCALSTORAGE_NAME_NOSHARED)){
          if(id){
            return JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME_NOSHARED))[id]
          } else {
            return JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME_NOSHARED))
          }
  
        } else {return false}
      },
      set(id, value){
        var stored = storageLocal.noShared.get()
       
        if(stored) {
          stored[id] = value
          localStorage.setItem(LOCALSTORAGE_NAME_NOSHARED, JSON.stringify(stored));
        } else {
          var newValue = {[id]:value}
          localStorage.setItem(LOCALSTORAGE_NAME_NOSHARED, JSON.stringify(newValue));
        }
      },
      remove(id) {
        var stored = storageLocal.noShared.get()
        if(stored && stored[id]){
          delete stored[id] 
          localStorage.setItem(LOCALSTORAGE_NAME_NOSHARED, JSON.stringify(stored));
          if(JSON.stringify(stored) === JSON.stringify({})){
            localStorage.removeItem(LOCALSTORAGE_NAME_NOSHARED);
          }
        }
      }

    }
  }

/*   storageLocal.remove('liveServer') */
  const konsole = {
    success(text) {
      console.log(
        `%cAstronaut.Localhost: ✔ ${text}`,
        ` color: #8effa2;background-color: #01a96b;padding: 0.3rem 1.8rem 0.3rem 0.3rem;
          font-size:0.7rem;border-radius:0.2rem;border: solid 1px #10ec57;
        `);
    },
    error(text) {
      console.log(
        `%cAstronaut.Localhost: ✖ ${text}`,
        ` color: #ff8080;background-color: #290000;padding: 0.3rem 1.8rem 0.3rem 0.3rem;
          font-size:0.7rem;border-radius:0.2rem;border: solid 1px #5c0000;
        `);
    },
    info(text){
      console.log(
        `%cAstronaut.Localhost: ${text}`,
        ` color: #71b9ec;background-color: #053c63;padding: 0.3rem 1.8rem 0.3rem 0.3rem;
          font-size:0.7rem;border-radius:0.2rem;border: solid 1px #1667a0;
        `);
    }
  }

  const getImage = (name) => {
    return chrome.runtime.getURL(`src/img/${name}`,)
  }

  const liveServer = {
    check(){
      chrome.storage.local.get('liveServer', (result) => {
        if(result.liveServer != undefined && result.liveServer.isEnable){
          liveReload.apache(result.liveServer)
        }
      });
    },
    isEnabled:{
      enable(type, input){
        var btnLiveServer = document.querySelector('[window]#preview .navbar .icon[option="liveserver"]');
        btnLiveServer.setAttribute('enabled', (type) ? type : '')

        var inputSelector = btnLiveServer.querySelector(`#${input}`)
        if(inputSelector && input){
          inputSelector.setAttribute('required','')
        } else if(inputSelector && input == false) {
          inputSelector.removeAttribute('required')
        }
      }, 
      disable(){
        var btnLiveServer = document.querySelector('[window]#preview .navbar .icon[option="liveserver"]');
        if(btnLiveServer){
          btnLiveServer.removeAttribute('enabled','')
        }

      },
      check(){
        var storedSettings = storageLocal.get(),
            isLiveServerEnabled = (storedSettings && storedSettings.liveServer) 
        ? (storedSettings.liveServer.isEnable && storedSettings.liveServer.actualUrl != '' && storedSettings.liveServer.liveServerUrl != '') 
        ? 'enabled' 
        : (storedSettings.liveServer.isEnable && storedSettings.liveServer.actualUrl != '' && storedSettings.liveServer.liveServerUrl == '') 
        ? 'error'  
        : false : false;
       

        if(isLiveServerEnabled != 'error' && isLiveServerEnabled){
          liveServer.isEnabled.enable(false, false)
        } else if(isLiveServerEnabled == 'error'){
          liveServer.isEnabled.enable('error')
        } else {
          liveServer.isEnabled.disable()
        }
      }
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
      var iframe = preview.get('iframe');
      iframe.addEventListener('load', () => {
        var documentframe = iframe.contentDocument,
        styled = documentframe.createElement('style');
        styled.textContent = `
          html::-webkit-scrollbar {
            width: 10px;
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
      })

    }, 200);
  }

  const keypress = {
    down(params) {
      var key=(params)?params.key:false,
          func=(params)?params.func:false,
          ctrl=(params)?params.ctrl:false, // ctrl: Boolean - true/false
          shift=(params)?params.shift:false, // shift: Boolean - true/false
          selector,condition;

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

  const headata =  {
    favicon(doc){
      var shortcut = doc.head.querySelector('link[rel="shortcut icon"]') ?? false
      var icon = doc.head.querySelector('link[rel="icon"]') ?? false
        if(shortcut) return shortcut
        else if(icon) return icon
        else return false
    },
    themeColor(doc) {
      var metaThemeColor = doc.head.querySelector('meta[name="theme-color"]') ?? false
          if(metaThemeColor) return metaThemeColor
          else return false
    }
  }

  const metaThemeColorMobile = {
    update(iframe){
      function setThemeColor(statusBar, dom) {
        if(headata.themeColor(dom)){
          var contentThemeColor = headata.themeColor(dom).content;
  
          if(contentThemeColor != '' && statusBar) {
            statusBar.style.background=contentThemeColor
          } 
        } else {
          if(statusBar) statusBar.style.background=''
        }
      }

      window.addEventListener('load', () => {
        var statusBar = window.frameElement.closest('.display').querySelector('.status-bar');
        setThemeColor(statusBar, document)
      })

     if(iframe){
        var statusBar = iframe.closest('.display').querySelector('.status-bar');
        setThemeColor(statusBar, iframe.contentWindow.document)
     }
       
      
    }
  }

  const titleTab = {
    update() {
      window.addEventListener('load', () => {   
        if(document.title.length > 0){
          parent.document.title = document.title
          var newIcon = ''

          setTimeout(() => {
            if(headata.favicon(document)){
              newIcon = headata.favicon(document).href 
            } else {
              newIcon = getImage('svg/file-earmark.svg')
              parent.document.title +=  ` - ${langText.faviconNotDefined}`
              console.error(`${langText.faviconNotDefined} in ${location.href}`)
            }
            headata.favicon(parent.document).href  = newIcon
          }, 0);
        } else {
          this.default()
        }
      })
    },
    default(){
      if(DOCUMENT_MAIN){
        if(headata.favicon(document)){
          headata.favicon(document).remove()
        }
        HEAD.insertAdjacentHTML('beforeend', `<link rel="shortcut icon" href="${getImage('svg/favicon.svg')}" type="image/x-icon">`)
        document.title='Astronaut - '+location.host.capitalize()
      } else {
        if(headata.favicon(parent.document)){
          headata.favicon(parent.document).remove()
        }
        parent.document.head.insertAdjacentHTML('beforeend', `<link rel="shortcut icon" href="${getImage('svg/favicon.svg')}" type="image/x-icon">`)
        parent.document.title='Astronaut - '+parent.location.host.capitalize()
      }


    }
  }

  const defineHead = (head) => {
    var metas = `
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible"   content="IE=edge">
      <meta name="viewport"                content="width=device-width, initial-scale=1.0">
      <meta property="og:site_name"        content="Astronaut Library.js"> 
      <meta property="og:type"             content="website" />
      <meta property="og:url"              content="https://andremalveira.github.io/astronaut/" />
      <meta property="og:title"            content="Astronaut Library.js"/>
      <meta property="og:description"      content="Astronaut is a small Library with useful resources for Developers!" />
      <meta property="og:image"            content="src/img/svg/astronaut.svg" />
      <meta name="description"             content="Astronaut is a small Library with useful resources for Developers!" />
      <meta name="keywords"                content="programming, development, coding, javascript, library, extension, liveserver, preview, mobile, desktop">
    `
    head.insertAdjacentHTML('afterbegin', metas)
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

  const background = {
    insert(url, blurValue){
      astronaut.insert.css(`
[astronaut] body::before {
  animation: background 0.5s;
  background: var(--bg-primary) ${(url)? `url(${url})` : ''} no-repeat;
  background-size: cover; 
  ${(blurValue) ? `filter:blur(${blurValue}px);` : ''}
}
@keyframes background {
  0% {opacity: 0;transform: scale(1.1);}
  10% {transform: scale(1.1);}
  100% {opacity: 1;transform: scale(1);}
}

`, 'background', false, parent.document)

    },
    remove(){
      storageLocal.remove('background')
      astronaut.remove.css('background', parent.document)
    },
    check(){
      if(storageLocal.get('background')){
        this.insert(storageLocal.get('background'), storageLocal.get('blurBackground'))
      }
    }
  }