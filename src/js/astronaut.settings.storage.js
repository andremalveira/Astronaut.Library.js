  //SETTINGS STORED
  if(localStorage.getItem(LOCALSTORAGE_NAME)){
    var storedSettings = storageLocal.get();
  }
  var SSLayoutMode = (storedSettings) ? `layout="${storedSettings.layoutMode}"` : 'layout=""',
      SSListIsDisplayed = (storedSettings && storedSettings.listIsDisplayed == true) 
      ? 'class="view-list-ocult"': '',  
      astronaut_logo = `<div class="astronaut"><img src="${getImage('svg/astronaut.svg')}"/></div>`,

      SSPhoneModel_size = 
      (storedSettings && storedSettings.layoutMode == 'mobile' && storedSettings.phoneModel && storedSettings.phoneModel.size) ? 
      `style="width:${storedSettings.phoneModel.size.width/16+'rem'};height:${storedSettings.phoneModel.size.height/16+'rem'}"` : '',

      SSPhoneModel_model = (storedSettings && storedSettings.layoutMode == 'mobile') ? 'model' : '',
      SSPLiveServerStatus =  (storedSettings && storedSettings.liveServer) ? (storedSettings.liveServer.isEnable) ? 'title="Live Server (Enabled)" status=""' : 'title="Live Server (Disabled)" status="disabled"' : 'title="Live Server (Disabled)" status="disabled"', 
      SSPLiveServerEnabled =  (storedSettings && storedSettings.liveServer) 
      ? (storedSettings.liveServer.isEnable && storedSettings.liveServer.actualUrl != '') 
      ? 'enabled' : '' : '',
      
      SSstatusbar = (storedSettings && storedSettings.statusbar == 'enabled') 
      ? 'class="show" style="display:grid"': ''

      var heightBody = window.innerHeight,
          heightBody = heightBody - 90,
          heightBody = heightBody/16;
      var heightWindowDefault = (
        storedSettings && storedSettings.phoneModel && storedSettings.phoneModel.id == 'default' && storedSettings.layoutMode != 'desktop'
        || storedSettings && storedSettings.phoneModel == false && storedSettings.layoutMode != 'desktop'
        )? `style="height:${heightBody}rem"` : ''
