//CHECK CONNECTION WITH INTERNET

  const  konsole = {
    success(text) {
      console.log(
        `%c ✔ ${text}`,
        ` color: #8effa2;background-color: #01a96b;padding: 0.3rem 1.8rem 0.3rem 0.3rem;
          font-size:0.7rem;border-radius:0.2rem;border: solid 1px #10ec57;
        `);
    },
    error(text) {
      console.log(
        `%c ✖ ${text}`,
        ` color: #ff8080;background-color: #290000;padding: 0.3rem 1.8rem 0.3rem 0.3rem;
          font-size:0.7rem;border-radius:0.2rem;border: solid 1px #5c0000;
        `);
    }
  }
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
          message: "You're online now -> Hurray! Internet is connected. ",
          icon: icons.wifi, position: 'right->top',theme:'dark',
        })
      }}
    } else {
      STATUS_CONNECTION = false; 
      if(offline){offline()}
      else {
        konsole.error(langText.cnectOffline)
        astronaut.notify({
          message: "You are without Internet access! ->  Check your connection. ",
          icon: icons.wifioff, position: 'right->top',type:'off',theme:'dark',
        })
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

