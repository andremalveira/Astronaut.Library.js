//=======================================//
  URL_WEB_SITE = 'https://astlibjs.ga/';
//=======================================//

  const API = (json) => {return `${URL_WEB_SITE}/api/${json}`}
  const IDM = () => {try {return window.self == window.top;} catch (e) {return false;}}
  const IFM = () => {if(window.frameElement){return window.frameElement.id == 'window_main'}}
  const IFMirror = () => {if(window.frameElement){return window.frameElement.id == 'window_mirror'}}
  const IAS = () =>  {var address = parent.document.querySelector('address') ?? false, indexOfText = (parent.document.body) ? parent.document.body.innerHTML.indexOf('Index of /') > -1 : false;apache = (address) ? {wmxm: (address.innerText.indexOf('Apache') > -1)} : (indexOfText);return apache}
  const ILS = () =>  {var body = parent.document.body,liveServerTxt = (body) ? body.innerHTML.indexOf('live-server') : false;return (liveServerTxt >= 0) ? true : false}
  const PNE = () => {if(IDM()){if(location.pathname != '/') return false;return true} }
  const ISC = () => {if(IAS() && !ILS()) return true;if(!IAS() && ILS()) return true;return false}

  //KEYS GLOBAIS
  SERVER_APACHE = IAS();
  SERVER_LIVE = ILS();
  IS_COMPATIBLE = ISC()
  STATUS_CONNECTION = true;
  DOCUMENT_MAIN = IDM();
  FRAME_MAIN = IFM();
  FRAME_MIRROR = IFMirror();
  PATHNAME_EMPTY = PNE();
  LOCALSTORAGE_NAME = 'astronaut_extension_settings';
  LOCALSTORAGE_NAME_NOSHARED = 'astronaut_extension_settings_noShared';
  URL_CONNECTION = API('connection.json');
  THEME_COLOR_DEFAULT = 'github_dark_dimmed'
  ASTRONAUT_NOTIFY_SETTINGS_DEFAULT = {
    position: 'bottom->right',
    theme:'dark', 
    iconSize: '1.8rem'
  }



