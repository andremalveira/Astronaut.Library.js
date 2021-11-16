//---------------------------------------------------//
//           Astronaut Library.js - Codeview         //
//                                                   //
// Author: André Malveira.                           //
// Github: https://github.com/andremalveira          //
// Site:   https://astlibjs.ga/                      //
//---------------------------------------------------//

/*/CodeView Settings
  lineNumber : true || { 
    color: string type color,
    separator: boolean,
    opacity: number
  }
  fontSize: string,
  fontFamily: string,
  theme: string,
  background: string,
  blur: string,
  windowBar: boolean || 'transparent',
  width: string,
  height: string,
  boxShadow: string,
  borderRadius: string,
  options: {
    hyperlink: boolean,
    copy: boolean,
    position: string,
    color: string,
    background: string,
  },
  
*/

let codeview = {
  name: 'astronaut',
  insert: {
    css(css, id, currentScript) {
      if(css && id){
        var newStyle = document.createElement('style')
        id = astronaut.name+'-'+id+'-css',
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
        console.error(`💔 ${astronaut.name}.insert.css()! Error when inserting css because you did not inform the ${((id == undefined || id == '') ? `second parameter was not defined id! Ex: ${astronaut.name}.insert.css('css', 'id')` : (css == undefined || css == '') ? `the first parameter was not defined or the first parameter is empty css! Ex: ${astronaut.name}.insert.css('css', 'id')` : '')}`)
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
  box-shadow: 0px 0px 0px 0.03rem #00000030;
  animation: show_ast_warning 0.3s ease forwards;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 0;
  z-index: 1;
}
@keyframes show_ast_warning {
  0% {opacity: 0;transform: translate(-50%, 100%);}
  100% {opacity: 1;transform: translate(-50%, -50%);}
}
@keyframes hide_ast_warning {
  0% {opacity: 1;transform: translate(-50%, -50%);}
  100% {opacity: 0;transform: translate(-50%, 100%);}
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
  codeview(params) {
    var e = params,
        lineNumber   = (e && e.lineNumber)         ? e.lineNumber      : false,
        fontSize     = (e && e.fontSize)           ? e.fontSize        : '0.9rem',
        fontFamily   = (e && e.fontFamily)         ? e.fontFamily      : 'Fira Code, "system-ui"',
        theme        = (e && e.theme)              ? e.theme           : 'copilot',
        background   = (e && e.background)         ? e.background      : false,
        blur         = (e && e.blur)               ? e.blur            : false,
        width        = (e && e.width)              ? e.width           : '100%',
        height       = (e && e.height)             ? e.height          : 'auto',
        options      = (e && e.options)            ? e.options         : false,
        boxShadow    = (e && e.boxShadow)          ? e.boxShadow       : false,
        borderRadius = (e && e.borderRadius)       ? e.borderRadius    : '0.6rem',

        opHyperlink = (options && options.hyperlink)    ? options.hyperlink    : false,
        opCopy      = (options && options.copy)         ? options.copy         : false,
        opPosition  = (options && options.position)     ? options.position     : 'window',
        opColor     = (options && options.color)        ? options.color        : '#939da5',
        opBg        = (options && options.background )  ? options.background   : '#232a2f',

        windowBar   = (e && e.windowBar == false || e.windowBar != undefined) 
        ? e.windowBar : true;
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
  /*Astronaut Library.js - CodeView*/
  .ast-codeview {
    width: ${width};
    height: ${height};
    border-radius: ${borderRadius};
    color: transparent; 
    margin: 0.5rem 0;
    position: relative;
    display: flex;
    ${(boxShadow) ? `box-shadow: ${boxShadow};` : ''}
    ${(blur) ? `backdrop-filter: blur(${blur});` : ''}
  }
  .ast-codeview[data-blur] {
    backdrop-filter: blur(2rem);
  }
  .ast-codeview .astcw-window {
    width: 100%;
    display: grid;
    grid-template-rows: ${(wb) ? 'auto' : ''} 1fr;
    overflow: hidden;
    border-radius: ${borderRadius};
    position: relative;
  }
  script[type="text/plain"].ast-codeview,
  .ast-codeview i, .ast-codeview a {
    display: flex;
  }
  .ast-codeview :is(.astcw-container)::-webkit-scrollbar {
    width: 8px;
    height: 0px;
    border-radius: ${borderRadius};
    background: transparent;

  }
  .ast-codeview :is(.astcw-container)::-webkit-scrollbar-thumb {
    height: 5px;
    border-radius: ${borderRadius};
    margin: 1rem;
  }
  .ast-codeview :is(.astcw-container)::-webkit-scrollbar-track {
    border-radius: ${borderRadius};
  }
  .ast-codeview :is(.astcw-container)::-webkit-scrollbar-corner {
    background: transparent;
  }
  .ast-codeview .astcw-container {
    position: relative;
    padding: 1rem;
    overflow: auto;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-auto-flow: dense;
  }

  .ast-codeview :is(.astvw-options) {
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
  .ast-codeview :is(.op) {
    ${(opPosition && opPosition == 'window' ) 
    ? 'width: 20px;height:20px;border-radius: 0.3rem;padding: 0.1rem;' 
    : 'border-radius: 50%;width: 30px;height:30px;'}
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .ast-codeview :is(.op):hover {
    background: ${opBg};
  }
  .ast-codeview:hover .astvw-options {
    opacity: 1;
  }
  .ast-codeview :is(.op) a {
    color: ${opColor};
    ${(opPosition && opPosition == 'window' ) ? '' : 'padding: 0.3rem;'}
  }
  .ast-codeview .op.hyperlink a svg, {
    margin-top: 1px;
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
  .ast-codeview :is(pre, code, .line-numbers .line-numbers-rows) {
    font-family: ${ff};
    font-size: ${fs};
    outline: none;
    line-height: 1.5;
  }
  /*LINE-NUMBERS*/
  .ast-codeview .line-numbers .line-numbers-rows {
    ${(lnSeparator) ? 'border-right: 1px solid currentColor;' : ''}
    ${(lnOpacity) ? `opacity: ${lnOpacity};` : ''}
    color: ${lnColor};
  
  }
  .ast-codeview .line-numbers-rows>span {
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
      margin: 0 0 2rem 2.4em;
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
    position: absolute;
    pointer-events: none;
    top: 1rem;
    font-size: 100%;
    left: 0.8em;
    width: 2em;
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
  [data-theme="copilot"][data-blur].ast-codeview, .ast-codeview .line-numbers-rows {background: #232a2f73}
  [data-theme="copilot"][data-blur].ast-codeview .code-nav-bar                     {background: #1a202363}

  [data-theme="copilot"].ast-codeview, .ast-codeview .line-numbers-rows               {background: ${(background) ? background : (blur) ? '#232a2f73' : '#232A2F'}}
  [data-theme="copilot"].ast-codeview .code-nav-bar                                   {background: ${(wb.constructor.name === 'String') ? wb : '#1a202363'}}
  [data-theme="copilot"].ast-codeview :is(.astcw-container)::-webkit-scrollbar-thumb  {background: #444267}
  [data-theme="copilot"].ast-codeview :is(pre, code, span) ::selection                {background: #204062}
  [data-theme="copilot"].ast-codeview[visible]                                             {color: #939da5}
  
  [data-theme="copilot"] .token:is(.block-comment, .cdata, .comment, .doctype, .prolog)    {color: #707a84}
  [data-theme="copilot"] .token:is(.punctuation)                                           {color: #939da5}
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
    `:''}`, 'codeview')
  
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
        
        <div class="astcw-container">
          ${(lang == 'html' || lang == 'markup') 
            ? `<script type="text/plain" class="language-${lang} ${(lineNumber) ? 'line-numbers' : ''}" ></script>`
            : `<pre><code class="language-${lang} ${(lineNumber) ? 'line-numbers' : ''}"></code></pre>`
          }
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
      document.querySelectorAll('.ast-codeview').forEach(codeview => {
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
        var width = e.dataset.width,
            height = e.dataset.height,
            blur = (e.dataset.blur != '') ? e.dataset.blur : false,
            lang = e.dataset.lang, 
            hyperlink = (e.dataset.hyperlink == 'false') ? false : (e.dataset.hyperlink == 'true') ? true : undefined,
            run = (e.dataset.run) ? e.dataset.run : false;


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
            ${(opCopy) ? `
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
              console.warn(`😊 ${astronaut.name}.codeview({hyperLink:})! Warning ! You enabled hyperlinking but did not provide an id attribute, enter an id="" in <div class="ast-codeview"> </div>. ')}`)
            } else {
              e.querySelector('.astvw-options .hyperlink a').addEventListener('click', a => {
                a.preventDefault()
                var href = e.querySelector('.astvw-options .hyperlink a').href
                astronaut.copy(href, e.querySelector('.astcw-window'))
              })
            }

          }
          if(opCopy){
            var btnCopy = e.querySelector('.astvw-options .copy');
            btnCopy.addEventListener('click', a => {
              a.preventDefault()
              var codeText = btnCopy.closest('.ast-codeview').querySelector('pre code').textContent
              astronaut.copy(codeText, e.querySelector('.astcw-window'))
            
            })
          }
          if(run && lang == 'js'){
            var btnRun = e.querySelector('.astvw-options .run');
            btnRun.addEventListener('click', a => {
              a.preventDefault()
              var codeText = btnRun.closest('.ast-codeview').querySelector('pre code').textContent,
                  newScript = document.createElement('script');
                  newScript.textContent = codeText
              document.body.appendChild(newScript)
            })
          }
      })

    }
  //==================================START PRISM.JS=========================================//

  //==================================FINAL PRISM.JS=========================================//

    init(), prismjs()
  }
}
var howtouse = 'call the function this way: astronaut.codeview({})'
try{$astronautType
try{original=astronaut
astronaut='anything';astronaut=original;console.log('is var')}catch(err){console.log(`%cIt looks like you already have the full astronaut library in your project, to avoid mistakes, if you are not using the full library and you only want to use a specific library, remove the full library! 🤔 `,` color: #ff8080;background-color: #290000;padding: 0.3rem 1.8rem 0.3rem 0.3rem;
    font-size:0.8rem;border-radius:0.2rem;border: solid 1px #5c0000;
    `);codeview=howtouse}}catch(error){if(typeof astronaut==='undefined'){window.astronaut=codeview
codeview=howtouse}else{astronaut=Object.assign(astronaut,codeview);codeview=howtouse}}
