 
//create new html structure 
var listProjectsHTML = '<div></div>',
    menuApacheHTML = ''

if(SERVER_APACHE){
  listProjectsHTML = `
  <div class="container-list">
    <div class="list">
      <div class="root">
        <div grid-columns-auto-1fr>
          <i class="fas fa-folder">${icons.tag}</i>
          <div class="dir" title="${location.host+location.pathname}">${location.host.capitalize()+location.pathname}</div>
        </div>
        <div class="close-list">${icons.close}</div>
      </div>
      <div id="list-items"></div>
    </div>
  </div>
  `
  menuApacheHTML = `
    <div id="localhost" class="btn icons" title="Localhost">${icons.files}</div>
    <div id="database" src="/phpmyadmin/" class="btn icons" title="${langText.database}">${icons.server}</div>
    <span hr></span>
  `
} else {SSListIsDisplayed = ''}

var INDEX = `
<div class="container ">
  <div class="container columns" >
    <nav>
      <div class="menu">
        ${menuApacheHTML}
        <div id="palettecolor" page class="btn icons" title="${langText.palettecolor}">${icons.palette}</div>
        <div id="typography" page class="btn icons" title="${langText.typography}">${icons.typography}</div>
      </div>
      <div class="menu">
        <a href="${URL_WEB_SITE}" target="_blank" class="icons" title="Website"><i class="icon-star">${icons.astronaut}</i></a>
        <div id="credits" class="btn icons" title="${langText.creditText1}"><i class="icon-star">${icons.star}</i></div>
        <div id="author" class="btn icons" title="${langText.coffee}"><i class="icon-coffee">${icons.coffee}</i></div>
        <div id="settings" class="btn icons" title="${langText.settings}">${icons.gear}</div>
      </div>
    </nav>
    <div id="content">
      <main ${SSListIsDisplayed}>
        ${listProjectsHTML}
        <div id="layout" ${SSLayoutMode}>
          <div window id="preview" ${SSPhoneModel_model} ${heightWindowDefault}>
            <div class="navbar">
              <div class="window-control">
                <i title="${langText.close}" option="close">${icons.windowControl.close}</i>
                <i title="${langText.fullscreenExit}" option="fullscreenexit">${icons.windowControl.minimize}</i>
                <i title="${langText.fullscreen}" option="fullscreen">${icons.windowControl.maximize}</i>
              </div>
              <div class="options">
                <div class="icon" option="refresh" title="${langText.refresh}">${icons.refresh}</div>
              </div>
              <div class="bar-search">
                  <input type="text" id="url" class="search" autocomplete="off">
              </div>
              <div class="options">

                <div class="icon" option="devices" title="${langText.toggleDevice} &nbsp Ctrl+Q">
                  <i class="icon-layout">${icons.layout.desktop}</i>
                </div>
               
                ${(SERVER_APACHE) ? `
                <div class="icon" option="liveserver" ${SSPLiveServerEnabled}>
                  <i class="icon-liveServer" ${SSPLiveServerStatus}>${icons.liveServer}</i>
                </div>
                `: ''}

                <div class="icon" option="moreoptions" title="More Options">
                  <i class="icon-moreoptions">${icons.dots}</i>
                </div>
              </div>
            </div>
            <div class="display">
              ${astronaut_logo}
              <iframe ${SSPhoneModel_size} id="window_main"></iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <div id="status-bar" ${SSstatusbar}></div>
</div>
`
