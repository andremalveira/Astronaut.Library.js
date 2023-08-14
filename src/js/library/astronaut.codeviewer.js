//---------------------------------------------------------------------------//
//                    Astronaut Library.js - CodeViewer v1.0                 //
// License: MIT                                                              //
// Author: André Malveira.                                                   //
// Github: https://github.com/andremalveira                                  //
// Docs:   https://astlibjs.ga/?docs=codeviewer                              //
//---------------------------------------------------------------------------//


let __codeviewer = {
  $library:'CodeViewer',
  $version: '1.0',
  $webSite: 'https://astlibjs.ga?docs=codeviewer',
  $shortName: 'astlibjs',
  create: {
    id() {return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5))},
  },
  insert: {
    css(css, id, currentScript) {
      if(css && id){
        var newStyle = document.createElement('style')
        id = astronaut.$shortName+'-'+id+'-css',
        newStyle.id= id 
        newStyle.textContent = css;
        if(!document.head.querySelector(`style#${id}`)){
          document.head.appendChild(newStyle) 
        } else {
          var styletag = document.head.querySelector(`style#${id}`)
          if(styletag.textContent != css){
            styletag.textContent = css
          }
        }
        if(currentScript){
          document.currentScript.remove()
        }
      } else {
        console.error(`💔 ${astronaut.$shortName}.insert.css()! Error when inserting css because you did not inform the ${((id == undefined || id == '') ? `second parameter was not defined id! Ex: ${astronaut.$shortName}.insert.css('css', 'id')` : (css == undefined || css == '') ? `the first parameter was not defined or the first parameter is empty css! Ex: ${astronaut.$shortName}.insert.css('css', 'id')` : '')}`)
      }
    }
  },
  copy(value, selector)  {
    var selector = (selector) ? selector : document.body

    function clipboard(textToCopy) {
      if (navigator.clipboard && window.isSecureContext) {
          // navigator clipboard api method'
          return navigator.clipboard.writeText(textToCopy);
      } else {
          // text area method
          let textArea = document.createElement("textarea");
          textArea.value = textToCopy;
          // make the textarea out of viewport
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          return new Promise((res, rej) => {
              // here the magic happens
              document.execCommand('copy') ? res() : rej();
              textArea.remove();
          });
      }
    }
    clipboard(value)
    .then(() => {
      astronaut.warning({text: 'Copied!', selector})
    })
    .catch(err => {
      astronaut.warning({text: 'Error when Copying!', selector})
    })
  },
  warning(params)  {
    var text = (params.text) ? params.text : false, selector = (params.selector) ? params.selector : document;
    this.insert.css(`
/*Astronaut Library.js - Warning*/
.ast-warning {
  position: absolute;
  padding: 0.2rem 0.8rem;
  border-radius: 0.3rem;
  background: #2d333b;
  color: #eee;
  box-shadow: 0px 0px 0px 0.03rem #00000030;
  animation: show_ast_warning 0.3s ease forwards;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 0;
  z-index: 1;
}
@keyframes show_ast_warning {
  0% {opacity: 0;transform: translate(-50%, -50%) scale(0.7);}
  40% {opacity: 1;transform: translate(-50%, -50%) scale(1.2);}
  100% {opacity: 1;transform: translate(-50%, -50%) scale(1);}
}
@keyframes hide_ast_warning {
  0% {opacity: 1;transform: translate(-50%, -50%) scale(1);}
  40% {opacity: 1;transform: translate(-50%, -50%) scale(1.2);}
  100% {opacity: 0;transform: translate(-50%, -50%) scale(0.7);}
}
    `, 'warning')
   
    selector.insertAdjacentHTML('beforeend', `<div class="ast-warning">${text}</div>`)
    var astWarn = selector.querySelector('.ast-warning');
    setTimeout(() => {
      astWarn.style.animationName='hide_ast_warning'
      setTimeout(() => {
        astWarn.remove()
      }, 500); 
    }, 1500);
  },
  codeviewer(params) {
    var e = params,s = e.style,
        lineNumber   = (e && e.lineNumber)        ? e.lineNumber         : false,
        fontSize     = (s && s.fontSize)          ? s.fontSize           : '0.9rem',
        fontFamily   = (s && s.fontFamily)        ? s.fontFamily         : "Fira Code, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        theme        = (s && s.theme)             ? s.theme              : 'copilot',
        background   = (s && s.background)        ? s.background         : false,
        color        = (s && s.color)             ? s.color              : false,
        blurFilter   = (s && s.blur)              ? s.blur               : false,
        width        = (s && s.width)             ? s.width              : '100%',
        height       = (s && s.height)            ? s.height             : 'auto',
        buttons      = (e && e.buttons)           ? e.buttons            : false,
        boxShadow    = (s && s.boxShadow)         ? s.boxShadow          : false,
        borderRadius = (s && s.borderRadius)      ? s.borderRadius       : '0.6rem',

        b           = buttons,
        opHyperlink = (b && b.hyperlink)    ? b.hyperlink    : false,
        opCopy      = (b && b.copy)         ? b.copy         : false,
        opPosition  = (b && b.position)     ? b.position     : 'window',
        opColor     = (b && b.color)        ? b.color        : '#939da5',
        opBg        = (b && b.backgroundHover )  ? b.backgroundHover   : '#adbac74a',

        windowBar   =  (s && s.windowBar == false || s && s.windowBar != undefined) 
        ? s.windowBar : true;
        if(!windowBar){opPosition = 'right'}


    //insertCSS
    function codeviewcss(params) {
      var ln = (params) ? params.lineNumber : false;
          lnColor     = (ln && ln.color)      ? ln.color      : '#adbac74a',
          lnSeparator = (ln && ln.separator)  ? ln.separator  : true,
          lnOpacity   = (ln && ln.opacity)    ? ln.opacity    : false,
  
          ff = params.fontFamily,
          fs = params.fontSize,
          th = params.theme,
          wb = params.windowBar,
  
    astronaut.insert.css(`
  /*Astronaut Library.js - CodeViewer*/
  .ast-codeviewer {
    width: ${width};
    height: ${height};
    border-radius: ${borderRadius};
    color: transparent; 
    margin: 0.5rem 0;
    position: relative;
    display: flex;
    ${(boxShadow) ? `box-shadow: ${boxShadow};` : ''}
  }
  .ast-codeviewer[data-blur] {
    backdrop-filter: blur(2rem);
  }
  .ast-codeviewer .astcw-window {
    width: 100%;
    display: grid;
    grid-template-rows: ${(wb) ? 'auto' : ''} 1fr;
    border-radius: ${borderRadius};
    position: relative;
  }
  script[type="text/plain"].ast-codeviewer,
  .ast-codeviewer i, .ast-codeviewer a {
    display: flex;
  }
  .ast-codeviewer :is(.astcw-container, .astch-y)::-webkit-scrollbar {
    width: 8px;
    height: 0px;
    border-radius: ${borderRadius};
    background: transparent;
  }
  .ast-codeviewer :is(.astcw-container, .astch-y)::-webkit-scrollbar-thumb {
    height: 5px;
    border-radius: ${borderRadius};
    margin: 1rem;
  }
  .ast-codeviewer :is(.astcw-container, .astch-y)::-webkit-scrollbar-track {
    border-radius: ${borderRadius};
  }
  .ast-codeviewer :is(.astcw-container, .astch-y)::-webkit-scrollbar-corner {
    background: transparent;
  }
  .ast-codeviewer .astch-y {
    display: grid;
    grid-template-columns: auto 1fr;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
  }
  .ast-codeviewer .astcw-container {
    position: relative;
    padding: 1rem 0;
    margin: 0 0.5rem;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .ast-codeviewer .astch-y:not(.line-numbers) .astcw-container {
    margin: 0 1rem;
  }
  .ast-codeviewer :is(.astvw-options) {
    ${(opPosition && opPosition == 'window' ) 
    ? '' : 'position: absolute;display: flex;flex-direction: column;'}
    ${(opPosition && opPosition == 'left' || opPosition == 'right') ? opPosition : 'right'}: -35px;
    top: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ease 0.2s;
    opacity: 0;
  }
  .ast-codeviewer :is(.op) {
    ${(opPosition && opPosition == 'window' ) 
    ? 'width: 20px;height:20px;border-radius: 0.3rem;padding: 0.1rem;' 
    : 'border-radius: 0.3rem;width: 25px;height:25px;'}
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .ast-codeviewer :is(.op):hover {
    background: ${opBg};
  }
  .ast-codeviewer:hover .astvw-options {
    opacity: 1;
  }
  .ast-codeviewer :is(.op) a {
    color: ${opColor};
    ${(opPosition && opPosition == 'window' ) ? '' : 'padding: 0.3rem;'}
  }
  .ast-codeviewer .op.hyperlink a svg {
    margin-top: 1px;
  }
  .ast-codeviewer .op.run a svg {
    margin: 2px 0px 0px 2px;
  }
  .code-nav-bar {
    padding: 0.4rem 0.8rem;
    height: 1.5rem;
    display: grid;
    grid-template-columns: 5rem 1fr 5rem;
    align-items: center;
    border-radius: ${borderRadius} ${borderRadius} 0 0;
    font-family: system-ui;
  }
  .code-nav-bar .windowControl { 
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  .code-nav-bar .windowControl [dot] { 
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .code-nav-bar .windowControl [dot="E0443E"] {background: #E0443E;}
  .code-nav-bar .windowControl [dot="DEA123"] {background: #DEA123;}
  .code-nav-bar .windowControl [dot="1AAB29"] {background: #1AAB29;}

  .code-nav-bar .title { 
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
  .code-nav-bar .options { 
    display: flex;
    justify-content: flex-end;
  }
  .ast-codeviewer :is(pre, code, .line-numbers .line-numbers-rows) {
    font-family: ${ff};
    font-size: ${fs};
    outline: none;
    line-height: 1.5;
  }
  /*LINE-NUMBERS*/
  .ast-codeviewer .line-numbers .line-numbers-rows {
    ${(lnSeparator) ? 'border-right: 1px solid currentColor;' : ''}
    ${(lnOpacity) ? `opacity: ${lnOpacity};` : ''}
    color: ${lnColor};
  
  }
  .ast-codeviewer .line-numbers-rows>span {
    counter-increment: linenumber;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  
  /*PRISM.JS STYLE DEFAULT*/
  
  code[class*=language-], pre[class*=language-] {
    background: 0 0;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none
  }
  :not(pre)>code[class*=language-], pre[class*=language-] {
      background: transparent
  }
  :not(pre)>code[class*=language-] {
      padding: .1em;
      border-radius: .3em;
      white-space: normal
  }
  pre[class*="language-"].line-numbers {
      margin: 0;
      counter-reset: linenumber;
      grid-column: 2;
  }

  pre[class*="language-"]:not(.line-numbers) {
    margin: 0;
  }
  pre[class*="language-"].line-numbers>code {
      white-space: inherit;
  }
  .line-numbers .line-numbers-rows {
    margin: 1rem 0 1rem 1rem;
    width: 2em;
    height: max-content;
    pointer-events: none;
    top: 1rem;
    font-size: 100%;
    left: 0.8em;
    /* works for line-numbers below 1000 lines */
    letter-spacing: -1px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .line-numbers-rows>span:before {
    content: counter(linenumber);
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }
  .token:is(.bold, .important) {font-weight: 700}
  .token:is(.italic) {font-style: italic}
  .token:is(.entity) {cursor: help}
  .token:is(.inserted) {color: green}
  
  /*THEME COLOR*/
  ${
    (th == 'copilot') 
    ? `
  /*blur */
  [data-theme="copilot"][data-blur].ast-codeviewer                                   {background: #232a2f73}
  [data-theme="copilot"][data-blur].ast-codeviewer[visible],
  [data-theme="copilot"][data-blur] .token:is(.punctuation)                          {color: #939da5}
  [data-theme="copilot"][data-blur].ast-codeviewer .line-numbers-rows                {background: transparent}
  [data-theme="copilot"][data-blur].ast-codeviewer .code-nav-bar                     {background: #1a202363}

  [data-theme="copilot"].ast-codeviewer, .ast-codeviewer .line-numbers-rows                {background: ${(background) ? background : (blurFilter) ? '#232a2f73' : '#232A2F'}}
  [data-theme="copilot"].ast-codeviewer .code-nav-bar                                      {background: ${(wb.constructor.name === 'String') ? wb : '#1a202363'}}
  [data-theme="copilot"].ast-codeviewer :is(.astcw-container, .astch-y)::-webkit-scrollbar-thumb  {background: #444267}
  [data-theme="copilot"].ast-codeviewer :is(pre, code, span) ::selection                   {background: #204062}
  [data-theme="copilot"].ast-codeviewer[visible]                                           {color: ${(color) ? color : '#939da5'}}
  
  [data-theme="copilot"] .token:is(.block-comment, .cdata, .comment, .doctype, .prolog)    {color: #707a84}
  [data-theme="copilot"] .token:is(.punctuation)                                           {color: ${(color) ? color : '#939da5'}}
  [data-theme="copilot"] .token:is(.attr-name)                                             {color: #ffa763}
  [data-theme="copilot"] .token:is(.deleted, .namespace, .tag)                             {color: #ff6a80}
  [data-theme="copilot"] .token:is(.function-name)                                         {color: #82aaff}
  [data-theme="copilot"] .token:is(.boolean, .function, .number)                           {color: #e8d358}
  [data-theme="copilot"] .token:is(.class-name, .constant, .property, .symbol)             {color: #f8c555}
  [data-theme="copilot"] .token:is(.literal-property.property)                             {color: #ffa763}
  [data-theme="copilot"] .token:is(.atrule, .builtin, .important, .keyword, .selector)     {color: #ba8ef7}
  [data-theme="copilot"] .token:is(.selector)                                              {color: #ffa763}
  [data-theme="copilot"] .token:is(.attr-value, .char, .regex, .string, .variable)         {color: #54cc84}
  [data-theme="copilot"] .token:is(.entity, .operator, .url)                               {color: #67cdcc}
    `:''}`, 'codeviewer')
    }
    codeviewcss({lineNumber, fontSize, fontFamily, windowBar, theme})

    function codeviewHTML(params) {
      var lang = params.lang, title = (params.title) ? params.title : '';
      return`
      <div class="astcw-window">
      ${(windowBar) ? `
        <div class="code-nav-bar">
          <div class="windowControl">
            <span dot="E0443E"></span>        
            <span dot="DEA123"></span>
            <span dot="1AAB29"></span>
          </div>
          <div class="title">${title}</div>
          <div class="options">
          
          </div>
        </div>
      ` : ''}
        <div class="astch-y">
          <div class="astcw-container">
            ${(lang == 'html' || lang == 'markup') 
              ? `<script type="text/plain" class="language-${lang} ${(lineNumber) ? 'line-numbers' : ''}" ></script>`
              : `<pre><code class="language-${lang} ${(lineNumber) ? 'line-numbers' : ''}"></code></pre>`
            }
          </div>
        </div>
      </div>
      `
    }
    function setCodeViewText(selector, lang, codeViewText) {
      if(lang == 'html'){
        selector.querySelector('script[type="text/plain"]').textContent = codeViewText
      } else {
        selector.querySelector('pre code').textContent = codeViewText
      }
      return selector
    }
    function regex(text) {
      var substr = [
        [/&amp;/g, '&'],
        [/&lt;/g, '<'],
        [/&gt;/g, '>']
      ];
      Object.keys(substr).forEach(function(key) {
        text =  text.replace(substr[key][0], substr[key][1])
      });
      return text
    }
    function setCodeViewTheme(theme, codeview) {
      if(!codeview.dataset.theme){
        codeview.setAttribute('data-theme', theme)
      }

    }
    function codeViewEach(e) {
      Array.prototype.forEach.call(document.querySelectorAll('.ast-codeviewer'), codeview => {
        e(codeview)
      })
    }
    function init() {
    
      codeViewEach((e) => {
        var codeview = e, codeViewText = regex(codeview.innerHTML);
        var lang = codeview.dataset.lang, 
            title = codeview.dataset.title;

        if(codeview.tagName == 'SCRIPT' && codeview.type == 'text/plain'){
          var attributes = codeview.attributes,
              newCodeView = document.createElement('div');

          Array.prototype.forEach.call(attributes, attr  => {
            if(attr.name != 'type'){
              newCodeView.setAttribute(attr.name, attr.value)
            }
          })

          newCodeView.innerHTML = codeviewHTML({lang, title})
          codeview.insertAdjacentHTML('afterend', setCodeViewText(newCodeView, lang, codeViewText).outerHTML)
          codeview.remove()
        } else {
          codeview.innerHTML = codeviewHTML({lang, title})
          setCodeViewText(codeview, lang, codeViewText)
        }
  
      })
      codeViewEach((e) => {
       /*  if(blurFilter) {e.setAttribute('data-blur', `${blurFilter}`)} */
        var width = e.dataset.width,
            height = e.dataset.height,
            blur = (e.dataset.blur != '') ? e.dataset.blur : false,
            lang = e.dataset.lang, 
            hyperlink = (e.dataset.hyperlink == 'false') ? false : (e.dataset.hyperlink == 'true') ? true : undefined,
            run = (e.dataset.run) ? e.dataset.run : false,
            isCopy = (e.dataset.copy === 'false') ? false : true;


        if(width){e.style.width=width} 
        if(height){e.style.height=height}
        if(blur) {e.style.backdropFilter=`blur(${blur})`}
        e.setAttribute('visible','')
        setCodeViewTheme(theme, e)

        //------options---------//
          var optionsHTML = `
          <div class="astvw-options">
            ${(run && lang == 'js') ? `
              <div class="op run" title="Run Code">
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="#54cc84" class="bi bi-play-fill" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                  </svg>
                </a>
              </div>
            ` : ''}
            ${(!opCopy && isCopy || opCopy && isCopy) ? `
              <div class="op copy" title="Copy Code">
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                  </svg>
                </a>
              </div>
            ` : ''}
            ${(opHyperlink && hyperlink == undefined && e.id != '' || hyperlink && e.id != '') ? `
              <div class="op hyperlink" title="Copy Hash">
                <a href="${'#'+e.id}" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                  </svg>
                </a>
              </div>
            ` : ''}
          </div>
          `

          if(opPosition && windowBar){
            e.querySelector('.code-nav-bar .options').insertAdjacentHTML('beforeend', optionsHTML)
          } else {
            e.insertAdjacentHTML('beforeend', optionsHTML)
          }

          if(opHyperlink && hyperlink == undefined || hyperlink){
            if(e.id == '') {
              console.warn(`😊 ${astronaut.$shortName}.codeview({hyperLink:})! Warning ! You enabled hyperlinking but did not provide an id attribute, enter an id="" in <div class="ast-codeviewer"> </div>. ')}`)
            } else {
              e.querySelector('.astvw-options .hyperlink a').addEventListener('click', a => {
                a.preventDefault()
                var href = e.querySelector('.astvw-options .hyperlink a').href
                astronaut.copy(href, e.querySelector('.astcw-window'))
              })
            }

          }
          if(!opCopy && isCopy || opCopy && isCopy){
            var btnCopy = e.querySelector('.astvw-options .copy');
            btnCopy.addEventListener('click', a => {
              a.preventDefault()
              var codeText = btnCopy.closest('.ast-codeviewer').querySelector('pre code').textContent
              astronaut.copy(codeText, e.querySelector('.astcw-window'))
            
            })
          }
          if(run && lang == 'js'){
            var btnRun = e.querySelector('.astvw-options .run'), 
                scriptID = astronaut.create.id();

            btnRun.addEventListener('click', a => {
              a.preventDefault()
              var codeText = btnRun.closest('.ast-codeviewer').querySelector('pre code').textContent,
                  newDiv = document.createElement('div'), 
                  newScript = document.createElement('script');

                  newScript.id = scriptID
                  newDiv.id ="scripts_run_codeviewer"
                  newScript.textContent = codeText

                  if(document.querySelector('#scripts_run_codeviewer')){
                    var scriptag = scripts_run_codeviewer.querySelector(`script#${scriptID}`)
                    if(!scriptag || scriptag.textContent != codeText){
                      if(scriptag) scriptag.remove()
                      scripts_run_codeviewer.appendChild(newScript)
                    }
                  } else {
                    document.body.appendChild(newDiv)
                    scripts_run_codeviewer.appendChild(newScript)
                  }
            })
          }
      })

    }
  //==================================START PRISM.JS=========================================//
    const prismjs = () => {
    var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
        Prism = function (u) {
            var c = /\blang(?:uage)?-([\w-]+)\b/i,
            n = 0,
            e = {},
            M = {
                manual: u.Prism && u.Prism.manual, disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler, util: {
                    encode: function e(n) { return n instanceof W ? new W(n.type, e(n.content), n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ") }, type: function (e) { return Object.prototype.toString.call(e).slice(8, -1) }, objId: function (e) { return e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id }, clone: function t(e, r) {
                        var a, n; switch (r = r || {}, M.util.type(e)) {
                            case "Object":
                                if (n = M.util.objId(e), r[n]) return r[n]; for (var i in a = {}, r[n] = a, e) e.hasOwnProperty(i) && (a[i] = t(e[i], r)); return a;
                            case "Array":
                                return n = M.util.objId(e), r[n] ? r[n] : (a = [], r[n] = a, e.forEach(function (e, n) { a[n] = t(e, r) }), a);
                            default:
                                return e
                        }
                    }, getLanguage: function (e) { for (; e && !c.test(e.className);) e = e.parentElement; return e ? (e.className.match(c) || [, "none"])[1].toLowerCase() : "none" }, currentScript: function () {
                        if ("undefined" == typeof document) return null; if ("currentScript" in document) return document.currentScript; try { throw new Error } catch (e) {
                            var n = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack) || [])[1]; if (n) {
                                var t = document.getElementsByTagName("script"); for (var r in t)
                                    if (t[r].src == n) return t[r]
                            } return null
                        }
                    }, isActive: function (e, n, t) {
                        for (var r = "no-" + n; e;) {
                            var a = e.classList; if (a.contains(n)) return !0; if (a.contains(r)) return !1;
                            e = e.parentElement
                        } return !!t
                    }
                }, languages: {
                    plain: e, plaintext: e, text: e, txt: e, extend: function (e, n) { var t = M.util.clone(M.languages[e]); for (var r in n) t[r] = n[r]; return t }, insertBefore: function (t, e, n, r) {
                        var a = (r = r || M.languages)[t],
                        i = {}; for (var l in a)
                            if (a.hasOwnProperty(l)) {
                                if (l == e)
                                    for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                                n.hasOwnProperty(l) || (i[l] = a[l])
                            }
                        var s = r[t]; return r[t] = i, M.languages.DFS(M.languages, function (e, n) { n === s && e != t && (this[e] = i) }), i
                    }, DFS: function e(n, t, r, a) {
                        a = a || {}; var i = M.util.objId; for (var l in n)
                            if (n.hasOwnProperty(l)) {
                                t.call(n, l, n[l], r || l); var o = n[l],
                                    s = M.util.type(o); "Object" !== s || a[i(o)] ? "Array" !== s || a[i(o)] || (a[i(o)] = !0, e(o, t, l, a)) : (a[i(o)] = !0, e(o, t, null, a))
                            }
                    }
                }, plugins: {}, highlightAll: function (e, n) { M.highlightAllUnder(document, e, n) }, highlightAllUnder: function (e, n, t) {
                    var r = { callback: t, container: e, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };
                    M.hooks.run("before-highlightall", r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), M.hooks.run("before-all-elements-highlight", r); for (var a, i = 0; a = r.elements[i++];) M.highlightElement(a, !0 === n, r.callback)
                }, highlightElement: function (e, n, t) {
                    var r = M.util.getLanguage(e),
                    a = M.languages[r];
                    e.className = e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r; var i = e.parentElement;
                    i && "pre" === i.nodeName.toLowerCase() && (i.className = i.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r); var l = { element: e, language: r, grammar: a, code: e.textContent };
    
                    function o(e) { l.highlightedCode = e, M.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, M.hooks.run("after-highlight", l), M.hooks.run("complete", l), t && t.call(l.element) } if (M.hooks.run("before-sanity-check", l), (i = l.element.parentElement) && "pre" === i.nodeName.toLowerCase() && !i.hasAttribute("tabindex") && i.setAttribute("tabindex", "0"), !l.code) return M.hooks.run("complete", l), void (t && t.call(l.element)); if (M.hooks.run("before-highlight", l), l.grammar)
                        if (n && u.Worker) {
                            var s = new Worker(M.filename);
                            s.onmessage = function (e) { o(e.data) }, s.postMessage(JSON.stringify({ language: l.language, code: l.code, immediateClose: !0 }))
                        } else o(M.highlight(l.code, l.grammar, l.language));
                    else o(M.util.encode(l.code))
                }, highlight: function (e, n, t) { var r = { code: e, grammar: n, language: t }; return M.hooks.run("before-tokenize", r), r.tokens = M.tokenize(r.code, r.grammar), M.hooks.run("after-tokenize", r), W.stringify(M.util.encode(r.tokens), r.language) }, tokenize: function (e, n) {
                    var t = n.rest; if (t) {
                        for (var r in t) n[r] = t[r];
                        delete n.rest
                    } var a = new i; return I(a, a.head, e),
                        function e(n, t, r, a, i, l) {
                            for (var o in r)
                                if (r.hasOwnProperty(o) && r[o]) {
                                    var s = r[o];
                                    s = Array.isArray(s) ? s : [s]; for (var u = 0; u < s.length; ++u) {
                                        if (l && l.cause == o + "," + u) return; var c = s[u],
                                            g = c.inside,
                                            f = !!c.lookbehind,
                                            h = !!c.greedy,
                                            d = c.alias; if (h && !c.pattern.global) {
                                                var p = c.pattern.toString().match(/[imsuy]*$/)[0];
                                                c.pattern = RegExp(c.pattern.source, p + "g")
                                            } for (var v = c.pattern || c, m = a.next, y = i; m !== t.tail && !(l && y >= l.reach); y += m.value.length, m = m.next) {
                                                var b = m.value; if (t.length > n.length) return; if (!(b instanceof W)) {
                                                    var k, x = 1; if (h) {
                                                        if (!(k = z(v, y, n, f)) || k.index >= n.length) break; var w = k.index,
                                                            A = k.index + k[0].length,
                                                            P = y; for (P += m.value.length; P <= w;) m = m.next, P += m.value.length; if (P -= m.value.length, y = P, m.value instanceof W) continue; for (var E = m; E !== t.tail && (P < A || "string" == typeof E.value); E = E.next) x++, P += E.value.length;
                                                        x--, b = n.slice(y, P), k.index -= y
                                                    } else if (!(k = z(v, 0, b, f))) continue; var w = k.index,
                                                        S = k[0],
                                                        O = b.slice(0, w),
                                                        L = b.slice(w + S.length),
                                                        N = y + b.length;
                                                    l && N > l.reach && (l.reach = N); var j = m.prev;
                                                    O && (j = I(t, j, O), y += O.length), q(t, j, x); var C = new W(o, g ? M.tokenize(S, g) : S, d, S); if (m = I(t, j, C), L && I(t, m, L), 1 < x) {
                                                        var _ = { cause: o + "," + u, reach: N };
                                                        e(n, t, r, m.prev, y, _), l && _.reach > l.reach && (l.reach = _.reach)
                                                    }
                                                }
                                            }
                                    }
                                }
                        }(e, a, n, a.head, 0),
                        function (e) {
                            var n = [],
                            t = e.head.next; for (; t !== e.tail;) n.push(t.value), t = t.next; return n
                        }(a)
                }, hooks: {
                    all: {}, add: function (e, n) {
                        var t = M.hooks.all;
                        t[e] = t[e] || [], t[e].push(n)
                    }, run: function (e, n) {
                        var t = M.hooks.all[e]; if (t && t.length)
                            for (var r, a = 0; r = t[a++];) r(n)
                    }
                }, Token: W
            };
    
            function W(e, n, t, r) { this.type = e, this.content = n, this.alias = t, this.length = 0 | (r || "").length }
    
            function z(e, n, t, r) {
                e.lastIndex = n; var a = e.exec(t); if (a && r && a[1]) {
                    var i = a[1].length;
                    a.index += i, a[0] = a[0].slice(i)
                } return a
            }
    
            function i() {
                var e = { value: null, prev: null, next: null },
                n = { value: null, prev: e, next: null };
                e.next = n, this.head = e, this.tail = n, this.length = 0
            }
    
            function I(e, n, t) {
                var r = n.next,
                a = { value: t, prev: n, next: r }; return n.next = a, r.prev = a, e.length++, a
            }
    
            function q(e, n, t) {
                for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
                (n.next = r).prev = n, e.length -= a
            } if (u.Prism = M, W.stringify = function n(e, t) {
                if ("string" == typeof e) return e; if (Array.isArray(e)) { var r = ""; return e.forEach(function (e) { r += n(e, t) }), r } var a = { type: e.type, content: n(e.content, t), tag: "span", classes: ["token", e.type], attributes: {}, language: t },
                    i = e.alias;
                i && (Array.isArray(i) ? Array.prototype.push.apply(a.classes, i) : a.classes.push(i)), M.hooks.run("wrap", a); var l = ""; for (var o in a.attributes) l += " " + o + '="' + (a.attributes[o] || "").replace(/"/g, "&quot;") + '"'; return "<" + a.tag + ' class="' + a.classes.join(" ") + '"' + l + ">" + a.content + "</" + a.tag + ">"
            }, !u.document) return u.addEventListener && (M.disableWorkerMessageHandler || u.addEventListener("message", function (e) {
                var n = JSON.parse(e.data),
                t = n.language,
                r = n.code,
                a = n.immediateClose;
                u.postMessage(M.highlight(r, M.languages[t], t)), a && u.close()
            }, !1)), M; var t = M.util.currentScript();
    
            function r() { M.manual || M.highlightAll() } if (t && (M.filename = t.src, t.hasAttribute("data-manual") && (M.manual = !0)), !M.manual) { var a = document.readyState; "loading" === a || "interactive" === a && t && t.defer ? document.addEventListener("DOMContentLoaded", r) : window.requestAnimationFrame ? window.requestAnimationFrame(r) : window.setTimeout(r, 16) } return M
        }(_self);
    "undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
    Prism.languages.markup = { comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 }, prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 }, doctype: { pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i, greedy: !0, inside: { "internal-subset": { pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null }, string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 }, punctuation: /^<!|>$|[[\]]/, "doctype-tag": /^DOCTYPE/i, name: /[^\s<>'"]+/ } }, cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 }, tag: { pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/, greedy: !0, inside: { tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } }, "special-attr": [], "attr-value": { pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/, inside: { punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/] } }, punctuation: /\/?>/, "attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } } } }, entity: [{ pattern: /&[\da-z]{1,8};/i, alias: "named-entity" }, /&#x?[\da-f]{1,8};/i] }, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", function (a) { "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&")) }), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
        value: function (a, e) {
            var s = {};
            s["language-" + e] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: !0, inside: Prism.languages[e] }, s.cdata = /^<!\[CDATA\[|\]\]>$/i; var t = { "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } };
            t["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] }; var n = {};
            n[a] = { pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function () { return a }), "i"), lookbehind: !0, greedy: !0, inside: t }, Prism.languages.insertBefore("markup", "cdata", n)
        }
    }), Object.defineProperty(Prism.languages.markup.tag, "addAttribute", { value: function (a, e) { Prism.languages.markup.tag.inside["special-attr"].push({ pattern: RegExp("(^|[\"'\\s])(?:" + a + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"), lookbehind: !0, inside: { "attr-name": /^[^\s=]+/, "attr-value": { pattern: /=[\s\S]+/, inside: { value: { pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/, lookbehind: !0, alias: [e, "language-" + e], inside: Prism.languages[e] }, punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/] } } } }) } }), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml;
    ! function (s) {
        var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        s.languages.css = { comment: /\/\*[\s\S]*?\*\//, atrule: { pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/, inside: { rule: /^@[\w-]+/, "selector-function-argument": { pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/, lookbehind: !0, alias: "selector" }, keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0 } } }, url: { pattern: RegExp("\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"), greedy: !0, inside: { function: /^url/i, punctuation: /^\(|\)$/, string: { pattern: RegExp("^" + e.source + "$"), alias: "url" } } }, selector: { pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + e.source + ")*(?=\\s*\\{)"), lookbehind: !0 }, string: { pattern: e, greedy: !0 }, property: { pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i, lookbehind: !0 }, important: /!important\b/i, function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 }, punctuation: /[(){};:,]/ }, s.languages.css.atrule.inside.rest = s.languages.css; var t = s.languages.markup;
        t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"))
    }(Prism);
    Prism.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }], string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 }, "class-name": { pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i, lookbehind: !0, inside: { punctuation: /[.\\]/ } }, keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/, boolean: /\b(?:false|true)\b/, function: /\b\w+(?=\()/, number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i, operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/, punctuation: /[{}[\];(),.:]/ };
    Prism.languages.javascript = Prism.languages.extend("clike", { "class-name": [Prism.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/, lookbehind: !0 }], keyword: [{ pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 }, { pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: !0 }], function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/, operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/ }), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", { regex: { pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/, lookbehind: !0, greedy: !0, inside: { "regex-source": { pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/, lookbehind: !0, alias: "language-regex", inside: Prism.languages.regex }, "regex-delimiter": /^\/|\/$/, "regex-flags": /^[a-z]+$/ } }, "function-variable": { pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/, alias: "function" }, parameter: [{ pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/, lookbehind: !0, inside: Prism.languages.javascript }, { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i, lookbehind: !0, inside: Prism.languages.javascript }, { pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/, lookbehind: !0, inside: Prism.languages.javascript }, { pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/, lookbehind: !0, inside: Prism.languages.javascript }], constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/ }), Prism.languages.insertBefore("javascript", "string", { hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" }, "template-string": { pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/, greedy: !0, inside: { "template-punctuation": { pattern: /^`|`$/, alias: "string" }, interpolation: { pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/, lookbehind: !0, inside: { "interpolation-punctuation": { pattern: /^\$\{|\}$/, alias: "punctuation" }, rest: Prism.languages.javascript } }, string: /[\s\S]+/ } }, "string-property": { pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m, lookbehind: !0, greedy: !0, alias: "property" } }), Prism.languages.insertBefore("javascript", "operator", { "literal-property": { pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m, lookbehind: !0, alias: "property" } }), Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")), Prism.languages.js = Prism.languages.javascript;
    ! function (h) {
        function v(e, n) { return "___" + e.toUpperCase() + n + "___" }
        Object.defineProperties(h.languages["markup-templating"] = {}, {
            buildPlaceholders: {
                value: function (a, r, e, o) {
                    if (a.language === r) {
                        var c = a.tokenStack = [];
                        a.code = a.code.replace(e, function (e) { if ("function" == typeof o && !o(e)) return e; for (var n, t = c.length; - 1 !== a.code.indexOf(n = v(r, t));) ++t; return c[t] = e, n }), a.grammar = h.languages.markup
                    }
                }
            }, tokenizePlaceholders: {
                value: function (p, k) {
                    if (p.language === k && p.tokenStack) {
                        p.grammar = h.languages[k]; var m = 0,
                            d = Object.keys(p.tokenStack); ! function e(n) {
                                for (var t = 0; t < n.length && !(m >= d.length); t++) {
                                    var a = n[t]; if ("string" == typeof a || a.content && "string" == typeof a.content) {
                                        var r = d[m],
                                        o = p.tokenStack[r],
                                        c = "string" == typeof a ? a : a.content,
                                        i = v(k, r),
                                        u = c.indexOf(i); if (-1 < u) {
                                            ++m; var g = c.substring(0, u),
                                                l = new h.Token(k, h.tokenize(o, p.grammar), "language-" + k, o),
                                                s = c.substring(u + i.length),
                                                f = [];
                                            g && f.push.apply(f, e([g])), f.push(l), s && f.push.apply(f, e([s])), "string" == typeof a ? n.splice.apply(n, [t, 1].concat(f)) : a.content = f
                                        }
                                    } else a.content && e(a.content)
                                } return n
                            }(p.tokens)
                    }
                }
            }
        })
    }(Prism);
    ! function (a) {
        var e = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,
        t = [{ pattern: /\b(?:false|true)\b/i, alias: "boolean" }, { pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i, greedy: !0, lookbehind: !0 }, { pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i, greedy: !0, lookbehind: !0 }, /\b(?:null)\b/i, /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/],
        i = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        n = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,
        s = /[{}\[\](),:;]/;
        a.languages.php = { delimiter: { pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i, alias: "important" }, comment: e, variable: /\$+(?:\w+\b|(?=\{))/i, package: { pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i, lookbehind: !0, inside: { punctuation: /\\/ } }, "class-name-definition": { pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i, lookbehind: !0, alias: "class-name" }, "function-definition": { pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i, lookbehind: !0, alias: "function" }, keyword: [{ pattern: /(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/i, alias: "type-casting", greedy: !0, lookbehind: !0 }, { pattern: /([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/i, alias: "type-hint", greedy: !0, lookbehind: !0 }, { pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string|void)\b/i, alias: "return-type", greedy: !0, lookbehind: !0 }, { pattern: /\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/i, alias: "type-declaration", greedy: !0 }, { pattern: /(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/i, alias: "type-declaration", greedy: !0, lookbehind: !0 }, { pattern: /\b(?:parent|self|static)(?=\s*::)/i, alias: "static-context", greedy: !0 }, { pattern: /(\byield\s+)from\b/i, lookbehind: !0 }, /\bclass\b/i, { pattern: /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|new|or|parent|print|private|protected|public|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield|__halt_compiler)\b/i, lookbehind: !0 }], "argument-name": { pattern: /([(,]\s+)\b[a-z_]\w*(?=\s*:(?!:))/i, lookbehind: !0 }, "class-name": [{ pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i, greedy: !0, lookbehind: !0 }, { pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i, greedy: !0, lookbehind: !0 }, { pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i, greedy: !0 }, { pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i, alias: "class-name-fully-qualified", greedy: !0, lookbehind: !0, inside: { punctuation: /\\/ } }, { pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i, alias: "class-name-fully-qualified", greedy: !0, inside: { punctuation: /\\/ } }, { pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i, alias: "class-name-fully-qualified", greedy: !0, lookbehind: !0, inside: { punctuation: /\\/ } }, { pattern: /\b[a-z_]\w*(?=\s*\$)/i, alias: "type-declaration", greedy: !0 }, { pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i, alias: ["class-name-fully-qualified", "type-declaration"], greedy: !0, inside: { punctuation: /\\/ } }, { pattern: /\b[a-z_]\w*(?=\s*::)/i, alias: "static-context", greedy: !0 }, { pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i, alias: ["class-name-fully-qualified", "static-context"], greedy: !0, inside: { punctuation: /\\/ } }, { pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i, alias: "type-hint", greedy: !0, lookbehind: !0 }, { pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i, alias: ["class-name-fully-qualified", "type-hint"], greedy: !0, lookbehind: !0, inside: { punctuation: /\\/ } }, { pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i, alias: "return-type", greedy: !0, lookbehind: !0 }, { pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i, alias: ["class-name-fully-qualified", "return-type"], greedy: !0, lookbehind: !0, inside: { punctuation: /\\/ } }], constant: t, function: { pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i, lookbehind: !0, inside: { punctuation: /\\/ } }, property: { pattern: /(->\s*)\w+/, lookbehind: !0 }, number: i, operator: n, punctuation: s }; var l = { pattern: /\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/, lookbehind: !0, inside: a.languages.php },
            r = [{ pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/, alias: "nowdoc-string", greedy: !0, inside: { delimiter: { pattern: /^<<<'[^']+'|[a-z_]\w*;$/i, alias: "symbol", inside: { punctuation: /^<<<'?|[';]$/ } } } }, { pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i, alias: "heredoc-string", greedy: !0, inside: { delimiter: { pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i, alias: "symbol", inside: { punctuation: /^<<<"?|[";]$/ } }, interpolation: l } }, { pattern: /`(?:\\[\s\S]|[^\\`])*`/, alias: "backtick-quoted-string", greedy: !0 }, { pattern: /'(?:\\[\s\S]|[^\\'])*'/, alias: "single-quoted-string", greedy: !0 }, { pattern: /"(?:\\[\s\S]|[^\\"])*"/, alias: "double-quoted-string", greedy: !0, inside: { interpolation: l } }];
        a.languages.insertBefore("php", "variable", { string: r, attribute: { pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im, greedy: !0, inside: { "attribute-content": { pattern: /^(#\[)[\s\S]+(?=\]$)/, lookbehind: !0, inside: { comment: e, string: r, "attribute-class-name": [{ pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i, alias: "class-name", greedy: !0, lookbehind: !0 }, { pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i, alias: ["class-name", "class-name-fully-qualified"], greedy: !0, lookbehind: !0, inside: { punctuation: /\\/ } }], constant: t, number: i, operator: n, punctuation: s } }, delimiter: { pattern: /^#\[|\]$/, alias: "punctuation" } } } }), a.hooks.add("before-tokenize", function (e) { if (/<\?/.test(e.code)) { a.languages["markup-templating"].buildPlaceholders(e, "php", /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/gi) } }), a.hooks.add("after-tokenize", function (e) { a.languages["markup-templating"].tokenizePlaceholders(e, "php") })
    }(Prism);
    ! function (a) {
        var e = { pattern: /\\[\\(){}[\]^$+*?|.]/, alias: "escape" },
        n = /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/,
        t = "(?:[^\\\\-]|" + n.source + ")",
        s = RegExp(t + "-" + t),
        i = { pattern: /(<|')[^<>']+(?=[>']$)/, lookbehind: !0, alias: "variable" };
        a.languages.regex = { "char-class": { pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/, lookbehind: !0, inside: { "char-class-negation": { pattern: /(^\[)\^/, lookbehind: !0, alias: "operator" }, "char-class-punctuation": { pattern: /^\[|\]$/, alias: "punctuation" }, range: { pattern: s, inside: { escape: n, "range-punctuation": { pattern: /-/, alias: "operator" } } }, "special-escape": e, "char-set": { pattern: /\\[wsd]|\\p\{[^{}]+\}/i, alias: "class-name" }, escape: n } }, "special-escape": e, "char-set": { pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i, alias: "class-name" }, backreference: [{ pattern: /\\(?![123][0-7]{2})[1-9]/, alias: "keyword" }, { pattern: /\\k<[^<>']+>/, alias: "keyword", inside: { "group-name": i } }], anchor: { pattern: /[$^]|\\[ABbGZz]/, alias: "function" }, escape: n, group: [{ pattern: /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/, alias: "punctuation", inside: { "group-name": i } }, { pattern: /\)/, alias: "punctuation" }], quantifier: { pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/, alias: "number" }, alternation: { pattern: /\|/, alias: "keyword" } }
    }(Prism);
    ! function () {
        if ("undefined" != typeof Prism && "undefined" != typeof document) {
            var o = "line-numbers",
            a = /\n(?!$)/g,
            e = Prism.plugins.lineNumbers = {
                getLine: function (e, n) {
                    if ("PRE" === e.tagName && e.classList.contains(o)) {
                        var t = e.querySelector(".line-numbers-rows"); if (t) {
                            var i = parseInt(e.getAttribute("data-start"), 10) || 1,
                            r = i + (t.children.length - 1);
                            n < i && (n = i), r < n && (n = r); var s = n - i; return t.children[s]
                        }
                    }
                }, resize: function (e) { u([e]) }, assumeViewportIndependence: !0
            },
            n = void 0;
            window.addEventListener("resize", function () { e.assumeViewportIndependence && n === window.innerWidth || (n = window.innerWidth, u(Array.prototype.slice.call(document.querySelectorAll("pre." + o)))) }), Prism.hooks.add("complete", function (e) {
                if (e.code) {
                    var n = e.element,
                    t = n.parentNode; if (t && /pre/i.test(t.nodeName) && !n.querySelector(".line-numbers-rows") && Prism.util.isActive(n, o)) {
                        n.classList.remove(o), t.classList.add(o); var i, r = e.code.match(a),
                            s = r ? r.length + 1 : 1,
                            l = new Array(s + 1).join("<span></span>");
                        (i = document.createElement("span")).setAttribute("aria-hidden", "true"), i.className = "line-numbers-rows", i.innerHTML = l, t.hasAttribute("data-start") && (t.style.counterReset = "linenumber " + (parseInt(t.getAttribute("data-start"), 10) - 1)), 
                        
                        e.element.parentElement.parentElement.parentElement.insertAdjacentHTML('afterbegin',i.outerHTML),
                        u([t]), Prism.hooks.run("line-numbers", e)
                        e.element.parentElement.parentElement.parentElement.classList.add('line-numbers')
                        //insertLineNumber
                    }
                }
            }), Prism.hooks.add("line-numbers", function (e) { e.plugins = e.plugins || {}, e.plugins.lineNumbers = !0 })
        }
    
        function u(e) {
            if (0 != (e = e.filter(function (e) { var n = function (e) { return e ? window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null : null }(e)["white-space"]; return "pre-wrap" === n || "pre-line" === n })).length) {
                var n = e.map(function (e) {
                    var n = e.querySelector("code"),
                    t = e.querySelector(".line-numbers-rows"); if (n && t) {
                        var i = e.querySelector(".line-numbers-sizer"),
                        r = n.textContent.split(a);
                        i || ((i = document.createElement("span")).className = "line-numbers-sizer", n.appendChild(i)), i.innerHTML = "0", i.style.display = "block"; var s = i.getBoundingClientRect().height; return i.innerHTML = "", { element: e, lines: r, lineHeights: [], oneLinerHeight: s, sizer: i }
                    }
                }).filter(Boolean);
                n.forEach(function (e) {
                    var i = e.sizer,
                    n = e.lines,
                    r = e.lineHeights,
                    s = e.oneLinerHeight;
                    r[n.length - 1] = void 0, n.forEach(function (e, n) {
                        if (e && 1 < e.length) {
                            var t = i.appendChild(document.createElement("span"));
                            t.style.display = "block", t.textContent = e
                        } else r[n] = s
                    })
                }), n.forEach(function (e) { for (var n = e.sizer, t = e.lineHeights, i = 0, r = 0; r < t.length; r++) void 0 === t[r] && (t[r] = n.children[i++].getBoundingClientRect().height) }), n.forEach(function (e) {
                    var n = e.sizer,
                    t = e.element.querySelector(".line-numbers-rows");
                    n.style.display = "none", n.innerHTML = "", e.lineHeights.forEach(function (e, n) { t.children[n].style.height = e + "px" })
                })
            }
        }
    }();
    "undefined" != typeof Prism && "undefined" != typeof document && (Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Prism.plugins.UnescapedMarkup = !0, Prism.hooks.add("before-highlightall", function (e) { e.selector += ', [class*="lang-"] script[type="text/plain"], [class*="language-"] script[type="text/plain"], script[type="text/plain"][class*="lang-"], script[type="text/plain"][class*="language-"]' }), Prism.hooks.add("before-sanity-check", function (e) {
        var t = e.element; if (t.matches('script[type="text/plain"]')) {
            var a = document.createElement("code"),
            c = document.createElement("pre");
            c.className = a.className = t.className; var n = t.dataset; return Object.keys(n || {}).forEach(function (e) { Object.prototype.hasOwnProperty.call(n, e) && (c.dataset[e] = n[e]) }), a.textContent = e.code = e.code.replace(/&lt;\/script(?:>|&gt;)/gi, "<\/script>"), c.appendChild(a), t.parentNode.replaceChild(c, t), void (e.element = a)
        } if (!e.code) {
            var o = t.childNodes;
            1 === o.length && "#comment" == o[0].nodeName && (t.textContent = e.code = o[0].textContent)
        }
    }));
    ! function () {
        if ("undefined" != typeof Prism) {
            var i = Object.assign || function (e, n) { for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]); return e };
            e.prototype = {
                setDefaults: function (e) { this.defaults = i(this.defaults, e) }, normalize: function (e, n) { for (var t in n = i(this.defaults, n)) { var r = t.replace(/-(\w)/g, function (e, n) { return n.toUpperCase() }); "normalize" !== t && "setDefaults" !== r && n[t] && this[r] && (e = this[r].call(this, e, n[t])) } return e }, leftTrim: function (e) { return e.replace(/^\s+/, "") }, rightTrim: function (e) { return e.replace(/\s+$/, "") }, tabsToSpaces: function (e, n) { return n = 0 | n || 4, e.replace(/\t/g, new Array(++n).join(" ")) }, spacesToTabs: function (e, n) { return n = 0 | n || 4, e.replace(RegExp(" {" + n + "}", "g"), "\t") }, removeTrailing: function (e) { return e.replace(/\s*?$/gm, "") }, removeInitialLineFeed: function (e) { return e.replace(/^(?:\r?\n|\r)/, "") }, removeIndent: function (e) { var n = e.match(/^[^\S\n\r]*(?=\S)/gm); return n && n[0].length ? (n.sort(function (e, n) { return e.length - n.length }), n[0].length ? e.replace(RegExp("^" + n[0], "gm"), "") : e) : e }, indent: function (e, n) { return e.replace(/^[^\S\n\r]*(?=\S)/gm, new Array(++n).join("\t") + "$&") }, breakLines: function (e, n) {
                    n = !0 === n ? 80 : 0 | n || 80; for (var t = e.split("\n"), r = 0; r < t.length; ++r)
                        if (!(s(t[r]) <= n)) {
                            for (var i = t[r].split(/(\s+)/g), o = 0, a = 0; a < i.length; ++a) {
                                var l = s(i[a]);
                                n < (o += l) && (i[a] = "\n" + i[a], o = l)
                            }
                            t[r] = i.join("")
                        }
                    return t.join("\n")
                }
            }, "undefined" != typeof module && module.exports && (module.exports = e), Prism.plugins.NormalizeWhitespace = new e({ "remove-trailing": !0, "remove-indent": !0, "left-trim": !0, "right-trim": !0 }), Prism.hooks.add("before-sanity-check", function (e) {
                var n = Prism.plugins.NormalizeWhitespace; if ((!e.settings || !1 !== e.settings["whitespace-normalization"]) && Prism.util.isActive(e.element, "whitespace-normalization", !0))
                    if (e.element && e.element.parentNode || !e.code) {
                        var t = e.element.parentNode; if (e.code && t && "pre" === t.nodeName.toLowerCase()) {
                            for (var r = t.childNodes, i = "", o = "", a = !1, l = 0; l < r.length; ++l) {
                                var s = r[l];
                                s == e.element ? a = !0 : "#text" === s.nodeName && (a ? o += s.nodeValue : i += s.nodeValue, t.removeChild(s), --l)
                            } if (e.element.children.length && Prism.plugins.KeepMarkup) {
                                var c = i + e.element.innerHTML + o;
                                e.element.innerHTML = n.normalize(c, e.settings), e.code = e.element.textContent
                            } else e.code = i + e.code + o, e.code = n.normalize(e.code, e.settings)
                        }
                    } else e.code = n.normalize(e.code, e.settings)
            })
        }
    
    function e(e) { this.defaults = i({}, e) }
    
    function s(e) { for (var n = 0, t = 0; t < e.length; ++t) e.charCodeAt(t) == "\t".charCodeAt(0) && (n += 3); return e.length + n }
    }();
    }
  
  //==================================FINAL PRISM.JS=========================================//
    codeViewEach((e) => {
      if(e.getAttribute('visible') == ''){
        e.textContent = e.querySelector('.astcw-container pre code').textContent
      }
    })

    init(), prismjs()
  }
}
var howtouse = 'call the function this way: astronaut.codeviewer({})'
try{$astronautType
try{original=astronaut
astronaut='anything';astronaut=original;}catch(err){console.log(`%cIt looks like you already have the full astronaut library in your project, to avoid mistakes, if you are not using the full library and you only want to use a specific library, remove the full library! 🤔 `,` color: #71b9ec;background-color: #053c63;padding: 0.3rem 1.8rem 0.3rem 0.3rem;
font-size:0.8rem;border-radius:0.2rem;border: solid 1px #1667a0;
    `);__codeviewer=howtouse}}catch(error){if(typeof astronaut==='undefined'){window.astronaut=__codeviewer;window.ast=__codeviewer;window.astlibjs=__codeviewer
__codeviewer=howtouse}else{astronaut=Object.assign(astronaut,__codeviewer);__codeviewer=howtouse}}
