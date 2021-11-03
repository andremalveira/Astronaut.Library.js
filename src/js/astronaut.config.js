  const API = (json) => {return `https://astlibjs.ga/api/${json}`}
  const IDM = () => {try {return window.self == window.top;} catch (e) {return false;}}
  const IFM = () => {if(window.frameElement){return window.frameElement.id == 'window_main'}}
  const IFMirror = () => {if(window.frameElement){return window.frameElement.id == 'window_mirror'}}
  const IAS = () =>  {
    var address = parent.document.querySelector('address') ?? false ;
        apache = (address) ? ((address.innerText.indexOf('Apache') == 0) ? true : false) : false;
        return apache
  }

  
  //KEYS GLOBAIS
  SERVER_APACHE = IAS();
  STATUS_CONNECTION = true;
  DOCUMENT_MAIN = IDM();
  FRAME_MAIN = IFM();
  FRAME_MIRROR = IFMirror();
  LOCALSTORAGE_NAME = 'astronaut_extension_settings';
  URL_CONNECTION = API('connection.json');
  URL_WEB_SITE = 'https://astlibjs.ga/?page=extension';
  ASTRONAUT_NOTIFY_SETTINGS_DEFAULT = {
    position: 'bottom->right',
    theme:'dark', 
    iconSize: '1.8rem'
  }
