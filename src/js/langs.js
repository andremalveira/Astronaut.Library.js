
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
    howto: 'Como usar',
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
    required: 'Obrigatório',
    optional: 'Opcional',
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
    astronautVariableWarn: "'astronaut.', 'astlibjs.' ou 'ast.' podem ser usadas!",

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

    //credits
    creditText1: 'Bibliotecas externas usadas neste projeto',
    creditText2: 'Bibliotecas externas usadas neste projeto',
    
    //Menu Pages
    extension: 'Extensão',
    about: 'Sobre',
    documentation: 'Documentação',


    //ABOUT
    aboutText: {
      p0: `A Extensão`,
      p1: `Astronaut Library.js é uma pequena biblioteca javascript com recursos úteis para desenvolvedores criada por <a author>André Malveira</a>.`,
      p2: `Desenvolvida totalmente em Javascript Pure, a biblioteca foi criada principalmente como uma extensão de navegador para 'localhost' dos servidores Apache, Wamp e Xampp.`,
      p3: `A extensão apenas mudaria a parência padrão de localhost, mas conforme o processo avançava, eu vim com novas idéias que poderiam ser úteis para o desenvolvimento de aplicativos, como ter a visualização do projeto na mesma guia do host local mantendo a lista dos outros projetos ao lado, mas claro que não só com isso, mas com outras ferramentas.`,
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
        <p><i dot>●</i><a opendoc="notify"> Notify</a> -> Um alerta personalizado para notificações push.</p>
      `,
    },

    //NOTIFY
    ntAbout: 'Uma pequena biblioteca para mensagens de notificações em seus Projetos ou Aplicações Web.',
    ntMessageDescrip: 'Define a Mensagem',
    ntMessageDescripDot1: 'Defina a mensagem principal ',
    ntMessageDescripDot2: 'Use "->" para setar uma mensagem secundária',

    ntIconDescrip: 'Define um Icone',
    ntIconDescripDot1: 'Defina um ícone com URL',
    ntIconDescripDot2: 'Defina um ícone com tag SVG',
    ntIconDescripDot3: 'Defina um ícone com outras tags HTML também.',

    ntLinkDescrip: 'Define Links',
    netLinkDescripDot1: 'Define Links para menssagem ou icone',
    netLinkDescripOp1: 'Link de redirecionamento para mensagem',
    netLinkDescripOp2: 'Link de redirecionamento para icone',
    netLinkDescripOp3: 'Abre link em nova guia',

    ntTypeDescrip: 'Define o tipo da Notificação',
    ntTypeDescripDot1: 'Define tipos/cores específicos para a mensagem',
    ntTypeDescripDot2: "Valores aceitos: <span text>'info'</span>, <span text>'warn'</span>, <span text>'error'</span>, <span text>'off'</span>, <span text>'success'</span> -> padrão",

    ntThemeDescrip: 'Define tema escuro',

    ntStyleDescrip: 'Defina seu próprio estilo de notificação',
    ntStyleDescripTip: 'Dica: Se desejar definir um style padrão para todas suas notificações, defina uma variavél em seu arquivo de script principal ou tag script antes de qualquer chamada notify. para armazenar os seus styles.',
    ntStyleDescripOp1: "Altera a posição da notificação na tela, <br> Outras opções: <span text fira>'top <i>-</i>> right'</span>,  <span text fira>'bottom <i>-</i>> right'</span> <br>or  <span text fira>'bottom <i>-</i>> left'</span>",
    ntStyleDescripOp2: "Altera cor de fundo, outra opção <span text fira> '<t viewcolor>#ffffff85</t> <i>-</i>> 2px' </span>, <br> O segundo parâmetro é opcional, ele declara desfoque de fundo",
    ntStyleDescripOp3: 'Altera a cor da fonte',
    ntStyleDescripOp4: 'Altera a cor da borda',
    ntStyleDescripOp5: 'Distância da notificação das laterais da tela',
    ntStyleDescripOp6: 'Altera a cor do ícone',
    ntStyleDescripOp7: 'Altera fundo do ícone',
    ntStyleDescripOp8: 'Altera o tamanho do ícone',
    ntStyleDescripOp9: "Altera a cor do ícone 'fechar'",
    ntStyleDescripOp10: "Altera fundo do ícone 'fechar'",
    ntStyleDescripOp11: "Altera tamanho do ícone 'fechar'",
    ntStyleDescripOp12: 'Adicionar um filtro à notificação',
    ntStyleDescripOp13: 'Tempo de animação da aparência da notificação', 

    ntAutoCloseDescrip: 'Define o fechamento automático',
    ntAutoCloseDescripOp1: 'Você pode definir os valores como verdadeiro ou em tempo com milissegundos',
    ntAutoCloseDescripOp2: 'Value padrão: false, tempo padrão: 5000 = 5 segundos',

    //INSERT
    insAbout: 'Insira html, css e script dinamicamente via javascript.',
    insCssDescrip: 'Insere código css dentro de <span><</span>head>.',

    //CodeViewer
    cdvwAbout: 'Torne a visualização de seus códigos mais atraente e bonitos em seus projetos.',
    cdvwAttrDescri: 'Atributos HTML independentes <br> • <span style="font-size: 0.8rem">Efeitos será aplicado apenas na div.ast-codeviewer que inseriu esses atributos.</span>',
    cdvwYourCodeHere: '//Seu código aqui',
    cdvwLangDescr: 'Define a linguagem do código que será visualizado',
    cdvwTitleDescr: 'Define um título, Ex: index.html',
    cdvwWHDescr: 'Define a altura e largura',
    cdvwCopyDescr: 'Habilita/Desabilita botão de copiar código',
    cdvwLinkDescr: 'Habilita/Desabilita botão de copiar hiperlink',
    cdvwLinkDescr2: 'Esse atributo requer um id=" " informado!',
    cdvwBlurDescr: 'Habilita/Desabilita blur no background',
    cdvwRunDescr: 'Habilita/Desabilita botão de executar código javascript',

    cdvwLineNumberDescrip: 'Habilite o número de linhas e/ou defina o estilo',
    cdvwStyleDescrip: 'Define suas estilizações',
    cdvwStyleDescripOp1: 'Define o tamanho da font',
    cdvwStyleDescripOp2: 'Define o tipo de font',
    cdvwStyleDescripOp3: 'Define uma cor de background',
    cdvwStyleDescripOp4: 'Define a cor  de font padrão',
    cdvwStyleDescripOp5: 'Mostra/esconde a barra da janela e define a cor de background',
    cdvwStyleDescripOp6: 'Aplica blur no background',
    cdvwStyleDescripOp7: 'Define a largura da janela',
    cdvwStyleDescripOp8: 'Define a altura da janela',
    cdvwStyleDescripOp9: 'Define um Box-Shadow',
    cdvwStyleDescripOp10: 'Define a borda arredondada',
    cdvwStyleDescripOp11: 'Define um Tema',

    cdvwButtonsDescrip: 'Ativa/desativa os botões de ações',
    cdvwButtonsDescripOp1: 'Habilitar/Desabilitar botão de hyperkink da janela de código,  necessário que a janela tenha um <t attr>id</t>=<t text>" "</t>',
    cdvwButtonsDescripOp2: 'Habilitar / Desabilitar botão de copiar código',
    cdvwButtonsDescripOp3: 'Define a posição dos botões, <t text>"left"</t>, <t text>"right"</t> e <t text>"window"</t>',
    cdvwButtonsDescripOp4: 'Define a cor dos ícones',
    cdvwButtonsDescripOp5: 'Define a cor do background hover',
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
    howto: 'How to use',
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
    required: 'Required',
    optional: 'Optional',
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
    astronautVariableWarn: "'astronaut.', 'astlibjs.' or 'ast.' can be used!",

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

    //credits
    creditText1: 'External libraries used in this project',
    creditText2: 'External libraries used in this project',

     //Menu Pages
     extension: 'Extension',
     about: 'About',
     documentation: 'Documentation',
 
     //ABOUT
     aboutText: {
       p0: `The Extension`,
       p1: 'Astronaut Library.js is a small Library Javascript with useful resources for Developers created by <a author>André Malveira</a>.',
       p2: 'Developed completely with Pure Javascript, the library was mainly created as a browser extension for "localhost" of the Apache, Wamp and Xampp servers.',
       p3: `The extension would just change the default parsing of localhost, but as the process progressed I came up with new ideas that could be useful for application development, like having the project view in the same tab as localhost keeping the list of other projects while side, but of course not only with that, but with other tools.`,
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
         <p><i dot>●</i><a opendoc="notify"> Notify</a> -> A custom alert for push notifications.</p>
       `,
     },

     //NOTIFY
     ntAbout: 'A small library for notification messages in your Projects or Web Applications.',
     ntMessageDescrip: 'Define the Message',
     ntMessageDescripDot1: 'Set the main message',
     ntMessageDescripDot2: 'Use "->" to set a secondary message',

     ntIconDescrip: 'Define an Icon',
     ntIconDescripDot1: 'Define an Icon with URL',
     ntIconDescripDot2: 'Define an Icon with tag SVG',
     ntIconDescripDot3: 'Define an Icon with others tags HTML too',

     ntLinkDescrip: 'Define Links',
     netLinkDescripDot1: 'Define links to message or icon',
     netLinkDescripOp1: 'Redirect link when clicking on message',
     netLinkDescripOp2: 'Redirect link when clicking on icon',
     netLinkDescripOp3: 'Open link in new tab',

     ntTypeDescrip: 'Defines the notification type',
     ntTypeDescripDot1: 'Define specific types/colors for message',
     ntTypeDescripDot2: "Accepted values: <span text fira>'warn'</span>, <span text fira>'error'</span>, <span text fira>'off'</span>, <span text fira>'success'</span> -> Default ",

     ntThemeDescrip: 'Define theme dark',

     ntStyleDescrip: 'Define your own notification style',
     ntStyleDescripTip: 'Tip: If you want to define a default style for all your notifications, define a variable in your main script file or script tag before any notify call. to store your styles.',
     ntStyleDescripOp1: "Change the position of the notification on the screen, <br>Other options : <span text fira>'top <i>-</i>> right'</span>,  <span text fira>'bottom <i>-</i>> right'</span> <br>or  <span text fira>'bottom <i>-</i>> left'</span> ",
     ntStyleDescripOp2: "Change background color, other option  <span text fira>'<t viewcolor>#ffffff85</t> <i>-</i>> 2px'</span>, <br>Second parameter is optional, he declare  background blur ",
     ntStyleDescripOp3: 'Change font color',
     ntStyleDescripOp4: 'Change border color',
     ntStyleDescripOp5: 'Notification distance from the sides of the screen ',
     ntStyleDescripOp6: 'Change icon color',
     ntStyleDescripOp7: 'Change icon background',
     ntStyleDescripOp8: 'Change icon size',
     ntStyleDescripOp9: "Change icon 'close' color",
     ntStyleDescripOp10: "Change icon 'close' background",
     ntStyleDescripOp11: "Change icon 'close' size",
     ntStyleDescripOp12: 'Add a filter to the notification',
     ntStyleDescripOp13: 'Notification appearance animation time ',

     ntAutoCloseDescrip: 'Sets automatic closing',
     ntAutoCloseDescripOp1: 'You can set the values to true or in milliseconds',
     ntAutoCloseDescripOp2: 'Default value: false, default time: 5000 = 5 seconds',

     //INSERT
     insAbout: 'Insert html, css and script dynamically via javascript. ',
     insCssDescrip: 'Insert css code inside <span><</span>head>.',

     //CodeViewer
     cdvwAbout: 'Make viewing your codes more attractive and beautiful in your projects.',
     cdvwAttrDescri: 'Attributes HTML Independents <br> • <span style="font-size: 0.8rem">Effects will be applied only on div.ast-codeviewer that inserted these attributes.</span>',
     cdvwYourCodeHere: '//your code here',
     cdvwLangDescr: 'Defines the language of the code that will be displayed',
     cdvwTitleDescr: 'Define a title, eg: index.html',
     cdvwWHDescr: 'Set the height and width',
     cdvwCopyDescr: 'Enable/Disable copy code button ',
     cdvwLinkDescr: 'Enable/Disable copy hyperlink button ',
     cdvwLinkDescr2: 'This attribute requires an id=" " entered! ',
     cdvwBlurDescr: 'Enable/Disable blur in background',
     cdvwRunDescr: 'Enable/Disable code javascript execute button',

     cdvwLineNumberDescrip: 'Enable line numbers and/or set style',
     cdvwStyleDescrip: 'Define your stylizations',
     cdvwStyleDescripOp1: 'Set font size',
     cdvwStyleDescripOp2: 'Defines the font type',
     cdvwStyleDescripOp3: 'Set a background color',
     cdvwStyleDescripOp4: 'Set the default font color',
     cdvwStyleDescripOp5: 'Show/Hide Window Bar and Set Background Color',
     cdvwStyleDescripOp6: 'Apply blur in the background',
     cdvwStyleDescripOp7: 'Defines the width of the window',
     cdvwStyleDescripOp8: 'Defines the height of the window',
     cdvwStyleDescripOp9: 'Define a Box-Shadow',
     cdvwStyleDescripOp10: 'Defines the rounded edge',
     cdvwStyleDescripOp11: 'Define a Theme',

     cdvwButtonsDescrip: 'Enable/Disable Action Buttons',
     cdvwButtonsDescripOp1: 'Enable/Disable code window hyperkink button, required window to have <t attr>id</t>=<t text>" "</t>',
     cdvwButtonsDescripOp2: 'Enable / Disable Copy Code Button',
     cdvwButtonsDescripOp3: 'Set the position of the buttons, <t text>"left"</t>, <t text>"right"</t> e <t text>"window"</t>',
     cdvwButtonsDescripOp4: 'Sets the color of the icons',
     cdvwButtonsDescripOp5: 'Set hover background color',
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

