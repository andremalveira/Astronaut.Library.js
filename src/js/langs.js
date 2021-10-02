
const lang = (lang) => {
  if(lang == 'pt-br'){
   return {  
    database:'Banco de Dados',
    palettecolor: 'Paleta de Cores',
    typography: 'Tipografia',
    settings:'Configurações',
    coffee: 'Me compra um Café? ❤☕',
    currency: 'BRL',
    copy: 'Copy',
    close:'Fechar',
    enabled: 'Habilitado',
    enable: 'Habilitar',
    disabled: 'Desabilitado',
    disable: 'Desabilitar',
    minimize:'Minimizar',
    fullscreen:'Tela Cheia',
    fullscreenExit: 'Sair da Tela Cheia',
    refresh:'Atualizar',
    information: 'Informação',
    toggleDevice:'Alternar Dispositivo',
    toggleDesktop: 'Alternar para Desktop ',
    toggleMobile: 'Alternar para Celular ',
    toggleDouble: 'Alternar para Desktop e Celular ',
    togglePhoneSize: 'Alternar Tamanho do Telefone ',
    hour: 'Hora',
    phoneScreenSize: 'Tamanho da Tela do Telefone ',
    sizeDefault: 'Tamanho Padrão',
    default: 'Padrão',
    language: 'Idioma',
    theme:'Tema',
    statusBar: 'Barra de Status',
    directoryProjects: 'Diretório de seus projetos ',
    infoDirectoryProjects: `<div>Preencha com o diretório de seus projetos para habilitar a opção "Abrir no Vscode", <br><br> Ex: c:/wamp64/www/ <br><br>OU<br><br> c:/xampp/htdocs/ </div><div> <img src=""></div>`,
    saveChanges: 'Salvar Alterações',
    changesSaved: 'Alterações Salvas',
    cancel: 'Cancelar',
    warn_saveChanges: 'Por favor, Salve suas Alterações!',
    warn_refreshPageLang: '<div><a onclick="document.location.reload()">Atualize</a>&nbsp a Página para Alterar o Idioma</div>',
    openNewTab: 'Abrir em nova Guia',
    openInVscode: 'Abrir no VSCode',
    pageNotFound: 'Página não Encontrada!',

    //cnect
    cnectOnline: 'Você está Online!',
    cnectOffline: 'Você está Offline!',
    cnectReestablished: 'Conexão Restabelecida!',
    cnectFailed: 'Falha na Conexão!',

    //liveserver
    liveServerSubtitle: 'Torna o seu servidor existente ativo ',
    liveServerBtnToggle: 'Live Reload',
    liveServerFirstInput: 'Endereço Real do Servidor ',
    liveServerLastInput: 'Endereço do Servidor Ativo ',
    liveServerBtnApply: 'Salvar',
    liveServerRequire: 'Requisito',
    liveServerOnGithub: 'LiveServer WebExtension no',
    liveServerNote: 'NOTA: Você precisa de dois servidores. Live Server dará poder "ao vivo" de seu servidor existente (pode ser Wamp, XAMPP, ou Node.js)',
    liveServerWarning: 'Para utilizar o Live Server é necessário abrir um projeto!',

    //warningXFrameHTML
    warnXFrameMsg: 'Para acessar o Banco de Dados por aqui é necessario seguir os passos abaixo!',
    warnXFrameStepOne: 'Na Pasta do seu servidor Xampp ou Wamp64 pesquise pelo arquivo <bgc>config.inc.php</bgc> que estará dentro da pasta <bgc>phpmyadmin</bgc>.',
    warnXFrameStepTwo: 'Abra o arquivo <bgc>config.inc.php</bgc> em seu editor de código.',
    warnXFrameStepThree: {text1: 'Cole o código', text2: 'antes do primeiro', text3: 'e salve.'},

    //paletteColor
    pcSolid: 'Cores Solidas',
    pcGradient: 'Cores Gradientes',
    pcInfoTextOne: 'Visualize as cores clicando com botão direito do mouse na cor desejada!',
    pcCopySuccess: 'Copiado com Sucesso!',
    pcCopyError: 'Error ao Copiar!',

    //typography
    tgInputTitle: 'Digite um Título',
    tgInputText: 'Digite um Texto',
    tgInfoTextOne: 'Visualize seu texto digitando nos inputs acima!',

   }
    
  } else if(lang == 'en-us') {
   return {    
    database:'Database',
    palettecolor: 'Color Palette',
    typography: 'Typography',
    settings:'Settings',
    coffee: 'Buy me a Coffee? ❤☕',
    currency: 'USD',
    copy: 'Copy',
    close:'Close',
    enabled: 'Enabled',
    enable: 'Enable',
    disabled: 'Disabled',
    disable: 'Disable',
    minimize:'Minimize',
    fullscreen:'Full Screen',
    fullscreenExit: 'Exit Full Screen',
    refresh:'Refresh',
    information: 'Information',
    toggleDevice:'Toggle Device',
    toggleDesktop: 'Toggle for Desktop',
    toggleMobile: 'Toggle for Mobile',
    toggleDouble: 'Toggle for Desktop and Mobile',
    togglePhoneSize: 'Toggle Phone Size',
    hour: 'Hour',
    phoneScreenSize: 'Phone Screen Size',
    sizeDefault: 'Size Default',
    default: 'Default',
    language: 'Language',
    theme:'Theme',
    statusBar: 'Status Bar',
    directoryProjects: 'Directory of your Projects',
    infoDirectoryProjects: `<div>Fill in your projects directory to enable the "Open in Vscode" option <br><br> Ex: c:/wamp64/www/ <br><br> OR <br><br> c:/xampp/htdocs/</div><div> <img src=""></div>`,
    saveChanges: 'Save Changes',
    changesSaved: 'Changes Saved',
    cancel: 'Cancel',
    warn_saveChanges: 'Please Save Your Changes!',
    warn_refreshPageLang: '<div><a onclick="document.location.reload()">Refresh</a>&nbsp Page to Change Language</div>',
    openNewTab: 'Open in New Tab',
    openInVscode: 'Open in VSCode',
    pageNotFound: 'Page not Found!',

    //cnect
    cnectOnline: 'You are Online!',
    cnectOffline: 'You are Offline!',
    cnectReestablished: 'Connection Reestablished!',
    cnectFailed: 'Connection the Failed!',

    //liveserver
    liveServerSubtitle: 'Makes your existing server live',
    liveServerBtnToggle: 'Live Reload',
    liveServerFirstInput: 'Actual Server Address',
    liveServerLastInput: 'Live Server Address',
    liveServerBtnApply: 'Apply',
    liveServerRequire: 'Requirement',
    liveServerOnGithub: 'LiveServer WebExtension on',
    liveServerNote: 'NOTE: You need two server. Live Server will give "live" power of your existing server (May be Wamp, XAMPP, or Node.js)',
    liveServerWarning: 'To use Live Server it is necessary to open a project! ',

    //warningXFrameHTML
    warnXFrameMsg: 'To access the Database from here it is necessary to follow the steps below!',
    warnXFrameStepOne: 'In your Xampp or Wamp64 server folder, search for the <bgc>config.inc.php</bgc> file that will be inside the <bgc>phpmyadmin</bgc> folder.',
    warnXFrameStepTwo: 'Open the <bgc>config.inc.php</bgc> file in your code editor.',
    warnXFrameStepThree: {text1: 'Paste the code', text2: 'before doing first', text3: 'and save.'},

    //paletteColor
    pcSolid: 'Solid Colors',
    pcGradient: 'Gradient Colors',
    pcInfoTextOne: 'View the colors by right clicking on the desired color!',
    pcCopySuccess: 'Successfully Copied!',
    pcCopyError: 'Error when copying!',

    //typography
    tgInputTitle: 'Enter a Title',
    tgInputText: 'Type a Text',
    tgInfoTextOne: 'View your text by typing in the inputs above!',


   }
    
  }
}
let langText = {}
if(localStorage.getItem(LOCALSTORAGE_NAME)){
  var storedSettings = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
  if(storedSettings.language) {
    langText = lang(storedSettings.language)
  } else {
    langText = lang('en-us')
  }
} else {
  langText = lang('en-us')
}

