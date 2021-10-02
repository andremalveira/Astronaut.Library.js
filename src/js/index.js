
  //SETTINGS STORED
  if(localStorage.getItem(LOCALSTORAGE_NAME)){
    var storedSettings = storageLocal.get();
  }
  
  var SSLayoutMode = (storageLocal.get('layoutMode')) ? `layout="${storedSettings.layoutMode}"` : 'layout=""',
      SSListIsDisplayed = (storageLocal.get('listIsDisplayed') === true) 
      ? 'class="view-list-ocult"': '',
      astronaut_logo = ``,
      SSPhoneModel_size = (storedSettings && storedSettings.layoutMode == 'mobile' && storedSettings.phoneModel && storedSettings.phoneModel.size) ? 
      `style="width:${storedSettings.phoneModel.size.width/16+'rem'};height:${storedSettings.phoneModel.size.height/16+'rem'}"` : '',
      SSPhoneModel_model = (storedSettings && storedSettings.layoutMode == 'mobile' && storedSettings.phoneModel) ? 'model' : '',
      SSPLiveServerStatus =  (storedSettings && storedSettings.liveServer) ? (storedSettings.liveServer.isEnable) ? 'title="Live Server (Enabled)" status=""' : 'title="Live Server (Disabled)" status="disabled"' : 'title="Live Server (Disabled)" status="disabled"', 
      SSPLiveServerEnabled =  (storedSettings && storedSettings.liveServer) ? (storedSettings.liveServer.isEnable) ? 'enabled' : '' : '',
      SSstatusbar = (storedSettings && storedSettings.statusbar == 'enabled') 
      ? 'class="show" style="display:grid"': '';

  var btnDevicesCheck = false,btnRefreshCheck = false, iframeCheck = false;

//create new html structure 
var structure = `
<div class="container ">
  <div class="container columns" >
    <nav>
      <div class="menu">
        <div id="localhost" class="icons" title="Documentation">${icons.files}</div>
        <div id="database" src="/phpmyadmin/" class="icons" title="${langText.database}">${icons.server}</div>
        <span hr></span>
        <div id="palettecolor" page class="icons" title="${langText.palettecolor}">${icons.palette}</div>
        <div id="typography" page class="icons" title="${langText.typography}">${icons.typography}</div>
      </div>
      <div class="menu">
        <div id="donate" class="icons" title="${langText.coffee}"><i class="icon-coffee">${icons.coffee}</i></div>
        <div id="settings" class="icons" title="${langText.settings}">${icons.gear}</div>
      </div>
    </nav>
    <div id="content">
      <main ${SSListIsDisplayed}>
        <div class="container-list">
          <div class="list">
            <div class="root">
              <div class="for-home" grid-columns-auto-1fr>
                <i class="fas fa-folder"></i>
                <div class="dir" title="Home">${document.head.get('title').innerText}</div>
              </div>
              <div class="close-list">${icons.close}</div>
            </div>
            <div id="list-items">
              <div class="item"><a flex data-type="docs" data-id="notify"><span>Notify</span></a></div>
              <div break></div>
              <div class="item"><a flex data-type="library" data-id="about"><span>About</span></a></div>
              <div class="item"><a flex data-type="library" data-id="download"><span>Download</span></a></div>
            </div>

          </div>
        </div>
        <div id="layout" ${SSLayoutMode}>
          <div window id="preview" ${SSPhoneModel_model} >
            <div class="navbar">
              <div class="window-control">
                <i title="${langText.close}" >${icons.windowControl.close}</i>
                <i title="${langText.fullscreenExit}" option="fullscreenexit">${icons.windowControl.minimize}</i>
                <i title="${langText.fullscreen}" option="fullscreen">${icons.windowControl.maximize}</i>
              </div>
              <div class="options">
                ${(btnRefreshCheck) ? `<div class="icon" option="refresh" title="${langText.refresh}">${icons.refresh}</div>` : ''}
              </div>
              <div class="bar-search">
                  <input type="button" id="url" class="search" autocomplete="off">
              </div>
              <div class="options">
                ${
                  (btnDevicesCheck) ? `               
                <div class="icon" option="devices" title="${langText.toggleDevice}">
                  <i class="icon-layout">${icons.layout.desktop}</i>
                </div>`
                : ''
                }
              </div>
            </div>
            <div class="display">
              ${(iframeCheck) ? `<iframe ${SSPhoneModel_size} ></iframe>` : ''}
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

</div>
`