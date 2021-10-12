  DIRECTORY_API = (json) => {return `https://andremalveira.github.io/astronaut/api/${json}`}
  IS_DOCUMENT_MAIN = () => {try {return window.self == window.top;} catch (e) {return false;}}
  DOMINIO_NAME_FAKE = 'astronaut.library';
  TITLE_DEFAULT = 'Astronaut Library .js'
  STATUS_CONNECTION = true;
  DOCUMENT_MAIN = IS_DOCUMENT_MAIN();
  LOCALSTORAGE_NAME = 'astronaut_extension_settings';
  URL_CONNECTION = DIRECTORY_API('connection.json');

