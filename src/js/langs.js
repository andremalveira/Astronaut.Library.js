
const lang = (lang) => {
  if(lang == 'pt-br'){
   return {  
    database:'Banco de Dados',
    palettecolor: 'Paleta de Cores',
    typography: 'Tipografia',
    settings:'Configurações',
    coffee: 'Me compra um Café? ❤☕',
    credit: 'Créditos',
    currency: 'BRL',
    copy: 'Copiar',
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

    //Menu Pages
    extension: 'Extensão',
    about: 'Sobre',

    //ABOUT
    aboutText: {
      p0: `A Extensão`,
      p1: `Astronaut Library.js é uma pequena biblioteca com recursos úteis para desenvolvedores criada por <a author>André Malveira</a>.`,
      p2: `Desenvolvida totalmente em Javascript Pure, a biblioteca foi criada principalmente como uma extensão de navegador para 'localhost' dos servidores Apache, Wamp e Xampp.`,
      p3: `A extensão apenas mudaria a cor do localhost padrão para uma cor mais escura, como um tema, mas conforme o processo avançava, eu vim com novas idéias que poderiam ser úteis para usuários de localhost como eu, porque aqueles que trabalham com os servidores Apache mencionados acima, eles costumam acessar o localhost principal para acessar um projeto, e para quem gosta de um tema escuro e já o usa em outros programas como VSCode, Browsers e até no sistema operacional, pensei que também gostariam de um localhost diferente com um tema escuro e que não prejudicaria tanto os olhos.`,
      p4: `Portanto, além de apenas mudar a cor branca padrão para uma cor mais escura, pensei em mudar toda a aparência da página manipulando o DOM de uma forma que pudesse ser útil para o desenvolvimento de aplicativos, como ter a visualização do projeto na mesma guia do host local mantendo a lista dos outros projetos ao lado, mas claro que não só com isso, mas com outras ferramentas.`,
      p5: `Ferramentas da Extensão`,
      ps6: `
        <p><i dot>●</i> Visualização do projeto na versão Desktop e Mobile.</p>
        <p><i dot>●</i> Live Server, Atualização em tempo real das alterações no projeto.</p>
        
        <p><i dot>●</i> Abra o projeto no Vscode diretamente de localhost, é necessário adicionar o diretório dos projetos em configurações.</p>
        <p><i dot>●</i> Acesso ao banco de dados sem sair de localhost, é necessário realizar configuração para acessar o phpmayadmin.</p>
        <p><i dot>●</i> Paletas de Cores úteis.</p>
        <p><i dot>●</i> Tipografia de Fontes.</p>
      `,
      p7: `Outros Recursos da Biblioteca`,
      p8: `Além da extensão, a biblioteca também tem outras ferramentas para ultilizar em sites ou aplicações que usam o javascript.`,
      p9: `Das outras Ferramentas`,
      ps10: `
        <p><i dot>●</i><a opendoc="notify"> Notify</a> -> É como um alerta personalizado porém criado a fim de mostrar notificações.</p>
      `,
    },

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
    credit: 'Credits',
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

    //Menu Pages
    extension: 'Extension',
    about: 'About',

    //ABOUT
    aboutText: {
      p0: `The Extension`,
      p1: 'Astronaut Library.js is a small Library with useful resources for Developers created by <a author>André Malveira</a>.',
      p2: 'Developed completely with Pure Javascript, the library was mainly created as a browser extension for "localhost" of the Apache, Wamp and Xampp servers.',
      p3: `The extension would just change the default localhost color to a darker color, as a theme, but as the process progressed I came up with new ideas that could be useful for localhost users like me, because those who work with the Apache servers mentioned above, they often access the main localhost to access a project, and for those who like a dark theme and already use it in other programs such as VSCode, Browsers and even the Operating System, I thought they would also like a different localhost with a dark theme and that it wouldn't damage the eyes so much.`,
      p4: `So in addition to just changing the default white color to a darker color, I thought of changing the whole look of the page by manipulating the DOM in a way that could be useful for application development like having the project view on the same tab as localhost keeping the list of the other projects on the side, but of course not only with that, but with other tools. `,
      p5: `Extension Tools`,
      ps6: `
        <p><i dot>●</i> Project preview in Desktop and Mobile version.</p>
        <p><i dot>●</i> Live Server, Real-time update of project changes.</p>
      
        <p><i dot>●</i> Open project in Vscode directly from localhost, it is necessary to add the projects directory in settings.</p>
        <p><i dot>●</i> Access database without leaving localhost, configuration is required to access phpmayadmin.</p>
        <p><i dot>●</i> Useful Color Palettes.</p>
        <p><i dot>●</i> Font Typography.</p> 
      `,
      p7: `Other Library Resources`,
      p8: `Besides the extension, the library also has other tools to use in websites or applications that use javascript. `,
      p9: `Other Tools`,
      ps10: `
        <p><i dot>●</i><a opendoc="notify"> Notify</a> -> It's like a custom alert but created in order to show notifications.</p>
      `,
    },

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

