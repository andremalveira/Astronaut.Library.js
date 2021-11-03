const popupLiveServerHTML = (params) =>{ 
    var none = '', warning = '';
  if(!params.storageLocal.lastWindowUrl){
      none = 'style="display:none"'
      warning = `<div class="warning-liveserver">${params.langText.liveServerWarning}</div>`
  }
  return `
  <div id="popupLiveServer">
    <div class="header">
        Live Server
        <div></div>
        Web Extension
        <p>"${params.langText.liveServerSubtitle}"</p>
    </div>
    ${warning}
    <div class="content" ${none}>
        <div class="row flex-column-center">
            <label class="form-label" for="liveReloadCheck">${params.langText.liveServerBtnToggle}</label>
            <div class="tg-list">
                <div class="tg-list-item">
                    <input class="tgl tgl-ios" id="liveReloadCheck" type="checkbox" />
                    <label class="tgl-btn" for="liveReloadCheck"></label>
                </div>
            </div>
        </div>
        <div id="serverSetup">
            <div class="row">
                <div>
                    <label class="form-label" for="actualServer">${params.langText.liveServerFirstInput}</label>
                    <input class="form-control" type="text" id="actualServer" placeholder="http://localhost/">
                </div>
            </div>
            <div class="row">
                <div>
                    <label class="form-label" for="liveServer">${params.langText.liveServerLastInput}</label>
                    <input class="form-control" type="text" id="liveServer" placeholder="http://127.0.0.1:5500/">
                </div>
            </div>
            <div class="row flex-column-center">
                <div><button class="btn-form green" type="submit" id="submitBtn" disabled>${params.langText.liveServerBtnApply}</button></div>
            </div>
        </div>
    </div>
    <div class="footer">
    
        <div class="flex-gap">
            <div>● ${params.langText.liveServerRequire} <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer">Install Live Server</a></div>
            <div>● ${params.langText.liveServerOnGithub} <a target="_blank" href="https://github.com/ritwickdey/live-server-web-extension">Github</a></div>
        </div>
    </div>
  </div>
  `;
}