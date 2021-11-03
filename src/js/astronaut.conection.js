//CHECK CONNECTION WITH INTERNET

  const CONNECTION = async (params) => {
    var online = (params.online) ? params.online : false,
        offline = (params.offline) ? params.offline : false,
        empty = (params.empty) ? params.empty : false;
    
    const status = async () => {
      try {
        const online = await fetch(URL_CONNECTION, {cache:'reload'});
        return online.status >= 200 && online.status < 300; 
      } catch (err) {
        if(online && offline){konsole.error(langText.cnectOffline)}
        return false
      }
    };
    if(await status()){
      STATUS_CONNECTION = true; 
      if(online){online()}
      else {if(!empty){
        konsole.success(langText.cnectOnline)
        astronaut.notify({
          message: langText.cnectOnMessage,
          icon: icons.wifi, 
          style: ASTRONAUT_NOTIFY_SETTINGS_DEFAULT,
        })
      }}
    } else {
      STATUS_CONNECTION = false; 
      if(offline){offline()}
      else {
        if(!empty){
          konsole.error(langText.cnectOffline)
          astronaut.notify({
            message: langText.cnectOffMessage,
            icon: icons.wifioff, type:'off',
            style: ASTRONAUT_NOTIFY_SETTINGS_DEFAULT,
          })
        }
      }
    }
  };

  const checkConnection = (e) => {CONNECTION(e)}

  //VERIFIER 
  const navigatorStatus = () => {
    if (navigator.onLine) {
      setTimeout(() => {
        checkConnection({})
        konsole.success(langText.cnectReestablished);
      }, 5000);
    } else {
      setTimeout(() => {
        checkConnection({})
        konsole.error(langText.cnectFailed);
      }, 5000);
    }
  }
  if(DOCUMENT_MAIN){
    //OBSERVER
    window.addEventListener("offline", function(e) {navigatorStatus()}, false);
    window.addEventListener("online", function(e) {navigatorStatus()}, false);
  }

