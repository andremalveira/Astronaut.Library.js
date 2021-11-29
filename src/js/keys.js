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
  V_EXTENSION = 'v1.0.1'
  V_LIBRARY_COMPLETE = 'v1.0.0'
  V_NOTIFY = 'v1.0.0'
  V_INSERT = 'v1.0.0'
  V_TABLE = 'v1.0.0'
  V_CODEVIEWER = 'v1.0.0'

  //Links Downloads
  LINK_DOWN_EXTENSION = `https://github.com/andremalveira/Astronaut.Library.js/archive/refs/tags/Ast.E_${V_EXTENSION}.zip`
  LINK_DOWN_LIBRARY = `https://github.com/andremalveira/Astronaut.Library.js/archive/refs/tags/Ast.L_${V_LIBRARY_COMPLETE}.zip`

  LINK_DOWN_NOTIFY = `https://github.com/andremalveira/Astronaut.Library.js/releases/download/Ast.L_${V_NOTIFY}/astronaut.notify.${V_NOTIFY}.zip`
  LINK_DOWN_INSERT = `https://github.com/andremalveira/Astronaut.Library.js/releases/download/Ast.L_${V_INSERT}/astronaut.insert.${V_INSERT}.zip`
  LINK_DOWN_TABLE = `https://github.com/andremalveira/Astronaut.Library.js/releases/download/Ast.L_${V_TABLE}/astronaut.table.${V_TABLE}.zip`
  LINK_DOWN_CODEVIEWER = `https://github.com/andremalveira/Astronaut.Library.js/releases/download/Ast.L_${V_CODEVIEWER}/astronaut.codeviewer.${V_CODEVIEWER}.zip`