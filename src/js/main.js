
window.addEventListener('load', () => {
  var BODY = document.body

  //initial changes
  theme.check()
  document.title = TITLE_DEFAULT
  //insert new html structure 
  BODY.insertAdjacentHTML('afterbegin', structure) //STRUCTURE IN INDEX.HTML
  
  //VARIABLES ESSENCIAL
  var nav = BODY.get('nav'),
      content = BODY.get('#content'),
      main = content.get('main'),
      containerList = main.get('.container-list'),
      listItems = containerList.get('#list-items'),
      layout = main.get('#layout'),
      preview = main.get('#preview'),
      itemHTML=''
      listIsDisplayed  = true,
      newModalDisplayed = false,
      liveServerFunctionsInit = true;

      const layoutMode = {
        desktop(modevalue){
          layout.setAttribute('layout', 'desktop')
          storageLocal.set('layoutMode', modevalue)
          layoutMode.appearanceMoblie('remove', preview)
          if(layout.get(`.preview-mobile`)){layout.get(`.preview-mobile`).remove()}
          devicesMobile.default(preview)
        },
        mobile(modevalue){
          layout.setAttribute('layout', 'mobile')
          storageLocal.set('layoutMode', modevalue)
          layoutMode.appearanceMoblie('add', preview)
          if(layout.get(`.preview-mobile`)){layout.get(`.preview-mobile`).remove()}
          setTimeout(() => {
            devicesMobile.update(preview)
          }, 250);
        },
        double(modevalue) {
          layout.setAttribute('layout', 'double')
          storageLocal.set('layoutMode', modevalue)
          id = layout.attributes['layout'].value;
          url = layout.get(`[layout=${id}] #preview iframe`).src;
          newTab(id, url) 
          setTimeout(() => {
            devicesMobile.update(layout.get(`.preview-mobile`))
          }, 250);
          layoutMode.appearanceMoblie('remove', preview)
          devicesMobile.default(preview)
          layoutMode.appearanceMoblie('add', layout.get(`.preview-mobile`))
        },
        for(modevalue){
          (layout.attributes['layout'].value == `${modevalue}`) ? null : layoutMode[modevalue](modevalue)
        },
        iconLayout(modevalue){
          btndevices = preview.get('[option="devices"]');
          btndevices.get('.icon-layout').innerHTML=icons.layout[modevalue]
        },
        appearanceMoblie(option, element){
          var display = element.get('.display')
          if(option == 'remove') {
            if(display.get('.navigation-bar') && display.get('.status-bar')){
              display.get('.navigation-bar').remove()
              display.get('.status-bar').remove()
              element.get('.navbar [option="phoneSize"]').remove()
            }
          } else if(option == 'add') {
            optionTypeMobile = `<div class="icon" option="phoneSize" title="${langText.togglePhoneSize}"><i class="icon-layout">${icons.phone}</i></div>`
            element.get('.navbar .options:last-child').insertAdjacentHTML('afterbegin',optionTypeMobile)
            navbarEvents.eventPhoneSize(element)
            display.insertAdjacentHTML('afterbegin', `
            <div class="status-bar">
              <div class="clock" title="${langText.hour}"></div>
              <div class="notifications"></div>
              <div class="model">
                <div class="size" title="${langText.phoneScreenSize}"></div>
              </div>
            </div>
          `)
            display.insertAdjacentHTML('beforeend', `
            <div class="navigation-bar">
              ${icons.navbarMobile.triangle+
                icons.navbarMobile.circle+
                icons.navbarMobile.square}
            </div>
          `)
          display.get('.status-bar .clock').insertTime()
          }

        },
        check(){
          if(storageLocal.get('layoutMode')){
            var layoutModeValue = storageLocal.get('layoutMode');
            if(layoutModeValue != 'desktop'){
              layoutMode[layoutModeValue](layoutModeValue)
              layoutMode.iconLayout(layoutModeValue)
            } 
          }
        }
      }
      const devicesMobile = {
        size() {
          return [
            {name:'Moto G4',width:'360',height:'640'},
            {name:'Pixel 2',width:'411',height:'731'},
            {name:'Pixel 2 XL',width:'411',height:'823'},
            {name:'Iphone 5/SE',width:'320',height:'568'},
            {name:'Iphone 6/7/8',width:'375',height:'667'},
            {name:'Iphone 6/7/8 Plus',width:'414',height:'736'},
            {name:'Iphone X',width:'375',height:'812'},
          ]
        },
        default(selector) {
          selector.removeAttribute('model')
          selector.get('iframe').style.width='100%'
          selector.get('iframe').style.height='100%' 
          
        },
        change(id, selector) {
          var size = devicesMobile.size(), statusBarMobile = layout.get('.display .status-bar');
          if(selector != undefined ){
            if(id == 'default'){
              devicesMobile.default(selector)
              storageLocal.set('phoneModel', {id:id})
              statusBarMobile.get('.model .size').innerText=''
            } else {
              selector.get('iframe').style.width=selector.get('iframe').offsetWidth/16+'rem'
              selector.get('iframe').style.height=selector.get('iframe').offsetHeight/16+'rem'
              setTimeout(() => {
                selector.setAttribute('model', size[id].name)
                setTimeout(() => {         
                  statusBarMobile.get('.model .size').innerText=size[id].width+'x'+size[id].height
                  selector.get('iframe').style.width=size[id].width/16+'rem'
                  selector.get('iframe').style.height=size[id].height/16+'rem'
                }, 100);
              }, 200);
              storageLocal.set('phoneModel', {id:id,size:{width:size[id].width,height:size[id].height}})
            }
          }
        },
        update(selector) {
          if(storageLocal.get('phoneModel')){
            devicesMobile.change(storageLocal.get('phoneModel').id, selector)
          }
        }
      }
      const viewList = {
        open() {
          main.classList.add('view-list-ocult')
          nav.get('.icons#localhost').classList.add('active')
          nav.get('.icons#localhost').classList.add('fixed')
          listIsDisplayed = true
          storageLocal.set('listIsDisplayed', listIsDisplayed)
        },
        close() {
          main.classList.remove('view-list-ocult')
          nav.get('.icons#localhost').classList.remove('active')
          nav.get('.icons#localhost').classList.remove('fixed')
          listIsDisplayed = false
          storageLocal.set('listIsDisplayed', listIsDisplayed)
        }, 
        init() {
          if(listIsDisplayed){
            viewList.close()
          } else {
            viewList.open()
          }
        },
        check() {
          var listIsDisplayedStorage = storageLocal.get('listIsDisplayed');

          if(listIsDisplayedStorage === false){
             viewList.open()
          } else {
            viewList.open()
          }
        }
      }  
      const newTab = (id, url, btnMenu, page) => {
        var layoutmode = false,
            pagemode = false,
            element = `class="new-tab" tab="${id}"`,
            optionRefresh = `<div class="icon" option="refresh" title="${langText.refresh}">${icons.refresh}</div>`,
            optionInfo ='', astronautMirror = '';

        if(id == 'double'){
          layoutmode = true, 
          element = 'class="preview-mobile"'
          optionRefresh = ''
          astronautMirror = astronaut_logo
        }
        if(page){
          pagemode = 'page'
          optionInfo = `<span class="separator"></span><div class="icon" option="info" title="${langText.information}">${icons.infoCircle}</div>`
        }
        var newTabHTML = `
          <div window ${element} ${pagemode}>
            <div class="navbar">
              <div class="window-control">
                <i title="${langText.close}" option="close">${icons.windowControl.close}</i>
                <i title="${langText.minimize}" option="minimize">${icons.windowControl.minimize}</i>
                ${icons.windowControl.maximize}
              </div>
              <div class="options">
              ${optionRefresh}
              ${optionInfo}
              </div>
              <div class="bar-search">
              
              </div>
              <div class="options">
              </div>
            </div>
            <div class="display">
              ${astronautMirror}
              <iframe></iframe>
            </div>
          </div>
        `

        if(layoutmode){
          layout.insertAdjacentHTML('beforeend',newTabHTML)
          var previewMobile = layout.get(`.preview-mobile`)
          loading.start(previewMobile.get('.display'))
          setTimeout(() => {
            if(!url == undefined || !url == ''){
              previewMobile.get('.display iframe').src=url
            }
            loading.stop();
          }, 500); 
          navbarEvents.update(previewMobile)
        } else {

          if(!content.get(`.new-tab[tab="${id}"]`)){
            content.insertAdjacentHTML('beforeend',newTabHTML)

            if(content.get(`.new-tab.maximized`)) {
              var max = content.get(`.new-tab.maximized`),
                  maxId = max.attributes['tab'].value;
              max.classList.add('minimized')
              GET(`.menu #${maxId}`).classList.add('minimized')
            }

            var newTab = content.get(`.new-tab[tab="${id}"]`)
            newTab.classList.add('maximized')
            if(btnMenu != null || btnMenu != undefined){btnMenu.classList.add('maximized')}
            loading.auto(newTab.get('.display'),{time:600,style: {bg:'background:var(--bg-second)'}})
            navbarEvents.update(newTab)
            if(url){
              setTimeout(() => {
                newTab.get('.display iframe').src=url
                var iframe = newTab.get('.display iframe');
                if(id == 'database'){warnXFrame(iframe)}
              }, 500);
            } else if(page){
              var iframe = newTab.get('.display iframe');
              if(typeof window[id] === "function"){
                window[id]({iframe, theme: theme.actual(), lang:langText})
              } else {
                error(`Function ${id}() no defined!`)
              }
            }

          } else if(content.get(`.new-tab.minimized[tab="${id}"]`)) {

            if(content.get(`.new-tab.maximized:not(.minimized)`)) {
              var max = content.get(`.new-tab.maximized:not(.minimized)`),
                  maxId = max.attributes['tab'].value;
              max.classList.add('minimized')
              GET(`.menu #${maxId}`).classList.add('minimized')
            }

            content.get(`.new-tab.minimized[tab="${id}"]`).classList.remove('minimized')
            btnMenu.classList.remove('minimized')
          } else if(content.get(`.new-tab.maximized[tab="${id}"]`)) {
            content.get(`.new-tab.maximized[tab="${id}"]`).classList.add('minimized')
            btnMenu.classList.add('minimized')
          }
        }

      }
      const navbarEvents = {
        update(selector) {
        //options [navbar]
          var btnclose          = selector.get('.navbar [option="close"]'),
              btnminimize       = selector.get('.navbar [option="minimize"]'),
              btnfullscreen     = selector.get('.navbar [option="fullscreen"]'),
              btnfullscreenexit = selector.get('.navbar [option="fullscreenexit"]'),
              btnback           = selector.get('.navbar [option="back"]'),
              btnrefresh        = selector.get('.navbar [option="refresh"]'),
              btndevices        = selector.get('.navbar [option="devices"]'),
              btninfo           = selector.get('.navbar [option="info"]');

          //[event COME BACK AND ADVANCE]
          if(btnback){
            btnback.addEventListener('click', e => {
              var parentLayout = btnrefresh.closest('#layout');
              if(parentLayout == null){
                btnrefresh.closest('[window]').get('iframe').contentWindow.history.back()
              } else {
                parentLayout.getAll('[window] iframe').forEach(iframe => {
                  iframe.contentWindow.history.back()
                })
              }
            })
          }
          //[event REFRESH]
          if(btnrefresh){
            btnrefresh.addEventListener('click', e => {
              btnrefresh.get('svg').style.animationName='refresh'
              setTimeout(() => {
                btnrefresh.get('svg').style.removeProperty('animation-name')
              }, 600);
              var parentLayout = btnrefresh.closest('#layout');
              if(parentLayout == null){
                var newTab = btnrefresh.closest('[window]'), iframe = btnrefresh.closest('[window]').get('iframe');
                 
                if(newTab.attributes['tab'].value == 'database'){
                  var srcActual = iframe.src
                  iframe.src = ''
                  iframe.src = srcActual
                  console.clear()
                } else {
                  console.clear()
                  if(iframe.closest('[window][page]')){
                    var id = iframe.closest('[window][page]').attributes['tab'].value
                    if(typeof window[id] === "function"){
                      window[id]({iframe, theme: theme.actual(), lang:langText})
                    } else {
                      error(`Function ${id}() no defined!`)
                    }
                  } else {
                    iframe.contentWindow.location.reload()
                  }
                }

              } else {
                parentLayout.getAll('[window] iframe').forEach(iframe => {
                  console.clear()
                  iframe.contentWindow.location.reload() 
                })
              }
              custonScrollBarinFrame()
            })
          }

          //[event DEVICES]
          if(btndevices){
            btndevices.get('.icon-layout').addEventListener('click', e => {
              btnsLayoutMode = `
                <button class="btn" layoutmode='desktop' title="${langText.toggleDesktop}"><i>${icons.layout.desktop}</i><span>Desktop</span><i class="checked">${icons.check}</i></button>
                <button class="btn" layoutmode='mobile' title="${langText.toggleMobile}"><i>${icons.layout.mobile}</i><span>Mobile</span></button>
                <button class="btn" layoutmode='double' title="${langText.toggleDouble}"><i>${icons.layout.double}</i><span>Double</span></button>
              `
              var popupHTML = contextMenu(btnsLayoutMode)
              btndevices.insertAdjacentHTML('beforeend', popupHTML)

              if(storageLocal.get('layoutMode')){
                btndevices.get(`[layoutmode] i.checked`).remove()
                btndevices.get(`[layoutmode="${storageLocal.get('layoutMode')}"]`).insertAdjacentHTML('beforeend', `<i class="checked">${icons.check}</i>`)
              }
      
              btndevices.getAll('[layoutmode]').forEach(btnlayoutmode => {
                btnlayoutmode.addEventListener('click', () => {
                  modevalue = btnlayoutmode.attributes['layoutmode'].value
                  layoutMode.for(modevalue)
                  layoutMode.iconLayout(modevalue)
                  btndevices.get('#contextMenu').remove()
                  BODY.get('#overlay').remove()
                })
              })
              BODY.overlay(btndevices)
            })
          }

          //[event INFORMATION]
          if(btninfo){
            btninfo.addEventListener('click', e => {
              var newTab = btninfo.closest('[window]'),
                  tabValue = newTab.attributes['tab'].value
              newModal.start({
                contentModal: htmls[tabValue],
                btn:btninfo, id: tabValue, 
                func:false
              })
            })
          }
          //[event CLOSE]
          if(btnclose){
            btnclose.addEventListener('click', e => {
              var parentElementMain = btnclose.closest('[window]'),
                  tab = parentElementMain.attributes['tab'];
    
              if(parentElementMain.id == 'preview'){
                if(listItems.get('.item.active')){listItems.get('.item.active').classList.remove('active')}
                windowUrl.close(layout)
              } else if(parentElementMain.classList.contains('preview-mobile')){
                layoutMode.desktop('desktop')
              } else if(parentElementMain.classList.contains('new-tab')){
                parentElementMain.classList.remove('maximized')
                if(tab){nav.get('#'+tab.value).classList.remove('active')}
                setTimeout(() => {parentElementMain.remove('src')}, 500);
              }
              console.clear()
            })
          }
          //[event MINIMIZE]
          if(btnminimize){
            btnminimize.addEventListener('click', e => {
              var parentElementMain = btnclose.closest('.navbar').parentElement,
                  tab = parentElementMain.attributes['tab'];
              if(tab){
                parentElementMain.classList.add('minimized')
                nav.get('#'+tab.value).classList.add('minimized')
              }
    
            })  
          }
          //[event FULLSCREEN]
          if(btnfullscreen){
            btnfullscreen.addEventListener('click', e => {fullscreen.request()})
          }
          //[event FULLSCREENEXIT]
          if(btnfullscreenexit){
            btnfullscreenexit.addEventListener('click', e => {fullscreen.exit()})
          }
          
        },
        eventPhoneSize(selector) {
          //[event PHONE SIZE ]
          btnphoneSize      = selector.get('.navbar [option="phoneSize"]');
          if(btnphoneSize){
            btnphoneSize.get('.icon-layout').addEventListener('click', e => {
              options = ''
              deviceSize = devicesMobile.size()
              deviceSize.map((size,index) => {
                options += `<button class="btn" phoneModel='${index}' title="${size.name}"><i></i><span>${size.name}</span></button>`
              })
              btnsPhoneModel = `
                <button class="btn" phoneModel='default' title="${langText.sizeDefault}"><i></i><span>${langText.default}</span><i class="checked">${icons.check}</i></button>
                ${options}
              `
              var popupHTML = contextMenu(btnsPhoneModel)
              btnphoneSize.insertAdjacentHTML('beforeend', popupHTML)
 
              if(storageLocal.get('phoneModel')){
                btnphoneSize.get(`[phoneModel] i.checked`).remove()
                btnphoneSize.get(`[phoneModel="${storageLocal.get('phoneModel').id}"]`).insertAdjacentHTML('beforeend', `<i class="checked">${icons.check}</i>`)
              }
   
            
              btnphoneSize.getAll('[phoneModel]').forEach(btnphoneModel => {
                btnphoneModel.addEventListener('click', () => {
                  idPhone = btnphoneModel.attributes['phoneModel'].value
                  btnphoneSize.get('#contextMenu').remove()
                  BODY.get('#overlay').remove()
                  devicesMobile.change(idPhone, selector)
                })
              })

              BODY.insertAdjacentHTML('beforeend', '<div id="overlay"></div>')
              BODY.get('#overlay').addEventListener('click', () => {
                BODY.get('#overlay').remove()
                btnphoneSize.get('#contextMenu').remove()
              })
            })
          }
        }     
      }
      const windowUrl = {
        open(url, elem, focus) {
          url = (url == undefined) ? '' : url
         
          const barSearch = {
            load(params){
              var url = (params) ? params.url : false, 
                  focus = (params) ? params.focus : false, 
                  iframe = (params) ? params.iframe : false,
                  urlBar = iframe.closest('[window]').get('.navbar .bar-search #url');
             
              if(urlBar){
                urlBar.value=url
                if(focus){urlBar.focus()}
                
                if(urlBar.classList.contains('fadeonleft')){urlBar.classList.remove('fadeonleft')}
                urlBar.value=url
                setTimeout(() => {
                  urlBar.classList.add('fadeonleft')
                }, 100);
              }
            },
            update(url, iframe) {
              var urlBar = iframe.closest('[window]').get('.navbar .bar-search #url');
              if(urlBar){
                urlBar.value=url
              }
            }
          }
          const iframeLoad = () => {
            elem.get('iframe').addEventListener('load', () => {
              
              var newUrl = elem.get('iframe').contentWindow.location.href
              barSearch.update(newUrl, elem.get('iframe'))
              var preview_mobile = main.get('.preview-mobile')
              if(preview_mobile){
                preview_mobile.get('iframe').contentWindow.location.href=newUrl
              }
            })
          
          }
          var iframeLoadCheck = true
          elem.getAll('iframe').forEach(iframe => {
            loading.auto(iframe.parentElement)
            iframe.src=url
            barSearch.load({url:url, focus, iframe})
            if(iframeLoadCheck){
              setTimeout(() => {
                iframe.contentWindow.document.documentElement.addEventListener('click', ()=> {
                  iframeLoad()
                  iframeLoadCheck = false
                })
              }, 200);
            }
          })

          storageLocal.set('lastWindowUrl', url)

          if(storageLocal.get('liveServer')){
            var SLliveServer =  storageLocal.get('liveServer')
            SLliveServer.actualUrl = url
            storageLocal.set('liveServer', SLliveServer)
            reloadFunctions(SLliveServer)
          }
          //active item-list
          if(listItems.get('.item.active')){listItems.get('.item.active').classList.remove('active')}
          listItems.getAll('.item a').forEach(a => {
            if(a.attributes['src'].value == url){a.parentElement.classList.add('active')}
          })

          windowUrl.barSearch()
          storageLocal.update()
        },
        close(elem){
          elem.getAll('iframe').forEach(iframe => {
            iframe.removeAttribute('src')
            var urlBar = iframe.closest('[window]').get('.navbar .bar-search #url')
            if(urlBar){
              urlBar.classList.remove('fadeonleft')
              setTimeout(() => {
               
                urlBar.innerText=url
              }, 100);
            }
          })
          chrome.storage.local.remove('lastWindowUrl', (result) => {}); 
          if(storageLocal.get('liveServer')){
            var SLliveServer =  storageLocal.get('liveServer')
            SLliveServer.actualUrl = ''
            storageLocal.set('liveServer', SLliveServer)
          }
          storageLocal.update()
        },
        barSearch() {
          var barSearchURL = preview.get('.bar-search #url')
          barSearchURL.contentEditable = true
          barSearchURL.addEventListener('keypress', e => {
            if(e.keyCode == 13){
              e.preventDefault()
              var focus = true
              windowUrl.open(barSearchURL.value, layout, focus)
            }
          })
          barSearchURL.addEventListener('focus', e => {
            barSearchURL.classList.add('focus')
          })
          barSearchURL.addEventListener('blur', e => {
            barSearchURL.classList.remove('focus')
          })
        },
        check() {
          chrome.storage.local.get('lastWindowUrl', (result) => {
            if(result.lastWindowUrl != undefined){
              windowUrl.open(result.lastWindowUrl, layout)  

            }
          });
        }

      }
      const notify = {
        show(selector, text, options) {
          function init() {
            selector.style.display='grid'
            setTimeout(() => {
              selector.classList.add(options.type, 'show')
              selector.innerHTML=text
              if(options.btnClose){
                selector.insertAdjacentHTML('beforeend', `<i class="notify-btn-close">${icons.close}</i>`)
                selector.get('i.notify-btn-close').addEventListener('click', () => {
                  notify.close(selector, {type:options.type})
                })
              }
              if(options.image){
                selector.style.gridTemplateColumns='1fr 40%'
                selector.style.padding='2rem'
                selector.style.alignItems='flex-start'
              }
            }, 100);
          }
          if(!selector.classList.contains('show')){
            init()
          } else if(options.close){
            notify.close(selector)
            setTimeout(() => {
              init()
            }, 50);
      
          }

        },
        close(selector, options){
          if(selector.classList.contains('show')){
            selector.className=''
            selector.innerHTML=''
            setTimeout(() => {
              selector.style.display='none'
            }, 50);
          }
        }
      }
      const newModal = {
        open(params) {

          var id = params.id ?? false,
          contentModal = params.contentModal ?? false,
          btn = params.btn ?? false,
          style = params.style ?? '',
          func = params.func ?? false,
          preload = params.preload ?? false
          preloadTime = preload.time ?? false

          if(btn){btn.classList.add('active-modal')}

          var newModalHTML = `
          <div id="new-modal" data-newModal="${id}">
            <div class="window-modal" style="${style} margin-left:-${nav.offsetWidth/16*2+'rem'};">
              <div class="navbar">
                <div class="window-control">
                  <i title="${langText.close}" option="close">${icons.windowControl.close}</i>
                  <i>${icons.windowControl.minimize}</i>
                  <i>${icons.windowControl.maximize}</i>
                </div>
                <div class="options"></div>
                <div class="bar-search">
                  <input id="url" class="search" value="${DOMINIO_NAME_FAKE}/${id}">
                </div>
                <div class="options">
                </div>
              </div>
              <div class="content-modal">
                ${contentModal}
              </div>
            </div>
            <div id="overlay"></div>
          </div>
          `
          content.insertAdjacentHTML('beforeend', newModalHTML)
          var newModalSelector = content.get('#new-modal'), urlBar = newModalSelector.get('.bar-search #url'),
              contentModalSelector = newModalSelector.get('.content-modal');

          setTimeout(() => {
            newModalSelector.classList.add('displayed')
            setTimeout(() => {
              urlBar.classList.add('fadeonleft')
            }, 150);
          }, 100);

          if(preload){
            loading.auto(contentModalSelector, {time:preloadTime})
          }
          if(func){
            func()
          }
          newModalSelector.get('#overlay').addEventListener('click', () => {this.close({newModalSelector})})
          newModalSelector.get('[option="close"]').addEventListener('click', () => {this.close({newModalSelector})})
          newModalDisplayed = true
        },
        close(params) {
          if(nav.get('.menu .icons.active-modal')){nav.get('.menu .icons.active-modal').classList.remove('active-modal')}
          params.newModalSelector.classList.remove('displayed')
          setTimeout(() => {params.newModalSelector.remove()}, 100);
          newModalDisplayed = false
        }, 
        start(params) {
          if(!newModalDisplayed) {
            this.open(params)
          } else if(newModalDisplayed && content.get('#new-modal').dataset.newmodal != params.id) {
            this.close({newModalSelector: content.get('#new-modal')})
            setTimeout(() => {this.open(params)}, 100);
          } else {
            this.close({newModalSelector: content.get('#new-modal')})
          }
        }
      }
      const settings = {
        open(id, btn) {
          var storedSettings = storageLocal.get();
              SSLanguage = (storedSettings.language == 'pt-br') 
                            ? 'Português' 
                            : (storedSettings.language == 'en-us') 
                            ? 'English' 
                            : 'English'
              SSTheme = (storedSettings.theme) ? storedSettings.theme.capitalize() : 'Github',
              SSStatusBar = (storedSettings.statusbar == 'disabled') 
                            ? langText.disabled.capitalize() 
                            : (storedSettings.statusbar == 'enabled') 
                            ? langText.enabled.capitalize() : 'Disabled'
          
          formSettings = `
            <div class="form">
              <div class="row col-4">
                <div class="column">
                  <label><span>${(storedSettings.language) ? lang(storedSettings.language).language : langText.language}</span></label>
                  <div class="input select">
                    <input type="button" name="language" lang="" value="${SSLanguage}">
                  </div>
                </div>
                <div class="column">
                  <label><span>${(storedSettings.language) ? lang(storedSettings.language).theme : langText.theme}</span></label>
                  <div class="input select">
                    <input type="button" name="theme" value="${SSTheme}">
                  </div>
                </div>
              </div>
              <div class="row col-4">
               
              </div>
            </div>
            <div class="row column">
              <div id="notification"></div>
              <div class="row jfy-center">
                <button class="btn-form green" status="disabled" id="save" type="button">${(storedSettings.language) ? lang(storedSettings.language).saveChanges : langText.saveChanges}</button>
                <button class="btn-form red" status="disabled" id="cancel" type="button">${(storedSettings.language) ? lang(storedSettings.language).cancel : langText.cancel}</button>
              </div>
            </div>
          `
          newModal.start({
            contentModal: formSettings,
            id: id, style:'width:50%;', btn
          })

          var newModalSelector = content.get('#new-modal'), urlBar = newModalSelector.get('.bar-search #url'),
              contentModal = newModalSelector.get('.content-modal'), form = newModalSelector.get('.content-modal .form'),
              btnSave = newModalSelector.get('.content-modal button#save'),
              btnCancel = newModalSelector.get('.content-modal button#cancel'), notification = newModalSelector.get('.content-modal #notification'),
              inputLang = form.get('input[name="language"]'), inputTheme = form.get('input[name="theme"]');

          const btns = {
            unlock(){
              if(btnSave.attributes['status'].value == 'disabled'){
                btnSave.setAttribute('status', 'pending')
                btnCancel.removeAttribute('status')
              }
            },
            block() {
              btnSave.setAttribute('status', 'disabled')
              btnCancel.setAttribute('status', 'disabled')
            }

          }
          const selectOverlay = (inputSelect) => {
            contentModal.insertAdjacentHTML('beforeend', `<div class="select-overlay"></div>`)
            contentModal.get('.select-overlay').addEventListener('click', () => {
              selectClose(inputSelect)
            })
          }
          const selectClose = (select) => {
            select.get('#contextMenu').remove()
            contentModal.get('.select-overlay').remove()
          }
          const selectOpen = (params) => {
            var input = (params) ? params.input : false,
                options = (params) ? params.options : '',
                valueDefault = (params) ? params.valueDefault : '',
                nameVariableValue = (params) ? params.nameVariableValue : '',
                name = (params) ? params.input.name : false,
                inputSelect = input.parentElement
        

            if(!inputSelect.get('#contextMenu')){
              if(form.get('#contextMenu')){form.get('#contextMenu').remove()}  
              var selectOptions = contextMenu(options)

              inputSelect.insertAdjacentHTML('beforeend', selectOptions)
              selectOverlay(inputSelect)
      
              if(storageLocal.get(name)){
                inputSelect.get(`#contextMenu [value="${storageLocal.get(name)}"]`).insertAdjacentHTML('beforeend', `<i class="checked">${icons.check}</i>`)
              } else {
                inputSelect.get(`#contextMenu [value="${valueDefault}"]`).insertAdjacentHTML('beforeend', `<i class="checked">${icons.check}</i>`)
              }
        
              inputSelect.getAll('#contextMenu button.btn').forEach(button => {
                button.addEventListener('click', () => {
                  var value = button.attributes['value'].value, text = button.innerText,
                      storedSettings = storageLocal.get();
                  if(value != storedSettings[name] || value != valueDefault){
                    inputSelect.get('input').value=text
 /*                    inputSelect.get('input').setAttribute('value', value) */
                    window[nameVariableValue] = value;
                    btns.unlock()
                    selectClose(inputSelect)
                  }
                })
              })   
            } else {
              selectClose(inputSelect)
            }
          }



          inputLang.addEventListener('click', () => {
            selectOpen({
              input: inputLang,
              valueDefault: 'en-us',
              nameVariableValue: 'langValue' ,
              options: `
                <button class="btn" value='pt-br' title="Português"><i></i><span>Português</span></button>
                <button class="btn" value='en-us' title="English"><i></i><span>English</span></button>
              `
            })
          })
          inputTheme.addEventListener('click', () => {
            selectOpen({
              input: inputTheme,
              valueDefault: 'github',
              nameVariableValue: 'themeValue' ,
              options: `
                <button class="btn" value='github' title="Github"><i></i><span>Github</span></button>
              `
            })
          })

          btnSave.addEventListener('click', () => {
            if(btnSave.attributes['status'].value == 'pending'){
              btns.block()
              if(typeof langValue !== typeof undefined){
                storageLocal.set('language', langValue)
                notify.close(notification)
                setTimeout(() => {
                  notify.show(notification, lang(storageLocal.get().language).warn_refreshPageLang,  {type:'warn'})
                }, 100);
              }
              if(typeof themeValue !== typeof undefined){
                storageLocal.set('theme', themeValue)
                HTML.setAttribute('themecolor', themeValue)
              }
              btnSave.innerText=(storedSettings.language) ? lang(storedSettings.language).changesSaved : langText.changesSaved
            }
          })
          btnCancel.addEventListener('click', () => {
            if(!btnCancel.attributes['status']){
              settings.close(id, btn, false, newModalSelector)
            }
          })
        },
        close(id, btn, btnSave, newModalSelector) {
          const x = () => {
            newModal.close({btn, newModalSelector})
          }
          if(btnSave){
            if(btnSave.attributes['status'].value != 'pending'){
              x()
            } else {
              btnSave.style.animation='shake 0.82s cubic-bezier(.36,.07,.19,.97) both'
              var noti = content.get('#new-modal .content-modal #notification')
              notify.show(noti, lang(storedSettings.language).warn_saveChanges, {type:'warn'})
              setTimeout(() => {
                btnSave.style.removeProperty('animation')
              }, 1000);
            }
          } else {x()}
          
        },
        start(id, btn){
          const x = () => {this.close(id, btn, content.get('#new-modal .content-modal button#save'), content.get('#new-modal'))}
          if(!newModalDisplayed) {
            this.open(id, btn)
          } else if(newModalDisplayed && content.get('#new-modal').dataset.newmodal != id) {
            x()
            setTimeout(() => {this.open(id, btn)}, 210);
          } else {
            x()
          }
        }
      }
      THIS.overlay=function(e){
        this.insertAdjacentHTML('beforeend', '<div id="overlay"></div>')
        this.get('#overlay').addEventListener('click', () => {
          this.get('#overlay').remove()
          e.get('#contextMenu').remove()
        })
      }
      const setUrlBar = (param, id, hash) => {
        var barSearchURL = preview.get('.bar-search #url');
        param = param ?? ''
        if(!hash){
          barSearchURL.value=`${DOMINIO_NAME_FAKE}/${(param) == 'docs' ? 'docs/' : ''}${((id) ? id : '')}`
          setTimeout(() => {
            barSearchURL.classList.add('fadeonleft')
          }, 100);
        } else {
          var newbarSearchURL = barSearchURL.value.split('#')[0]
          barSearchURL.value = newbarSearchURL+hash
        }

      }
      const newPage = (params) => {
        var id = params.id ?? false, selector = params.selector ?? false, changeUrl = params.changeUrl ?? true,
            ok = true, newPageCheck = false, listItems = params.listItems ?? false, 
            varParam = params.varParam ?? '', nameParam = params.nameParam ?? '';
            

        const createNewPageTag = (selector) => {
          selector.get('.display').insertAdjacentHTML('beforeend', `<div id="new-page" page="${id}"></div>`);
          return selector.get('#new-page')
        }

        if(selector.get('#new-page')){
          newPageCheck = true
          if(selector.get('#new-page').attributes['page'].value == id){
            ok = false
          } 
        }
        if(ok){
          loading.auto(preview.get('.display'))
          if(newPageCheck){selector.get('#new-page').remove()}

          if(listItems && listItems.get('.item.active')){
            listItems.get('.item.active').classList.remove('active')
          }

          if(typeof varParam[id] === "function"){

            if(listItems){
              var item = listItems.get(`[data-id="${id}"`).closest('.item');
              item.classList.add('active')
            }
            selector = createNewPageTag(selector)
            varParam[id]({selector, theme: theme.actual(), lang:langText})

            if(id != 'home'){
              setUrlBar(nameParam, id)
            } else {
              setUrlBar()
            }


            if(changeUrl){
              routes.change(nameParam, id)
            } else {
              routes.clear()
            }

          } else {
            error(`✖ Error: Page not found!`)
            selector = createNewPageTag(selector)
            notFound({error:{number:404,text:langText.pageNotFound}, selector, theme: theme.actual(), lang:langText})
            setUrlBar(`error.404_page["${id}"].NotFound!`)
            routes.change(nameParam, id)
          }
        }
      }
      const routes = {
        searchParams() {
          return (new URL(document.location)).searchParams;
        },
        check(){
          var params = this.searchParams(), isSearchParams = window.location.href.indexOf('?');
          if(params.get('docs')){
            docId = params.get('docs')
            newPage({listItems,id:docId, selector: preview, varParam:docs, nameParam:'docs'})
          } else if(params.get('library')){
            libraryId = params.get('library')
            newPage({listItems,id:libraryId, selector: preview, varParam:library, nameParam:'library'})
          } else if(isSearchParams === -1){
            _HOME()
          }
          this.popstate()

        },
        popstate() {
          window.addEventListener('popstate', (event) => {
            this.check()
            this.hash({scrollTo: false})
          });
        },
        hash(params){
          var scrollTo = (params && params.scrollTo == false) ? params.scrollTo : true;

          if(location.hash.length > 0) {
            var hash = location.hash, hashSelector = document.querySelector(`${hash}`);

            if(hashSelector){
            
              if(scrollTo){
                setTimeout(() => {
                  var hashTo = hashSelector.offsetTop, hashParent = hashSelector.offsetParent;
                  hashParent.scroll( 0, hashTo );
                }, 300);
              }
    
              setUrlBar(false, false, hash)
              return true
            }
          }
        },
        change(name, value) {

          if(this.hash()) {
              value += location.hash
          }
          window.history.pushState(null, null, `?${name}=` + value);
        },
        clear() {
          window.history.pushState(null, null, location.pathname);
        }
      }
      const _HOME = () => {
        newPage({id:'home', selector: preview, varParam:library, nameParam:'library', changeUrl:false})
        if(listItems.get('.item.active')){
          listItems.get('.item.active').classList.remove('active')
        }
      }
     
  //================================================================//
  //================================================================//

      //START INITIAL FUNTIONS ! IMPORTANT
      navbarEvents.update(preview)
      layoutMode.check()
      viewList.check()
      routes.check()
      disableContextMenuDefault()

      
  //================================================================//
  //================================================================//

      //NAV/MENU LEFT [event listener ]
      nav.getAll('.menu .icons').forEach( btn => {
        btn.addEventListener('click', () => {
          btnSrc = btn.attributes['src'];
          btnPage = btn.attributes['page'];
          btnId = btn.attributes['id'];

          if(btnSrc) {
            newTab(btnId.value , btnSrc.value, btn)
            btn.classList.add('active');
          } else if(btnPage) {
            newTab(btnId.value, false, btn, page=true)
            btn.classList.add('active');
          } else if(btnId.value == 'localhost') {
            if(content.get('.new-tab.maximized')){
              nav.get('.menu .icons.maximized').classList.add('minimized')
              content.get('.new-tab.maximized').classList.add('minimized')
            }
            viewList.init()
          } else if(btnId.value == 'settings') {
            settings.start(btnId.value, btn)
          } else {
            var funcs;
            if(btnId.value == 'author'){
              function funcs() {
                var avatar = content.get('#new-modal .profile-author .avatar')
                loading.auto(avatar, {time: 600, style:{bg:'border-radius: 50%', spinner:'width: 30px;height: 30px;opacity:0.4;'}})
              }
            }

            setTimeout(() => {
              newModal.start({
                contentModal: htmls[btnId.value](STATUS_CONNECTION),
                btn, id: btnId.value, style:'width:30%;',
                func:funcs
              })
            }, 100);

          }
        })
      })

      var documentation = [
        {"id":"home", "title":"Home"},
        {"id":"notify", "title":"Notify"},
        {"id":"download", "title":"Download"}
      ]
/*       //CREATE LIST ITEMS/PROJECTS - Items
      documentation.forEach(e => {

          iconExt = {
            js:        `<i>${icons.language.js}</i>`,
            json:      `<i>${icons.language.json}</i>`,
            css:       `<i>${icons.language.css}</i>`,
            html:      `<i>${icons.language.html}</i>`,
            php:       `<i>${icons.language.php}</i>`,
            txt:       `<i>${icons.text}</i>`,
            compact:   `<i>${icons.compact}</i>`,
            folder:    `<i>${icons.folder}</i>`,
            undefined: `<i>${icons.question}</i>`,
            img:       `<i>${icons.image}</i>`,
          }
          
            itemHTML = `
              <div class="item">
                <a flex src="" id="${e.id}">
                  <span>${e.title}</span>
                </a>
              </div>
            `;  
          
          listItems.insertAdjacentHTML('beforeend',itemHTML)
      }); */
     
     
     
      //LIST ITEMS/PROJECTS [event listener ]
      var menuDocs = listItems.getAll('.item a[data-type="docs"]'), 
         menuLibrary = listItems.getAll('.item a[data-type="library"]');                       
      menuDocs.forEach(a => {
        a.addEventListener('click', e => {
          newPage({listItems, id:a.dataset.id, selector: preview, varParam:docs, nameParam:'docs'})
        })
      })
      menuLibrary.forEach(a => {
        a.addEventListener('click', e => {
          newPage({listItems, id:a.dataset.id, selector: preview, varParam:library, nameParam:'library'})
        })
      })
      containerList.get('.root .for-home').addEventListener('click', () => {
        _HOME()
      })

      
      //BUTTON CLOSE LIST-ITEM/PROJECTS
      containerList.get('.close-list').addEventListener('click', () => {
        viewList.init()
      })






      console.log(
      `%c 👨🏿‍🚀 Astronaut Library .js - Started! 👨🏿‍🚀`,
      ` color: #adbac7; 
        background-size: contain;
        background-position: right; 
        padding: 0.3rem 1.8rem 0.3rem 0.3rem;
        font-size:1rem;
      `);
      


  
})






















