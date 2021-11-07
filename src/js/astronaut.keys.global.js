  const API = (json) => {return `https://astlibjs.ga/api/${json}`}
  const IDM = () => {try {return window.self == window.top;} catch (e) {return false;}}
  const IFM = () => {if(window.frameElement){return window.frameElement.id == 'window_main'}}
  const IFMirror = () => {if(window.frameElement){return window.frameElement.id == 'window_mirror'}}
  const IAS = () =>  {var address = parent.document.querySelector('address') ?? false;apache = (address) ? ((address.innerText.indexOf('Apache') == 0) ? true : false) : false;return apache}
  const PNE = () => {if(IDM()){if(location.pathname != '/') return false;return true} }

  //KEYS GLOBAIS
  SERVER_APACHE = IAS();
  STATUS_CONNECTION = true;
  DOCUMENT_MAIN = IDM();
  FRAME_MAIN = IFM();
  FRAME_MIRROR = IFMirror();
  PATHNAME_EMPTY = PNE();
  LOCALSTORAGE_NAME = 'astronaut_extension_settings';
  LOCALSTORAGE_NAME_NOSHARED = 'astronaut_extension_settings_noShared';
  URL_CONNECTION = API('connection.json');
  URL_WEB_SITE = 'https://astlibjs.ga/?page=extension';
  THEME_COLOR_DEFAULT = 'github_dark_dimmed'
  ASTRONAUT_NOTIFY_SETTINGS_DEFAULT = {
    position: 'bottom->right',
    theme:'dark', 
    iconSize: '1.8rem'
  }
