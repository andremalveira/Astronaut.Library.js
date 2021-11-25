  DOMINIO_MAIN = 'https://astlibjs.ga'
  REPO = 'astronaut'
  DIRECTORY_API = (json) => {return `${DOMINIO_MAIN}/api/${json}`}
  IS_DOCUMENT_MAIN = () => {try {return window.self == window.top;} catch (e) {return false;}}
  DOMINIO_NAME_FAKE = 'astronaut.library.js';
  TITLE_DEFAULT = 'Astronaut Library .js'
  STATUS_CONNECTION = true;
  DOCUMENT_MAIN = IS_DOCUMENT_MAIN();
  LOCALSTORAGE_NAME = 'AstronautLibrary.js';
  URL_CONNECTION = DIRECTORY_API('connection.json');

  //Libray versions 
  V_LIBRARY_COMPLETE = 'v1.0.0'
  V_NOTIFY = 'v1.0.0'
  V_INSERT = 'v1.0.0'
  V_TABLE = 'v1.0.0'
  V_CODEVIEWER = 'v1.0.0'