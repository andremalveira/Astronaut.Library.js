const ASTRONAUT_LOCALHOST = {
  build() {
    //initial changes
    if(SERVER_APACHE){
      var apacheaddress = document.querySelector('address');
      if (location.search != '?C=S') { location.href = location.href + '?C=S' }
      var apachetable = BODY.get('table');
      apacheaddress.style.display = 'none';
      apachetable.style.display = 'none'
      GET('body h1').remove()
      GET_ALL('table tr th').forEach(e => { e.parentElement.remove() })
    } else if(SERVER_LIVE){
      var inputSearch = document.querySelector('input#search')
      if(inputSearch) inputSearch.remove()
      
      HEAD.innerHTML=''
      BODY.innerHTML=''
    }

    
    HTML.setAttribute('astronaut', '')
    themeColor.check()
    titleTab.default()

    //insert new html structure
    BODY.insertAdjacentHTML('afterbegin', INDEX) //STRUCTURE IN INDEX.HTML

    //VARIABLES ESSENCIAL
    var nav = BODY.get('nav'),
      content = BODY.get('#content'),
      statusBar = BODY.get('#status-bar'),
      main = content.get('main'),
      containerList = main.get('.container-list'),
      listItems = (containerList) ? containerList.get('#list-items') : false,
      layout = main.get('#layout'),
      preview = main.get('#preview'),
      itemHTML = ''
      listIsDisplayed = false,
      newModalDisplayed = false,
      liveServerFunctionsInit = true;


    //FUNCTIONS CONSTANTS 
    const layoutMode = {
      desktop(modevalue) {
        layout.setAttribute('layout', 'desktop')
        storageLocal.set('layoutMode', modevalue)
        layoutMode.appearanceMoblie('remove', preview)
        if (layout.get(`.preview-mobile`)) { layout.get(`.preview-mobile`).remove() }
        devicesMobile.default(preview)
        preview.style.removeProperty('height')
        preview.get('.navbar .bar-search #url').value = preview.get('iframe').src
      },
      mobile(modevalue) {
        layout.setAttribute('layout', 'mobile')
        storageLocal.set('layoutMode', modevalue)
        layoutMode.appearanceMoblie('add', preview)
        if (layout.get(`.preview-mobile`)) { layout.get(`.preview-mobile`).remove() }
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
      for(modevalue) {
        (layout.attributes['layout'].value == `${modevalue}`) ? null : layoutMode[modevalue](modevalue)
        storageLocal.update()
      },
      iconLayout(modevalue) {
        btndevices = preview.get('[option="devices"]');
        btndevices.get('.icon-layout').innerHTML = icons.layout[modevalue]
      },
      appearanceMoblie(option, element) {
        var display = element.get('.display')
        if (option == 'remove') {
          if (display.get('.navigation-bar') && display.get('.status-bar')) {
            display.get('.navigation-bar').remove()
            display.get('.status-bar').remove()
            element.get('.navbar [option="phoneSize"]').remove()
          }
        } else if (option == 'add') {
          optionTypeMobile = `<div class="icon" option="phoneSize" title="${langText.togglePhoneSize}"><i class="icon-layout">${icons.phone}</i></div>`
          element.get('.navbar .options:last-child').insertAdjacentHTML('afterbegin', optionTypeMobile)
          windowEvents.eventPhoneSize(element)
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
              ${icons.navbarMobile.triangle +
            icons.navbarMobile.circle +
            icons.navbarMobile.square}
            </div>
          `)
          display.get('.status-bar .clock').insertTime()
          display.get('iframe').addEventListener('load', ()=> {
            metaThemeColorMobile.update(display.get('iframe'))
          })
          metaThemeColorMobile.update(display.get('iframe'))
        }
      },
      check() {
        chrome.storage.local.get('layoutMode', (result) => {
          if (result.layoutMode != undefined) {
            if (result.layoutMode != 'desktop') {
              layoutMode[result.layoutMode](result.layoutMode)
              layoutMode.iconLayout(result.layoutMode)

              var message = true;
              function checkMinimunResolution() {
                if(window.innerWidth < 1280 || window.innerHeight < 825){
                  document.querySelector('.container').style.display='none'
                  if(apacheaddress && apachetable){
                    apacheaddress.style.display = '';
                    apachetable.style.display = ''
                  }
                  if(message){
                    document.body.insertAdjacentHTML('beforeend', '<h1>Resolution no Suported!</h1><h2>Minimum resolution 1280x825 </h2>')
                    message = false;
                  }
                } else {
                  document.querySelector('.container').style.display=''
                  if(apacheaddress && apachetable){
                    apacheaddress.style.display = 'none';
                    apachetable.style.display = 'none'
                  }
                }
              }
              checkMinimunResolution()
              window.addEventListener('resize', () => {
                //1280x825 
                var heightBody = content.offsetHeight;
                var  heightBody = heightBody - 90,
                  heightBody = heightBody / 16;
                  GET_ALL('#layout [window]:not([model])').forEach(window => {
                    window.style.height = heightBody + 'rem'
                  })  
                  checkMinimunResolution()
              })
            }
          }
        });
      }
    }
    const listProjects = {
      create() {
        //CREATE LIST ITEMS/PROJECTS - Items
        apachetable.getAll('tr').forEach(tr => {
          tr = tr.childNodes
          obj = {
            icon: tr[0],
            link: tr[1],
            modified: tr[2].innerHTML,
            size: tr[3].innerText,
          }
          iconExt = {
            js: `<i>${icons.language.js}</i>`,
            json: `<i>${icons.language.json}</i>`,
            css: `<i>${icons.language.css}</i>`,
            html: `<i>${icons.language.html}</i>`,
            php: `<i>${icons.language.php}</i>`,
            txt: `<i>${icons.text}</i>`,
            compact: `<i>${icons.compact}</i>`,
            folder: `<i>${icons.folder}</i>`,
            undefined: `<i>${icons.question}</i>`,
            img: `<i>${icons.image}</i>`,
          }

          var ext = obj.link.get('a').pathname.replace(/^\//g, '').lastCaracter()
          ext = (ext == '/') ? 'folder'
            : (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'svg' || ext == 'gif') ? 'img'
              : (ext == 'zip' || ext == 'rar') ? 'compact'
                : ext;

          if (obj.icon.get('img').alt == '[PARENTDIR]') {
            itemHTML = `
              <a src="${obj.link.get('a').href}">
                <div class="item">
                  <i class="fas fa-arrow-left"></i>
                  <span>Voltar</span>
                </div>
              </a>
              `;
          } else {
            itemHTML = `
                <div class="item">
                  <a flex src="${obj.link.get('a').href}">
                    ${(iconExt[ext] == 'folder') ? iconExt.folder : (iconExt[ext] == undefined) ? iconExt['undefined'] : iconExt[ext]}
                    <span>${obj.link.innerText.replace('/', '')}</span>
                  </a>
                </div>
              `;
          }
          listItems.insertAdjacentHTML('beforeend', itemHTML)
        });

        //ON ROOT
        containerList.get('.root .dir').addEventListener('click', () => {
          windowUrl.open(location.host, layout)
        })
        //LIST ITEMS/PROJECTS [event listener ]
        var items = listItems.getAll('.item');
        items.forEach(item => {
          var a = item.get('a');
          item.contextMenuCustom()
          a.addEventListener('click', e => {
            e.preventDefault()

            windowUrl.open(a.attributes['src'].value, layout)
            custonScrollBarinFrame()

          })
        })
        //BUTTON CLOSE LIST-ITEM/PROJECTS
        containerList.get('.close-list').addEventListener('click', () => {
          listProjects.init()
        })
      },
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
        if (listIsDisplayed) {
          listProjects.close()
        } else {
          listProjects.open()
        }
        storageLocal.update()
      },
      check() {
        chrome.storage.local.get('listIsDisplayed', (result) => {
          if (result.listIsDisplayed != undefined) {
            if (result.listIsDisplayed == false) { listProjects.close() }
            else { listProjects.open() }
          } else { listProjects.open() }
        });

        this.create()
      }
    }
    const warnXFrame = (iframe) => {
      iframe.addEventListener('load', function (e) {
        try {
          this.contentWindow.document
        }
        catch (e) {
          var messageLC = e.message.toLowerCase();
          warnXFrameHTML = `
            <div class="warningXFrameHTML">
              <div id="notification" class="warn show" style="display: flex;padding: 1rem; height: 2rem;font-size: 1rem;">
                <div>${langText.warnXFrameMsg}</div>
              </div>
              <div class="step">
                <div>1° - ${langText.warnXFrameStepOne}</div>
                <div>2° - ${langText.warnXFrameStepTwo}</div>
                <div>3° - ${langText.warnXFrameStepThree.text1}
                <span style="background-color: #2d333b; font-family: Consolas, &quot;Courier New&quot;, monospace; line-height: 26px; white-space: pre;">&nbsp;<span style="color: #9cdcfe;">$cfg</span>[<span style="color: #ce9178;">'AllowThirdPartyFraming'</span>]&nbsp;=&nbsp;<span style="color: #569cd6;">true</span>;&nbsp;</span> 
                ${langText.warnXFrameStepThree.text2}
                <span style="background-color: #2d333b; font-family: Consolas, &quot;Courier New&quot;, monospace; line-height: 26px; white-space: pre;">&nbsp;<span style="color: #c586c0;">if</span>();&nbsp;</span> 
                ${langText.warnXFrameStepThree.text3}</div>
              </div>
              <div class="step-gif">
                <img src="${getImage('gif-config-AllowThirdPartyFraming-thumb.jpg')}">
                <div class="overlay"><i class="play" title="Play">${icons.play}</i></div>
              </div>
            </div>
            <div class="row jfy-center">
              <button class="btn-form green" id="proceeded" type="button">Procedures Performed</button>
            </div>
          `;
          const stepGifPlay = () => {
            var stepGifSelector = content.get('#new-modal .warningXFrameHTML .step-gif'),
              btnPlay = stepGifSelector.get('i.play'), img = stepGifSelector.get('img'),
              btnProceeded = content.get('#new-modal #proceeded');

            btnPlay.addEventListener('click', () => {
              btnPlay.parentElement.remove()
              img.src = 'https://andremalveira.github.io/astronaut/src/img/gif-config-AllowThirdPartyFraming.gif'
            })
            btnProceeded.addEventListener('click', () => {
              var srcActual = iframe.src
              iframe.src = ''
              iframe.src = srcActual
              newModal.close({ newModalSelector: content.get('#new-modal') })
            })
          }
          newModal.start({
            style: 'width:50%;max-height:90%;', id: 'database',
            contentModal: warnXFrameHTML, func: stepGifPlay
          })
        }
      });
    }
    const newTab = (id, url, btnMenu, page) => {
      var layoutmode = false,
        pagemode = false,
        element = `class="new-tab" tab="${id}"`,
        optionRefresh = `<div class="icon" option="refresh" title="${langText.refresh}">${icons.refresh}</div>`,
        optionInfo = '', astronautMirror = '', attrID = '', inputSearch = '', optionDiv = true,  hWDefault = '';
       
      if (id == 'double') {
        layoutmode = true,
        element = 'class="preview-mobile"'
        optionRefresh = ''
        astronautMirror = astronaut_logo
        attrID = 'id="window_mirror"'
        inputSearch = `<input type="text" id="model" value="" class="search" autocomplete="off">`
        optionDiv = false;
        hWDefault = heightWindowDefault;
      }
      if (page) {
        pagemode = 'page'
        optionInfo = `<span class="separator"></span><div class="icon" option="info" title="${langText.information}">${icons.infoCircle}</div>`
      }
      var newTabHTML = `
        <div window ${element} ${pagemode} ${hWDefault}>
          <div class="navbar">
            <div class="window-control">
              <i title="${langText.close}" option="close">${icons.windowControl.close}</i>
              <i title="${langText.minimize}" option="minimize">${icons.windowControl.minimize}</i>
              <i>${icons.windowControl.maximize}</i>
            </div>
            ${(optionDiv) ? '<div class="options">' : ''}
              ${optionRefresh}
              ${optionInfo}
            ${(optionDiv) ? '</div>' : ''}

            <div class="bar-search">
              ${inputSearch}
            </div>
            <div class="options">
            </div>
          </div>
          <div class="display">
            ${astronautMirror}
            <iframe ${attrID}></iframe>
          </div>
        </div>
      `

      if (layoutmode) {
        layout.insertAdjacentHTML('beforeend', newTabHTML)
        var previewMobile = layout.get(`.preview-mobile`)
        loading.start(previewMobile.get('.display'))
        setTimeout(() => {
          if (!url == undefined || !url == '') {
            previewMobile.get('.display iframe').src = url
          }
          loading.stop();
        }, 500);
        windowEvents.update(previewMobile)
      } else {

        if (!content.get(`.new-tab[tab="${id}"]`)) {
          content.insertAdjacentHTML('beforeend', newTabHTML)

          if (content.get(`.new-tab.maximized`)) {
            var max = content.get(`.new-tab.maximized`),
              maxId = max.attributes['tab'].value;
            max.classList.add('minimized')
            GET(`.menu #${maxId}`).classList.add('minimized')
          }

          var newTab = content.get(`.new-tab[tab="${id}"]`)
          newTab.classList.add('maximized')
          if (btnMenu != null || btnMenu != undefined) { btnMenu.classList.add('maximized') }
          loading.auto(newTab.get('.display'), { time: 600, style: { bg: 'background:var(--bg-second)' } })
          windowEvents.update(newTab)
          if (url) {
            setTimeout(() => {
              newTab.get('.display iframe').src = url
              var iframe = newTab.get('.display iframe');
              if (id == 'database') { warnXFrame(iframe) }
            }, 500);
          } else if (page) {
            var iframe = newTab.get('.display iframe');
            if (typeof window[id] === "function") {
              window[id]({ iframe, theme: themeColor.actual(), lang: langText })
            } else {
              konsole.error(`Function ${id}() no defined!`)
            }
          }

        } else if (content.get(`.new-tab.minimized[tab="${id}"]`)) {

          if (content.get(`.new-tab.maximized:not(.minimized)`)) {
            var max = content.get(`.new-tab.maximized:not(.minimized)`),
              maxId = max.attributes['tab'].value;
            max.classList.add('minimized')
            GET(`.menu #${maxId}`).classList.add('minimized')
          }

          content.get(`.new-tab.minimized[tab="${id}"]`).classList.remove('minimized')
          btnMenu.classList.remove('minimized')
        } else if (content.get(`.new-tab.maximized[tab="${id}"]`)) {
          content.get(`.new-tab.maximized[tab="${id}"]`).classList.add('minimized')
          btnMenu.classList.add('minimized')
        }
      }

    }
    const windowEvents = {
      update(selector) {
        //options [navbar]
        var btnclose = selector.get('.navbar [option="close"]'),
          btnminimize = selector.get('.navbar [option="minimize"]'),
          btnfullscreen = selector.get('.navbar [option="fullscreen"]'),
          btnfullscreenexit = selector.get('.navbar [option="fullscreenexit"]'),
          btnback = selector.get('.navbar [option="back"]'),
          btnadvance = selector.get('.navbar [option="advance"]'),
          btnrefresh = selector.get('.navbar [option="refresh"]'),
          btnliveserver = selector.get('.navbar [option="liveserver"]'),
          btndevices = selector.get('.navbar [option="devices"]'),
          btncapture = selector.get('.navbar [option="capture"]'),
          btninfo = selector.get('.navbar [option="info"]'),
          btnmoreoptions = selector.get('.navbar [option="moreoptions"]');

        //[event COME BACK AND ADVANCE]
        if (btnback) {
          btnback.addEventListener('click', e => {
            var parentLayout = btnrefresh.closest('#layout');
            if (parentLayout == null) {
              btnrefresh.closest('[window]').get('iframe').contentWindow.history.back()
            } else {
              parentLayout.getAll('[window] iframe').forEach(iframe => {
                iframe.contentWindow.history.back()
              })
            }
          })
        }
        //[event REFRESH]
        if (btnrefresh) {
          btnrefresh.addEventListener('click', e => {
            btnrefresh.get('svg').style.animationName = 'refresh'
            setTimeout(() => {
              btnrefresh.get('svg').style.removeProperty('animation-name')
            }, 600);
            var parentLayout = btnrefresh.closest('#layout');
            if (parentLayout == null) {
              var newTab = btnrefresh.closest('[window]'), iframe = btnrefresh.closest('[window]').get('iframe');

              if (newTab.attributes['tab'].value == 'database') {
                var srcActual = iframe.src
                iframe.src = ''
                iframe.src = srcActual
                console.clear()
              } else {
                console.clear()
                if (iframe.closest('[window][page]')) {
                  var id = iframe.closest('[window][page]').attributes['tab'].value
                  if (typeof window[id] === "function") {
                    window[id]({ iframe, theme: themeColor.actual(), lang: langText })
                  } else {
                    konsole.error(`Function ${id}() no defined!`)
                  }
                } else {
                  iframe.contentWindow.location.reload(true)
                }
              }

            } else {
              parentLayout.getAll('[window] iframe').forEach(iframe => {
                console.clear()
                iframe.contentWindow.location.reload(true)
              })
            }
            custonScrollBarinFrame()
          })
        }
        //[event LIVE SERVER]
        if (btnliveserver) {
          btnliveserver.get('.icon-liveServer').addEventListener('click', e => {
            var parentLayout = btnliveserver.closest('#layout'), iconLiveServer = btnliveserver.get('.icon-liveServer')
            iframehref = parentLayout.get('[window] iframe').contentWindow.location.href,
              liveServerIndex = `${popupLiveServerHTML({ url: iframehref, langText: langText, storageLocal: storageLocal.get() })}`,
              popupHTML = contextMenu(liveServerIndex)

            btnliveserver.insertAdjacentHTML('beforeend', popupHTML)

            let liveReloadCheck = btnliveserver.get('#liveReloadCheck');
            let actualServerAddress = btnliveserver.get('#actualServer');
            let liveServerAddress = btnliveserver.get('#liveServer');
            let submitBtn = btnliveserver.get('#submitBtn');

            var sl = storageLocal.get()
            var slls = (sl && sl.liveServer) ? sl.liveServer : false;

            liveReloadCheck.checked = (slls) ? slls.isEnable : false;
            actualServerAddress.value = (slls && slls.actualUrl != '') ? slls.actualUrl : sl.lastWindowUrl;
            liveServerAddress.value = (slls) ? slls.liveServerUrl : 'http://127.0.0.1:5500';


            function submitForm() {
              const formData = {
                isEnable: liveReloadCheck.checked,
                proxySetup: false,
                actualUrl: actualServerAddress.value || '',
                liveServerUrl: liveServerAddress.value || ''
              }
              storageLocal.set('liveServer', formData)
              chrome.runtime.sendMessage({
                req: 'set-live-server-config',
                data: formData
              });

      
              if (formData.isEnable) {
                liveReload.apache(slls, 'btnliveserver')
                liveServer.isEnabled.enable()
              } else {
                liveServer.isEnabled.disable()
                astronaut.notify({
                  message: `${langText.liveServerDisabled}`,
                  icon: icons.broadcast,
                  style: ASTRONAUT_NOTIFY_SETTINGS_DEFAULT,
                  type: 'warn',
                  autoClose: 3000
                })
              }
            }
            liveReloadCheck.onclick = () => {
              if(liveServerAddress.value == ''){
                liveServerAddress.setAttribute('required','')
                liveReloadCheck.checked = false
              } else {
                submitForm();
              }
            }

            submitBtn.addEventListener('click', e => {

              if(liveServerAddress.value == ''){
                liveServerAddress.setAttribute('required','')
              } else {
                submitForm();
                submitBtn.disabled = true;
              }
            })
            liveServerAddress.addEventListener('input', ()=> {
              liveServerAddress.removeAttribute('required')
            })

            liveServerAddress.onkeyup = actualServerAddress.onkeyup = () => {
              submitBtn.disabled = false;
            }

            BODY.overlay(btnliveserver)
          })
        }
        //[event DEVICES]
        if (btndevices) {
          btndevices.get('.icon-layout').addEventListener('click', e => {
            btnsLayoutMode = `
              <button class="btn" layoutmode='desktop' title="${langText.toggleDesktop} &nbsp Ctrl+Q"><i>${icons.layout.desktop}</i><span>Desktop</span></button>
              <button class="btn" layoutmode='mobile' title="${langText.toggleMobile} &nbsp Ctrl+Q"><i>${icons.layout.mobile}</i><span>Mobile</span></button>
              <button class="btn" layoutmode='double' title="${langText.toggleDouble} &nbsp Ctrl+Q"><i>${icons.layout.double}</i><span>Double</span></button>
            `
            var popupHTML = contextMenu(btnsLayoutMode)

            chrome.storage.local.get((result) => {
              if (result.layoutMode != undefined) {
                btndevices.get(`[layoutmode="${result.layoutMode}"]`).insertAdjacentHTML('beforeend', `<i class="checked">${icons.check}</i>`)
              } else {
                btndevices.get(`[layoutmode="desktop"]`).insertAdjacentHTML('beforeend', `<i class="checked">${icons.check}</i>`)
              }
            });
            btndevices.insertAdjacentHTML('beforeend', popupHTML)
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
        //[event MORE OPTIONS]
        if (btnmoreoptions) {
          btnmoreoptions.get('.icon-moreoptions').addEventListener('click', e => {
            btnsLayoutMode = `
            <button class="btn" data-value='clearConsole' title="Clear Console"><i>${icons.eraser}</i><span>Clear Console</span><span title="shortcut" class="shortcut">Ctrl+L</span></button>
          `
          var popupHTML = contextMenu(btnsLayoutMode)
          btnmoreoptions.insertAdjacentHTML('beforeend', popupHTML)
          btnmoreoptions.getAll('.btn[data-value]').forEach(options => {
            options.addEventListener('click', () => {
              modevalue = options.dataset.value

              if(modevalue == 'clearConsole'){
                shortcuts.clearConsole()
              }

              btnmoreoptions.get('#contextMenu').remove()
              BODY.get('#overlay').remove()
            })
          })
          BODY.overlay(btnmoreoptions)
          })
        }
        //[event CAPTURE]
        if (btncapture) {
          btncapture.addEventListener('click', e => {

          })
        }
        //[event INFORMATION]
        if (btninfo) {
          btninfo.addEventListener('click', e => {
            var newTab = btninfo.closest('[window]'),
              tabValue = newTab.attributes['tab'].value
            newModal.start({
              contentModal: htmls[tabValue],
              btn: btninfo, id: tabValue,
              func: false
            })
          })
        }
        //[event CLOSE]
        if (btnclose) {
          btnclose.addEventListener('click', e => {
            var parentElementMain = btnclose.closest('[window]'),
              tab = parentElementMain.attributes['tab'];

            if (parentElementMain.id == 'preview') {
              if (listItems && listItems.get('.item.active')) { listItems.get('.item.active').classList.remove('active') }
              windowUrl.close(layout)
            } else if (parentElementMain.classList.contains('preview-mobile')) {
              layoutMode.desktop('desktop')
            } else if (parentElementMain.classList.contains('new-tab')) {
              parentElementMain.classList.remove('maximized')
              if (tab) { nav.get('#' + tab.value).classList.remove('active') }
              setTimeout(() => { parentElementMain.remove('src') }, 500);
            }
            liveServer.isEnabled.disable()
            console.clear()
          })
        }
        //[event MINIMIZE]
        if (btnminimize) {
          btnminimize.addEventListener('click', e => {
            var parentElementMain = btnclose.closest('.navbar').parentElement,
              tab = parentElementMain.attributes['tab'];
            if (tab) {
              parentElementMain.classList.add('minimized')
              nav.get('#' + tab.value).classList.add('minimized')
            }

          })
        }
        //[event FULLSCREEN]
        if (btnfullscreen) {
          btnfullscreen.addEventListener('click', e => { fullscreen.request() })
        }
        //[event FULLSCREENEXIT]
        if (btnfullscreenexit) {
          btnfullscreenexit.addEventListener('click', e => { fullscreen.exit() })
        }

      },
      eventPhoneSize(selector) {
        //[event PHONE SIZE ]
        btnphoneSize = selector.get('.navbar [option="phoneSize"]');
        if (btnphoneSize) {
          btnphoneSize.get('.icon-layout').addEventListener('click', e => {
            options = ''
            deviceSize = devicesMobile.size()
            deviceSize.map((size, index) => {
              options += `<button class="btn" phoneModel='${index}' title="${size.name}"><i></i><span>${size.name}</span></button>`
            })
            btnsPhoneModel = `
              <button class="btn" phoneModel='default' title="${langText.sizeDefault}"><i></i><span>${langText.default}</span></button>
              ${options}
            `
            var popupHTML = contextMenu(btnsPhoneModel)

            chrome.storage.local.get((result) => {
              if (result.phoneModel != undefined) {
                btnphoneSize.get(`[phoneModel="${result.phoneModel.id}"]`).insertAdjacentHTML('beforeend', `<i class="checked">${icons.check}</i>`)
              } else {
                btnphoneSize.get(`[phoneModel="default"]`).insertAdjacentHTML('beforeend', `<i class="checked">${icons.check}</i>`)
              }
            });
            btnphoneSize.insertAdjacentHTML('beforeend', popupHTML)
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
        var host = (url == location.host) ? location.protocol + '//' + location.host + '/' : false
        url = (url == undefined) ? '' : (url == location.host) ? host : url

        const barSearch = {
          load(params) {
            var url = (params) ? params.url : false,
              focus = (params) ? params.focus : false,
              iframe = (params) ? params.iframe : false,
              urlBar = iframe.closest('[window]').get('.navbar .bar-search #url');

            if (urlBar) {
              urlBar.value = url
              if (focus) { urlBar.focus() }

              if (urlBar.classList.contains('fadeonleft')) { urlBar.classList.remove('fadeonleft') }
              urlBar.value = (host) ? location.host : url
              setTimeout(() => {
                urlBar.classList.add('fadeonleft')
              }, 100);
            }
          },
          update(url, iframe) {
            var urlBar = iframe.closest('[window]').get('.navbar .bar-search #url');
            if (urlBar) {
              urlBar.value = url
            }
          }
        }
        const iframeLoad = () => {
          elem.get('iframe').addEventListener('load', () => {

            var newUrl = elem.get('iframe').contentWindow.location.href
            barSearch.update(newUrl, elem.get('iframe'))
            var preview_mobile = main.get('.preview-mobile')
            if (preview_mobile) {
              preview_mobile.get('iframe').contentWindow.location.href = newUrl
            }
          })

        }
        var iframeLoadCheck = true
        elem.getAll('iframe').forEach(iframe => {
          loading.auto(iframe.parentElement)
          iframe.src = url
          barSearch.load({ url: url, focus, iframe })
          if (iframeLoadCheck) {
            iframe.addEventListener('load', () => {
              iframe.contentWindow.document.documentElement.addEventListener('click', () => {
                iframeLoad()
                iframeLoadCheck = false
              })
            })

          }
        })

        if(SERVER_APACHE){
          storageLocal.noShared.set('lastWindowUrl', url)
        }
      
        if (storageLocal.get('liveServer')) {
          var SLliveServer = storageLocal.get('liveServer')
          if(SLliveServer && SLliveServer.isEnable && SLliveServer.liveServerUrl != ''){
            SLliveServer.actualUrl = url
            storageLocal.set('liveServer', SLliveServer)
            liveReload.apache(SLliveServer, 'windowUrl')
          }

        }
        //active item-list
        if(listItems){
          if (listItems.get('.item.active')) { listItems.get('.item.active').classList.remove('active') }
          listItems.getAll('.item a').forEach(a => {
            if (a.attributes['src'].value == url) { a.parentElement.classList.add('active') }
          })
        }

        windowUrl.barSearch()
        storageLocal.update()
        titleTab.update()
      },
      close(elem) {
        elem.getAll('iframe').forEach(iframe => {
          iframe.removeAttribute('src')
          var urlBar = iframe.closest('[window]').get('.navbar .bar-search #url')
          if (urlBar) {
            urlBar.classList.remove('fadeonleft')
            setTimeout(() => {

              urlBar.innerText = url
            }, 100);
          }
        })

        storageLocal.noShared.remove('lastWindowUrl')

        if (storageLocal.get('liveServer')) {
          var SLliveServer = storageLocal.get('liveServer')
          SLliveServer.actualUrl = ''
          storageLocal.set('liveServer', SLliveServer)
        }
        storageLocal.update()
        titleTab.default()
   
      },
      barSearch() {
        var barSearchURL = content.get('#layout:not([layout="mobile"]) #preview .bar-search #url')
        if(barSearchURL){
          barSearchURL.contentEditable = true
          barSearchURL.addEventListener('keypress', e => {
            if (e.keyCode == 13) {
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
        }
      },
      check() {
        if (storageLocal.noShared.get('lastWindowUrl')) {
          var lastWindowUrl = storageLocal.noShared.get('lastWindowUrl')
          windowUrl.open(lastWindowUrl, layout)
        } else if(!SERVER_APACHE){
          windowUrl.open(location.href, layout)
        }
   
      }

    }
    const devicesMobile = {
      size() {
        return [
          { name: 'Moto G4', width: '360', height: '640' },
          { name: 'Pixel 2', width: '411', height: '731' },
          { name: 'Pixel 2 XL', width: '411', height: '823' },
          { name: 'Iphone 5/SE', width: '320', height: '568' },
          { name: 'Iphone 6/7/8', width: '375', height: '667' },
          { name: 'Iphone 6/7/8 Plus', width: '414', height: '736' },
          { name: 'Iphone X', width: '375', height: '812' },
        ]
      },
      default(selector) {
        selector.removeAttribute('model')
        selector.get('iframe').style.width = '100%'
        selector.get('iframe').style.height = '100%'
      },
      change(id, selector) {
        var size = devicesMobile.size(), barSearch = selector.get('.navbar .bar-search'),
        barSearchID = '#url';
        if (selector != undefined) {
          if(selector.id != 'preview'){
            barSearchID = '#model'
          }

          if (id == 'default') {
            devicesMobile.default(selector)
            storageLocal.set('phoneModel', { id: id })
            barSearch.get(barSearchID).value = ''
            barSearch.get(barSearchID).title = ''
          } else {
        
            selector.get('iframe').style.width = selector.get('iframe').offsetWidth / 16 + 'rem'
            selector.get('iframe').style.height = selector.get('iframe').offsetHeight / 16 + 'rem'
            setTimeout(() => {
              selector.setAttribute('model', size[id].name)
              setTimeout(() => {
                var modelDescription = `${size[id].name} - [${size[id].width} x ${size[id].height}]`
                barSearch.get(barSearchID).value = `${modelDescription}` 
                barSearch.get(barSearchID).title = `${modelDescription}` 
                selector.get('iframe').style.width = size[id].width / 16 + 'rem'
                selector.get('iframe').style.height = size[id].height / 16 + 'rem'
                selector.style.removeProperty('height')
                barSearch.get(barSearchID).classList.add('fadeonleft')
              }, 100);
            }, 200);
            storageLocal.set('phoneModel', { id: id, size: { width: size[id].width, height: size[id].height } })
          }
          storageLocal.update()
        }
      },
      update(selector) {
        chrome.storage.local.get('phoneModel', (result) => {
          if (result.phoneModel != undefined) {
            devicesMobile.change(result.phoneModel.id, selector)
          }
        });
      }
    }
    const warnSettings = {
      show(selector, text, options) {
        function init() {
          selector.style.display = 'grid'
          setTimeout(() => {
            selector.classList.add(options.type, 'show')
            selector.innerHTML = text
            if (options.btnClose) {
              selector.insertAdjacentHTML('beforeend', `<i class="notify-btn-close">${icons.close}</i>`)
              selector.get('i.notify-btn-close').addEventListener('click', () => {
                warnSettings.close(selector, { type: options.type })
              })
            }
            if (options.image) {
              selector.style.gridTemplateColumns = '1fr 40%'
              selector.style.padding = '2rem'
              selector.style.alignItems = 'flex-start'
            }
          }, 100);
        }
        if (!selector.classList.contains('show')) {
          init()
        } else if (options.close) {
          warnSettings.close(selector)
          setTimeout(() => {
            init()
          }, 50);

        }

      },
      close(selector, options) {
        if (selector.classList.contains('show')) {
          selector.className = ''
          selector.innerHTML = ''
          setTimeout(() => {
            selector.style.display = 'none'
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

        if (btn) { btn.classList.add('active-modal') }

        var newModalHTML = `
        <div id="new-modal" data-newModal="${id}">
          <div class="window-modal" style="${style} margin-left:-${nav.offsetWidth / 16 * 2 + 'rem'};">
            <div class="navbar">
              <div class="window-control">
                <i title="${langText.close}" option="close">${icons.windowControl.close}</i>
                <i>${icons.windowControl.minimize}</i>
                <i>${icons.windowControl.maximize}</i>
              </div>
              <div class="options"></div>
              <div class="bar-search">
                <input id="url" class="search" value="astronaut:${id}">
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

        if (preload) {
          loading.auto(contentModalSelector, { time: preloadTime })
        }
        if (func) {
          func()
        }
        newModalSelector.get('#overlay').addEventListener('click', () => { this.close({ newModalSelector }) })
        newModalSelector.get('[option="close"]').addEventListener('click', () => { this.close({ newModalSelector }) })
        newModalDisplayed = true
      },
      close(params) {
        if (nav.get('.menu .icons.active-modal')) { nav.get('.menu .icons.active-modal').classList.remove('active-modal') }
        params.newModalSelector.classList.remove('displayed')
        setTimeout(() => { params.newModalSelector.remove() }, 100);
        newModalDisplayed = false
      },
      start(params) {
        if (!newModalDisplayed) {
          this.open(params)
        } else if (newModalDisplayed && content.get('#new-modal').dataset.newmodal != params.id) {
          this.close({ newModalSelector: content.get('#new-modal') })
          setTimeout(() => { this.open(params) }, 100);
        } else {
          this.close({ newModalSelector: content.get('#new-modal') })
        }
      }
    }
    const settings = {
      open(id, btn) {
        var storedSettings = storageLocal.get(),
            SSLanguage = (storedSettings.language == 'pt-br')
              ? 'Português'
              : (storedSettings.language == 'en-us')
                ? 'English'
                : 'English',
            SSStatusBar = (storedSettings.statusbar)
              ? langText[storedSettings.statusbar].capitalize()
              : 'Disabled',

            SSBlur = (storedSettings.blur == 'disabled')
              ? langText.disabled.capitalize()
              : (storedSettings.blur == 'enabled')
                ? langText.enabled.capitalize() : 'Disabled',

            SSTheme = (storedSettings.themeColor) 
            ? storedSettings.themeColor.formatValueInText('_') 
            : THEME_COLOR_DEFAULT.formatValueInText('_');

       var formSettings = `
          <div class="form">
            <div class="row col-4">
              <div class="column">
                <label><span>${(storedSettings.language) ? lang(storedSettings.language).language : langText.language}</span></label>
                <div class="input select">
                  <input type="button" name="language" lang="" value="${SSLanguage}">
                </div>
              </div>
              <div class="column col-span-2">
                <label><span>${(storedSettings.language) ? lang(storedSettings.language).directoryProjects : langText.directoryProjects}</span> <span class="moreinfo" info="infoDirectoryProjects">${icons.questionCircle}</span> </label>
                <div class="input"><input type="text" name="dirprojects" value='${(storedSettings.dirprojects) ? storedSettings.dirprojects : ''}' placeholder="Ex: c:/wamp64/www or c:/xampp/htdocs"></div>
              </div>
              <div class="column">
                <label><span>${(storedSettings.language) ? lang(storedSettings.language).statusBar : langText.statusBar}</span></label>
                <div class="input select">
                  <input type="button" name="statusbar" value="${SSStatusBar}">
                </div>
              </div>
            </div>
            
            <div class="row col-4">
              <div class="column">
                <label><span>${(storedSettings.language) ? lang(storedSettings.language).theme : langText.theme}</span></label>
                <div class="input select">
                  <input type="button" name="themeColor" value="${SSTheme}">
                </div>
              </div>
              <div class="column">
                <label><span>Blur Theme</span></label>
                <div class="input select">
                  <input type="button" name="blur" value="${SSBlur}">
                </div>
              </div>
              <div class="column col-span-2">
                <label><span>${(storedSettings.language) ? lang(storedSettings.language).background : langText.background}</span> 
                <span class="range flex-center-gap1" ${(storedSettings.background) ? '' : 'disabled'}>Blur <input type="range" name="blurBackground" value="${(storedSettings.blurBackground) ? storedSettings.blurBackground : '0'}" min="0" max="50"></span> </label>
                <div class="input"><input type="text" name="background" value='${(storedSettings.background) ? storedSettings.background : ''}' placeholder="${(storedSettings.language) ? lang(storedSettings.language).backgroundPlaceholder : langText.backgroundPlaceholder}"></div>
              </div>
            </div>
          </div>
          
          <div class="row column">
            <div id="notification"></div>
            <div class="row jfy-center">
              <button class="btn-form green" status="disabled" id="save" type="button">${(storedSettings.language) ? lang(storedSettings.language).saveChanges : langText.saveChanges}</button>
              <button class="btn-form red" status="disabled" id="cancel" type="button">${(storedSettings.language) ? lang(storedSettings.language).cancel : langText.cancel}</button>
            </div>
          </div>
        `;


        newModal.start({
          contentModal: formSettings,
          id: id, style: 'width:50%;', btn
        })

        var newModalSelector = content.get('#new-modal'), urlBar = newModalSelector.get('.bar-search #url'),
          contentModal = newModalSelector.get('.content-modal'), form = newModalSelector.get('.content-modal .form'),
          btnSave = newModalSelector.get('.content-modal button#save'),
          btnCancel = newModalSelector.get('.content-modal button#cancel'), notification = newModalSelector.get('.content-modal #notification'),
          dirprojectsValue = (form.get('input[name="dirprojects"]').value == '') ? false : form.get('input[name="dirprojects"]').value,
          backgroundValue = (form.get('input[name="background"]').value == '') ? false : form.get('input[name="background"]').value,
          blurBackgroundValue = (form.get('input[name="blurBackground"]').value == '') ? false : form.get('input[name="blurBackground"]').value,
          inputLang = form.get('input[name="language"]'), inputTheme = form.get('input[name="themeColor"]'),
          inputStatusBar = form.get('input[name="statusbar"]'), inputBlur = form.get('input[name="blur"]');

        const btns = {
          unlock() {
            if (btnSave.attributes['status'].value == 'disabled') {
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
            func = (params && params.func) ? params.func : false,
            inputSelect = input.parentElement;


          if (!inputSelect.get('#contextMenu')) {
            if (form.get('#contextMenu')) { form.get('#contextMenu').remove() }
            var selectOptions = contextMenu(options)

            inputSelect.insertAdjacentHTML('beforeend', selectOptions)
            selectOverlay(inputSelect)
            chrome.storage.local.get((result) => {
              if (result[name] != undefined) {
                inputSelect.get(`#contextMenu [value="${result[name]}"]`).insertAdjacentHTML('beforeend', `<i class="checked">${icons.check}</i>`)
              } else {
                inputSelect.get(`#contextMenu [value="${valueDefault}"]`).insertAdjacentHTML('beforeend', `<i class="checked">${icons.check}</i>`)
              }
            });
            inputSelect.getAll('#contextMenu button.btn').forEach(button => {
              button.addEventListener('click', () => {
                var value = button.attributes['value'].value, text = button.innerText,
                  storedSettings = storageLocal.get();
                if (value != storedSettings[name] || value != valueDefault) {
                  inputSelect.get('input').value = text
                  window[nameVariableValue] = value;
                  btns.unlock()
                  selectClose(inputSelect)
                  if(func){
                    func(value)
                  }
                }
              })
            })
          } else {
            selectClose(inputSelect)
          }
        }
        const checkIfThemeColorChanged = () => {
          if(storageLocal.get().themeColor){
            var themeColorValueNow = document.documentElement.getAttribute('themeColor')
            if(themeColorValueNow != storageLocal.get().themeColor){
              document.documentElement.setAttribute('themeColor', storageLocal.get().themeColor)
            } else {
              themeColor.toggle()
            }
          }
        }


        inputLang.addEventListener('click', () => {
          selectOpen({
            input: inputLang,
            valueDefault: 'en-us',
            nameVariableValue: 'langValue',
            options: `
              <button class="btn column-2" value='pt-br' title="Português"><span>Português</span></button>
              <button class="btn column-2" value='en-us' title="English"><span>English</span></button>
            `
          })
        })
        inputTheme.addEventListener('click', () => {
          selectOpen({
            input: inputTheme,
            valueDefault: THEME_COLOR_DEFAULT,
            nameVariableValue: 'themeValue',
            options: `
              <button class="btn column-2" value='github_dark_dimmed' title="Github Dark Dimmed"><span>Github Dark Dimmed</span></button>
              <button class="btn column-2" value='github_light' title="Github Light"><span>Github Light</span></button>
            `,
            func: (e) => {
              document.documentElement.setAttribute('themeColor', e)
            }
          })
        })
        inputStatusBar.addEventListener('click', () => {
          selectOpen({
            input: inputStatusBar,
            valueDefault: 'disabled',
            nameVariableValue: 'statusBarValue',
            options: `
              <button class="btn column-2" value='disabled' title="${langText.disable}"><span>${langText.disable}</span></button>
              <button class="btn column-2" value='enabled' title="${langText.enable}"><span>${langText.enable}</span></button>
            `
          })

        })
        inputBlur.addEventListener('click', () => {
          selectOpen({
            input: inputBlur,
            valueDefault: 'disabled',
            nameVariableValue: 'blurValue',
            options: `
              <button class="btn column-2" value='disabled' title="${langText.disable}"><span>${langText.disable}</span></button>
              <button class="btn column-2" value='enabled' title="${langText.enable}"><span>${langText.enable}</span></button>
            `
          })

        })

        form.get('input[name="dirprojects"]').addEventListener('input', () => {
          dirprojectsValue = form.get('input[name="dirprojects"]').value
          btns.unlock()
        })

        var inputBackground = form.get('input[name="background"]'),
            inputBlurBackground = form.get('input[name="blurBackground"]');
        inputBackground.addEventListener('input', () => {
          backgroundValue = form.get('input[name="background"]').value
          if(backgroundValue.length > 0 && inputBlurBackground.parentElement.getAttribute('disabled') == ''){
            inputBlurBackground.parentElement.removeAttribute('disabled')} 
          else if(backgroundValue.length == 0){
            console.log(backgroundValue.length)
            inputBlurBackground.parentElement.setAttribute('disabled','')
          }
          btns.unlock()
        })
        inputBlurBackground.addEventListener('input', () => {
          var rangeBackground = form.get('input[name="blurBackground"]');
          blurBackgroundValue = rangeBackground.value
          background.insert(backgroundValue, blurBackgroundValue)
          btns.unlock()
        })

        form.getAll('span.moreinfo').forEach(info => {
          var infoValue = info.attributes['info'].value
          info.addEventListener('click', () => {
            warnSettings.show(notification, langText[infoValue], { type: 'info', close: true, btnClose: true, image: true })
          })

        })

        function save(){
          if (btnSave.attributes['status'].value == 'pending') {
            btns.block()
            if (typeof langValue !== typeof undefined) {
              storageLocal.set('language', langValue)
              warnSettings.close(notification)
              setTimeout(() => {
                warnSettings.show(notification, lang(storageLocal.get().language).warn_refreshPageLang, { type: 'warn' })
              }, 100);
            }
            if (typeof themeValue !== typeof undefined) {
              storageLocal.set('themeColor', themeValue)
              HTML.setAttribute('themecolor', themeValue)
            }
            if (typeof statusBarValue !== typeof undefined) {
              storageLocal.set(inputStatusBar.name, statusBarValue)
              if (statusBarValue == 'enabled') {
                statusb.enable()
              } else {
                statusb.disable()
              }
            }
            if (typeof blurValue !== typeof undefined) {
              storageLocal.set(inputBlur.name, blurValue)
              if (blurValue == 'enabled') {
                blur.enable()
              } else {
                blur.disable()
              }
            }
            if (dirprojectsValue || dirprojectsValue == '') {
              storageLocal.set('dirprojects', dirprojectsValue)
            }
            if (backgroundValue) {
              background.remove()
              setTimeout(() => {
                background.insert(backgroundValue, blurBackgroundValue)
                storageLocal.set('background', backgroundValue)
                storageLocal.set('blurBackground', blurBackgroundValue)
              }, 100);
            } else if (backgroundValue == '') {
              background.remove()
            }
            btnSave.innerText = (storedSettings.language) ? lang(storedSettings.language).changesSaved : langText.changesSaved
          }
        }
        function cancel(){
          if (!btnCancel.attributes['status']) {
            settings.close(id, btn, false, newModalSelector)
            checkIfThemeColorChanged()
          }
        }
       
        btnSave.addEventListener('click', () => {save()})
        if(btnSave) {keypress.down({key: 13,func: () => {save()}})}

        btnCancel.addEventListener('click', () => {cancel()})
        if(btnCancel) {keypress.down({key: 27,func: () => {cancel()}})}
      },
      close(id, btn, btnSave, newModalSelector) {
        const x = () => {
          newModal.close({ btn, newModalSelector })
        }
        if (btnSave) {
          if (btnSave.getAttribute('status') != 'pending') {
            x()
          } else {
            btnSave.style.animation = 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both'
            var noti = content.get('#new-modal .content-modal #notification')
            warnSettings.show(noti, lang(storedSettings.language).warn_saveChanges, { type: 'warn' })
            setTimeout(() => {
              btnSave.style.removeProperty('animation')
            }, 1000);
          }
        } else { x() }

      },
      start(id, btn) {
        const x = () => { this.close(id, btn, content.get('#new-modal .content-modal button#save'), content.get('#new-modal')) }
        if (!newModalDisplayed) {
          this.open(id, btn)
        } else if (newModalDisplayed && content.get('#new-modal').dataset.newmodal != id) {
          x()
          setTimeout(() => { this.open(id, btn) }, 210);
        } else {
          x()
        }
      }
    }
    const statusb = {
      enable() {
        statusBar.innerHTML=''
        statusBar.style.display = 'grid'
        setTimeout(() => {
          statusBar.classList.add('show')
        }, 100);

        var statusBarHTML = `
        <div class="nav"></div>
        <div class="left"></div>
        <div class="right">
          <div>${apacheaddress.innerText}</div>
        </div>
        `;

        statusBar.insertAdjacentHTML('beforeend', statusBarHTML)
      },
      disable() {
        statusBar.classList.remove('show')
      },
      check() {
        chrome.storage.local.get('statusbar', (result) => {
          if (result.statusbar != undefined) {
            if (result.statusbar == 'enabled') {
              this.enable()
            }
          }
        });
      }
    }
    const events = {
      navMenu() {
        //NAV/MENU LEFT [event listener ]
        nav.getAll('.menu .btn.icons').forEach(btn => {
          btn.addEventListener('click', () => {
            btnSrc = btn.attributes['src'];
            btnPage = btn.attributes['page'];
            btnId = btn.attributes['id'];

            if (btnSrc) {
              newTab(btnId.value, btnSrc.value, btn)
              btn.classList.add('active');
            } else if (btnPage) {
              newTab(btnId.value, false, btn, page = true)
              btn.classList.add('active');
            } else if (btnId.value == 'localhost') {
              if (content.get('.new-tab.maximized')) {
                nav.get('.menu .icons.maximized').classList.add('minimized')
                content.get('.new-tab.maximized').classList.add('minimized')
              }
              listProjects.init()
            } else if (btnId.value == 'settings') {
              settings.start(btnId.value, btn)
            } else {
              var funcs;
              if (btnId.value == 'author') {
                function funcs() {
                  var avatar = content.get('#new-modal .profile-author .avatar')
                  loading.auto(avatar, { time: 600, style: { bg: 'border-radius: 50%', spinner: 'width: 30px;height: 30px;opacity:0.4;' } })
                }
                checkConnection({ empty: true })
              }

              setTimeout(() => {
                newModal.start({
                  contentModal: htmls[btnId.value](STATUS_CONNECTION),
                  btn, id: btnId.value, style: 'width:30%;',
                  func: funcs
                })
              }, 100);
            }
          })
        })
      }

    }
    const shortcuts = {
      clearConsole(){
        window.focus()
        console.clear()
        astronaut.notify({
          selector: parent.document,
          message: `Console was cleared`,
          icon: icons.console,
          style: ASTRONAUT_NOTIFY_SETTINGS_DEFAULT,
          type: 'info',
          autoClose: 2000
        })
      },
      keypress(){
        //Ctrl+L - Clear Console
        keypress.down({
          ctrl: true,
          key: 76,
          func: () => {
            this.clearConsole()
          }
        })
        //Ctrl+Q - Toggle Devices
        keypress.down({
          ctrl: true,
          key: 81,
          func: () => {
            window.focus()
            var LayoutMode = document.querySelector('#layout').getAttribute('layout')
            function wclmsg(e, i) {
              astronaut.notify({
                selector: parent.document,
                message: `${e}`,
                icon: i,
                style: ASTRONAUT_NOTIFY_SETTINGS_DEFAULT,
                type: 'info',
                autoClose: 2000
              })
            }
            switch (LayoutMode) {
              case 'desktop':
                var modevalue = 'mobile'
                layoutMode.for(modevalue)
                layoutMode.iconLayout(modevalue)
                wclmsg('Layout Changed for Mobile', icons.layout.mobile)
              break;
              case 'mobile':
                var modevalue = 'double'
                layoutMode.for('double')
                layoutMode.iconLayout(modevalue)
                wclmsg('Layout Changed for Double', icons.layout.double)
              break;
              case 'double':
                var modevalue = 'desktop'
                layoutMode.for('desktop')
                layoutMode.iconLayout(modevalue)
                wclmsg('Layout Changed for Desktop', icons.layout.desktop)
              break;
            }
          }
        })
     
      }
    }
    const blur = {
      enable(){
        HTML.setAttribute('blur', '')
      }, 
      disable(){
        HTML.removeAttribute('blur')
      },
      check() {
        chrome.storage.local.get('blur', (result) => {
          if (result.blur != undefined) {
            if (result.blur == 'enabled') {
              this.enable()
            }
          }
        });
      }
    }
    //================================================================//
    //================================================================//

    //START INITIAL FUNTIONS ! IMPORTANT

    //FOR SERVER APACHE
    if(SERVER_APACHE){
      listProjects.check()
      liveServer.isEnabled.check()
    } else if(SERVER_LIVE){
      whenIframe('load', () => {liveReload.liveServer()})
    }

    disableContextMenuDefault()
    windowEvents.update(preview)
    loading.auto(BODY, {iframeLoaded: true})
    layoutMode.check()
    windowUrl.check()
    shortcuts.keypress()
    statusb.check()
    blur.check()
    events.navMenu()



    //================================================================//
    //================================================================//
    messageStartedInConsole()




  }
}