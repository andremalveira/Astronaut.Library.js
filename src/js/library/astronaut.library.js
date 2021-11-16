//---------------------------------------------------//
//           Astronaut Library.js - Complete         //
//                                                   //
// Author: André Malveira.                           //
// Github: https://github.com/andremalveira          //
// Site:   https://astlibjs.ga/                      //
//---------------------------------------------------//

const $astronautType = 'library_complete';
const astronaut = {
  $library:$astronautType,
  name: 'astronaut',
  create: {
    id() {return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5))},
  },
  check: {isImg(url) {return(url.match(/\.(jpeg|jpg|gif|png|svg|webp|bmp)$/) != null);}},
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
  notify(params) {
    if(params){
      var ID = astronaut.create.id(),
        message = (params.message) ? params.message : false,  
        icon = (params.icon) ? params.icon : '',
        link = (params.link) ? params.link : false, 
        style = (params.style) ? params.style : false, 
        theme = (style.theme) ? style.theme : false, 
        autoClose = (params.autoClose) ? params.autoClose : false
        type = (params.type) ? params.type : false, 
        ok = (message) ? true : false;

      //icon
      if(icon && icon != ''){
        linkIcon = (link && link.icon) ? link.icon : false;
        isImg = (icon) ? this.check.isImg(icon) : false,
        icon = (icon) ? (isImg) 
        ? `<div class="icon bg-none"><img src="${icon}"></div>`  
        : `<div class="icon"><i>${icon}</i></div>` : ''
        icon = (linkIcon) ? `<a href="${linkIcon}">${icon}</a>` : icon
      }
      //message
      if(message){
        message = message.split('->') 
        var mfirst = (message[0]) ? message[0] : '', msecond = message[1] ? message[1] : '',
        linkMessage = (link && link.message) ? link.message : false;
        message =  `<div class="details"><span title="${mfirst}">${mfirst}</span><p title="${msecond}">${msecond}</p></div>`,
        message = (link && linkMessage) ? `<a href="${linkMessage}">${message}</a>` : message;
      } else {
        console.warn(`😊 Please enter at least one message! Ex: ${this.name}.notify({message: 'you message'})`)
      }
      //type
      if(type){
        type_props = ['info','warn','error','off','success'];
        if(type_props.indexOf(type) == -1) {
          ok = false; 
          console.error(`${this.name}.notify(type:'${type}'), The value informed is incorrect!`)}
      }
      //position
      position = (style.position) ? style.position : false;
      var l='-', r='', posone = 'top', postwo = 'left', 
      position_propsy = ['top','bottom'],
      position_propsx = ['left','right'];
      if(position){ position = position.split('->') 
        posone = position[0].trim()
        if(position[1]){postwo = position[1].trim()}
        if(position_propsy.indexOf(posone) == -1 || position_propsx.indexOf(postwo) == -1){ 
          ok = false; 
          console.error(`${this.name}.notify(position:'${posone}->${postwo}' ), One of the values informed is incorrect!`)
        }
        if(posone == postwo) {
          ok = false; 
          console.error(`${this.name}.notify(position:'${posone}->${postwo}'), You informed equal values!`)
        }
        if(posone == 'right' || postwo == 'right') {l='', r='-';}
      }
      //style
      var mdy = '2rem', mdx = '2rem';
      var bg              = (style.background)      ? style.background      : '#fff' ,
          color           = (style.color)           ? style.color           : '#878787' ,
          closeColor      = (style.closeColor)      ? style.closeColor      : '#878787' ,
          closeBackground = (style.closeBackground) ? style.closeBackground : '#f2f2f2' ,
          iconColor       = (style.iconColor)       ? style.iconColor       : '#fff' ,
          border          = (style.border)          ? style.border          : '#2ecc71' ,
          iconSize        = (style.iconSize)        ? style.iconSize        : '1.7rem',
          closeSize       = (style.closeSize)       ? style.closeSize       : '0.8rem',
          margin          = (style.margin)          ? style.margin          : `${mdy} ${mdx}`,
          filter          = (style.filter)          ? style.filter          : 'none',
          timeout         = (style.timeout)         ? style.timeout         : '0.5s',
          bgBlur          = false;

      var s = style;
      if(s.background || s.color || s.closeColor || s.closeBackground || s.iconColor || s.border) {
        theme = false;
      }
      if(s.background && s.background.indexOf('->')){
        bg = s.background.split('->')[0]
        bgBlur = s.background.split('->')[1]
      }
      //margin
      if(margin.split(' ').length >= 3){
        ok = false; 
        console.error(`${this.name}.notify(margin:'${margin}'), Margin property accepts only 2 arguments, eg 'arg1 arg2'!`)
      } margin = margin.split(' ')

      var 
      notifyContainer = `
        <div class="${this.name}_notify"><div class="all_notify"></div></div>
      `,
      newNotifyHTML = `
        <div ${(autoClose) ? `id=${ID}` : ''} class="new_notify ${(type) ? type : ''} ${(theme && !style.background || theme && !style.color || theme && !style.iconColor || theme && !style.closeBackground || theme && !style.closeColor) ? theme : ''}">
          <div class="content">
            ${icon}
            ${message}
          </div>
          <div class="close-icon"><i>${icons.close}</i></div>
        </div>
      `
      css = `
        /*Astronaut Library.js - Notify*/
        .${this.name}_notify {
          z-index: 99;
          position: absolute;
          max-height: 100%;
          ${posone}: ${(margin[0] == 'default') ? mdy : (posone == 'bottom') ? margin[0].split('rem')[0]-1+'rem' : margin[0]};
          ${postwo}: ${(margin[1] == undefined) ? mdx : margin[1]};
          display: flex;
          flex-direction: column;
  
          --dark-bg: #2d333b;
          --dark-font: #adbac7;
          --dark-icon: #fff;
          --dark-close-background: #22272e94;
          --dark-close-icon: #adbac7;

          --info:    #74ace6;
          --warn:    #f8cc51;
          --error:   #eb6161;
          --off:     #7a7b7a;
          --success: #2ecc71;
        }
        .${this.name}_notify .all_notify::-webkit-scrollbar {
          width: 8px;
          border-radius: 0.4rem;
          background: #22272e94;
        }
        .${this.name}_notify .all_notify::-webkit-scrollbar-thumb {
          height: 8px;
          border-radius: 0.4rem;
          background: #2d333b;
        }
        .${this.name}_notify .all_notify::-webkit-scrollbar-track {
          border-radius: 0.4rem;
        }
        .new_notify {
          animation: show_notify ${timeout} ease forwards;
          filter: ${filter};
          display: grid;
          grid-template-columns: 1fr auto;
          background: ${bg};
          ${(bgBlur) ? `backdrop-filter: blur(${bgBlur});` : ''}
          border-radius: 10px;
          border-left: 5px solid ${border};
          box-shadow: 1px 7px 14px -5px rgba(0,0,0,0.35);
          align-items: center;
          overflow: hidden;
          transition: ease 0.2s;
          min-height: 3.5rem;
          height: 3.5rem;
          margin-bottom: 1rem;
          padding: 16px 15px 16px 16px;
          gap: 1rem;
          opacity: 1;
        }
        .new_notify.minimize {
          min-height: 0;
          height: 0rem;
          padding: 0px 15px 0px 16px;
          margin-bottom: 0rem;
        }
        .new_notify.dark {background: var(--dark-bg);}
        .new_notify.info {border-color: var(--info);}
        .new_notify.warn {border-color: var(--warn);}
        .new_notify.error {border-color: var(--error);}
        .new_notify.off {border-color: var(--off);}
        .new_notify.success {border-color: var(--success);}

        @keyframes show_notify {
          0%{ opacity: 0; height: 0rem;padding: 0px 15px 0px 16px;margin-bottom: 0rem;transform: translateX(${l}100%)}
          25%{height: 3.5rem;margin-bottom: 1rem;padding: 16px 15px 16px 16px;}
          40%{opacity: 1; transform: translateX(${r}10%);}
          80%, 100%{transform: translateX(${r}0rem);}
        }
        
        .new_notify.hide {
          animation: hide_notify ${timeout} ease forwards;
        }
        @keyframes hide_notify {
          0%{transform: translateX(${r}0rem);}
          40%{transform: translateX(${r}10%);}
          80%, 100%{
            opacity: 0;
            pointer-events: none;
            transform: translateX(${l}100%);
          }
        }
        .new_notify .content {
          display: flex;
          align-items: center;
          user-select: none;
          gap: 1rem;
        }
        .new_notify .content a {
          text-decoration: none;
        }
        .new_notify .content .icon {
          font-size: 25px;
          color: ${iconColor};
          height: 50px;
          width: 50px;
          text-align: center;
          line-height: 50px;
          border-radius: 50%;
          background: ${border};
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }        

        .new_notify.dark .content .icon {color: var(--dark-icon);}
        .new_notify.info .content .icon {background: var(--info);}
        .new_notify.warn .content .icon {background: var(--warn);}
        .new_notify.error .content .icon {background: var(--error);}
        .new_notify.off .content .icon {background: var(--off);}
        .new_notify.success .content .icon {background: var(--success);}

        .new_notify .content .icon.bg-none {
          background: transparent;
        }
        .new_notify .content .icon i svg {
          width: ${iconSize};
          height: ${iconSize};
        }
        .new_notify.off .content .icon {
          filter: grayscale(1);
        }
        .new_notify.off .content .icon i {
          opacity: 0.5;
        }
        .new_notify .content .icon img {
          border-radius: 50%;
          width: 100%;
        }
        .new_notify .content .details{
          width: 21rem;
          overflow: hidden;
          height: 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .new_notify .details span{
          font-size: 20px;
          font-weight: 500;
        }
        .new_notify .details p,
        .new_notify .details span {
          color: ${color};
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }
        .new_notify.dark .details p, 
        .new_notify.dark .details span {
          color: var(--dark-font);
        }
        .new_notify .details p {
          opacity: 0.8
        }
        .new_notify .close-icon {
          color: ${closeColor};
          font-size: 23px;
          cursor: pointer;
          height: 40px;
          width: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 50%;
          background: ${closeBackground};
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .new_notify.dark .close-icon {
          color: var(--dark-close-icon);
          background: var(--dark-close-background);
        }
        .new_notify :is(.icon, .close-icon) i {
          display: flex;
        }
        .new_notify .close-icon i svg {
          width: ${closeSize};
          height: ${closeSize};
        }
        .new_notify .close-icon:hover{
          filter: brightness(0.9);
        }
      `;

      if(message || !message && style){
        this.insert.css(css, 'notify')
      }
      //function notifyClose
      HTMLElement.prototype.notifyClose=function(e){
        var _notify = this.closest('.new_notify')
        _notify.classList.add('hide')
        setTimeout(() => {
          _notify.classList.add('minimize')
          setTimeout(() => {
            _notify.remove()
          }, 500);

        }, timeout.split('s')[0]*1000-100);
      }
      //insert css and html
      if(ok){
        var _notify = document.querySelector(`.${this.name}_notify`);

        if(_notify){
          _notify.querySelector(`.all_notify`).insertAdjacentHTML('beforeend', newNotifyHTML)
        } else {
          document.body.insertAdjacentHTML('beforeend', notifyContainer)
          document.querySelector(`.${this.name}_notify .all_notify`).insertAdjacentHTML('beforeend', newNotifyHTML)
        }
        
        var all_notify = document.querySelector(`.${this.name}_notify .all_notify`) ;
        if(all_notify.querySelectorAll(`div.new_notify`).length >= 7){
          setTimeout(() => {
            all_notify.querySelector(`div.new_notify`).notifyClose()
          }, 200);
        }
        //btnClose
        var close = false;
        var _btnClose = document.querySelectorAll(`.${this.name}_notify .close-icon`);
        _btnClose.forEach(btnClose => {
          btnClose.addEventListener('click', () => {
            btnClose.notifyClose()
            close = true;
          })
        })
        if(autoClose){
          setTimeout(() => {
            if(!close){
              document.getElementById(ID).notifyClose()
            }
          }, 5000);
        }

      }
    } else {
      console.warn(`😊 Please inform the parameters! Ex: ${this.name}.notify({parameters})`)
    }
  },
  codeview(params) {
    var e = params,
        lineNumber  = (e && e.lineNumber)   ? e.lineNumber  : false,
        fontSize    = (e && e.fontSize)     ? e.fontSize    : '0.9rem',
        fontFamily  = (e && e.fontFamily)   ? e.fontFamily  : 'Fira Code, "system-ui"',
        theme       = (e && e.theme)        ? e.theme       : 'copilot',
        windowBar   = (e && e.windowBar)    ? e.windowBar   : true;

    //insertCSS
    function codeviewcss(params) {
      var ln = (params) ? params.lineNumber : false;
          lnColor     = (ln && ln.color)      ? ln.color      : '#adbac74a',
          lnSeparator = (ln && ln.separator)  ? ln.separator  : true,
          lnOpacity   = (ln && ln.opacity)    ? ln.opacity    : false,
  
          ff = params.fontFamily,
          fs = params.fontSize,
          th = params.theme,
          wb = params.windowBar;
  
          astronaut.insert.css(`
  /*Astronaut Library.js - CodeView*/
  .ast-codeview {
    width: 100%;
    height: auto;
    border-radius: 0.4rem;
    color: transparent; 
    margin: 0.5rem 0;
    position: relative;
    display: grid;
    grid-template-rows: ${(wb) ? 'auto' : ''} 1fr;
    overflow: hidden;
  }
  script[type="text/plain"].ast-codeview {
    display: flex;
  }
  .ast-codeview :is(..astcw-container)::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 0.4rem;
  }
  .ast-codeview :is(..astcw-container)::-webkit-scrollbar-thumb {
    height: 5px;
    border-radius: 0.4rem;
  }
  .ast-codeview :is(..astcw-container)::-webkit-scrollbar-track {
    border-radius: 0.4rem;
  }
  .ast-codeview .astcw-container {
    position: relative;
    padding: 1rem;
    overflow: auto;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-auto-flow: dense;
  }
  .code-nav-bar {
    padding: 0.5rem 0.8rem;
    display: grid;
    grid-template-columns: 5rem 1fr 5rem;
    align-items: center;
    height: 1.2rem;
    font-family: system-ui;
    ${(wb == 'transparent') ? 'background: transparent!important;' : ''}
  }
  .code-nav-bar .windowControl { 
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  .code-nav-bar .windowControl [dot] { 
    width: 13px;
    height: 13px;
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
  [data-theme="copilot"].ast-codeview, .ast-codeview .line-numbers-rows               {background: #232A2F}
  [data-theme="copilot"].ast-codeview .code-nav-bar                                   {background: #1A2023}
  [data-theme="copilot"].ast-codeview :is(.astcw-container)::-webkit-scrollbar-thumb        {background: #444267}
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
    `:''
  }`, 'codeview')
  
    }
    codeviewcss({lineNumber, fontSize, fontFamily, windowBar, theme})

    function codeviewHTML(params) {
      var lang = params.lang ?? '', title = params.title ?? '';
      return`
      ${(windowBar) ? `
        <div class="code-nav-bar">
          <div class="windowControl">
            <span dot="E0443E"></span>        
            <span dot="DEA123"></span>
            <span dot="1AAB29"></span>
          </div>
          <div class="title">${title}</div>
          <div class="copy"></div>
        </div>
      ` : ''}
      
      <div class="astcw-container">
        ${(lang == 'html' || lang == 'markup') 
          ? `<script type="text/plain" class="language-${lang} ${(lineNumber) ? 'line-numbers' : ''}" ></script>`
          : `<pre><code class="language-${lang} ${(lineNumber) ? 'line-numbers' : ''}"></code></pre>`
        }
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
        var codeview = e
        var lang = codeview.dataset.lang, 
            title = codeview.dataset.title,
            width = codeview.dataset.width,
            height = codeview.dataset.height;
            console.log(width)
            console.log(height)

        var codeViewText = regex(codeview.innerHTML);

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
        e.setAttribute('visible','')
        setCodeViewTheme(theme, e)
      })

    }
  //==================================START PRISM.JS=========================================//
    const prismjs=()=>{
      var e=function(e){var t=/\blang(?:uage)?-([\w-]+)\b/i,n=0,a={},r={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(t){return t instanceof i?new i(t.type,e(t.content),t.alias):Array.isArray(t)?t.map(e):t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function e(t,n){var a,i;switch(n=n||{},r.util.type(t)){case"Object":if(i=r.util.objId(t),n[i])return n[i];for(var s in a={},n[i]=a,t)t.hasOwnProperty(s)&&(a[s]=e(t[s],n));return a;case"Array":return i=r.util.objId(t),n[i]?n[i]:(a=[],n[i]=a,t.forEach(function(t,r){a[r]=e(t,n)}),a);default:return t}},getLanguage:function(e){for(;e&&!t.test(e.className);)e=e.parentElement;return e?(e.className.match(t)||[,"none"])[1].toLowerCase():"none"},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(a){var e=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(a.stack)||[])[1];if(e){var t=document.getElementsByTagName("script");for(var n in t)if(t[n].src==e)return t[n]}return null}},isActive:function(e,t,n){for(var a="no-"+t;e;){var r=e.classList;if(r.contains(t))return!0;if(r.contains(a))return!1;e=e.parentElement}return!!n}},languages:{plain:a,plaintext:a,text:a,txt:a,extend:function(e,t){var n=r.util.clone(r.languages[e]);for(var a in t)n[a]=t[a];return n},insertBefore:function(e,t,n,a){var i=(a=a||r.languages)[e],s={};for(var l in i)if(i.hasOwnProperty(l)){if(l==t)for(var o in n)n.hasOwnProperty(o)&&(s[o]=n[o]);n.hasOwnProperty(l)||(s[l]=i[l])}var u=a[e];return a[e]=s,r.languages.DFS(r.languages,function(t,n){n===u&&t!=e&&(this[t]=s)}),s},DFS:function e(t,n,a,i){i=i||{};var s=r.util.objId;for(var l in t)if(t.hasOwnProperty(l)){n.call(t,l,t[l],a||l);var o=t[l],u=r.util.type(o);"Object"!==u||i[s(o)]?"Array"!==u||i[s(o)]||(i[s(o)]=!0,e(o,n,l,i)):(i[s(o)]=!0,e(o,n,null,i))}}},plugins:{},highlightAll:function(e,t){r.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var a={callback:n,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};r.hooks.run("before-highlightall",a),a.elements=Array.prototype.slice.apply(a.container.querySelectorAll(a.selector)),r.hooks.run("before-all-elements-highlight",a);for(var i,s=0;i=a.elements[s++];)r.highlightElement(i,!0===t,a.callback)},highlightElement:function(n,a,i){var s=r.util.getLanguage(n),l=r.languages[s];n.className=n.className.replace(t,"").replace(/\s+/g," ")+" language-"+s;var o=n.parentElement;o&&"pre"===o.nodeName.toLowerCase()&&(o.className=o.className.replace(t,"").replace(/\s+/g," ")+" language-"+s);var u={element:n,language:s,grammar:l,code:n.textContent};function c(e){u.highlightedCode=e,r.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r.hooks.run("after-highlight",u),r.hooks.run("complete",u),i&&i.call(u.element)}if(r.hooks.run("before-sanity-check",u),(o=u.element.parentElement)&&"pre"===o.nodeName.toLowerCase()&&!o.hasAttribute("tabindex")&&o.setAttribute("tabindex","0"),!u.code)return r.hooks.run("complete",u),void(i&&i.call(u.element));if(r.hooks.run("before-highlight",u),u.grammar)if(a&&e.Worker){var d=new Worker(r.filename);d.onmessage=function(e){c(e.data)},d.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else c(r.highlight(u.code,u.grammar,u.language));else c(r.util.encode(u.code))},highlight:function(e,t,n){var a={code:e,grammar:t,language:n};return r.hooks.run("before-tokenize",a),a.tokens=r.tokenize(a.code,a.grammar),r.hooks.run("after-tokenize",a),i.stringify(r.util.encode(a.tokens),a.language)},tokenize:function(e,t){var n=t.rest;if(n){for(var a in n)t[a]=n[a];delete t.rest}var c=new l;return o(c,c.head,e),function e(t,n,a,l,c,d){for(var p in a)if(a.hasOwnProperty(p)&&a[p]){var g=a[p];g=Array.isArray(g)?g:[g];for(var f=0;f<g.length;++f){if(d&&d.cause==p+","+f)return;var h=g[f],m=h.inside,b=!!h.lookbehind,y=!!h.greedy,v=h.alias;if(y&&!h.pattern.global){var k=h.pattern.toString().match(/[imsuy]*$/)[0];h.pattern=RegExp(h.pattern.source,k+"g")}for(var w=h.pattern||h,x=l.next,F=c;x!==n.tail&&!(d&&F>=d.reach);F+=x.value.length,x=x.next){var A=x.value;if(n.length>t.length)return;if(!(A instanceof i)){var $,_=1;if(y){if(!($=s(w,F,t,b))||$.index>=t.length)break;var z=$.index,S=$.index+$[0].length,E=F;for(E+=x.value.length;E<=z;)E+=(x=x.next).value.length;if(F=E-=x.value.length,x.value instanceof i)continue;for(var j=x;j!==n.tail&&(E<S||"string"==typeof j.value);j=j.next)_++,E+=j.value.length;_--,A=t.slice(F,E),$.index-=F}else if(!($=s(w,0,A,b)))continue;z=$.index;var C=$[0],N=A.slice(0,z),L=A.slice(z+C.length),q=F+A.length;d&&q>d.reach&&(d.reach=q);var O=x.prev;if(N&&(O=o(n,O,N),F+=N.length),u(n,O,_),x=o(n,O,new i(p,m?r.tokenize(C,m):C,v,C)),L&&o(n,x,L),1<_){var P={cause:p+","+f,reach:q};e(t,n,a,x.prev,F,P),d&&P.reach>d.reach&&(d.reach=P.reach)}}}}}}(e,c,t,c.head,0),function(e){for(var t=[],n=e.head.next;n!==e.tail;)t.push(n.value),n=n.next;return t}(c)},hooks:{all:{},add:function(e,t){var n=r.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=r.hooks.all[e];if(n&&n.length)for(var a,i=0;a=n[i++];)a(t)}},Token:i};function i(e,t,n,a){this.type=e,this.content=t,this.alias=n,this.length=0|(a||"").length}function s(e,t,n,a){e.lastIndex=t;var r=e.exec(n);if(r&&a&&r[1]){var i=r[1].length;r.index+=i,r[0]=r[0].slice(i)}return r}function l(){var e={value:null,prev:null,next:null},t={value:null,prev:e,next:null};e.next=t,this.head=e,this.tail=t,this.length=0}function o(e,t,n){var a=t.next,r={value:n,prev:t,next:a};return t.next=r,a.prev=r,e.length++,r}function u(e,t,n){for(var a=t.next,r=0;r<n&&a!==e.tail;r++)a=a.next;(t.next=a).prev=t,e.length-=r}if(e.Prism=r,i.stringify=function e(t,n){if("string"==typeof t)return t;if(Array.isArray(t)){var a="";return t.forEach(function(t){a+=e(t,n)}),a}var i={type:t.type,content:e(t.content,n),tag:"span",classes:["token",t.type],attributes:{},language:n},s=t.alias;s&&(Array.isArray(s)?Array.prototype.push.apply(i.classes,s):i.classes.push(s)),r.hooks.run("wrap",i);var l="";for(var o in i.attributes)l+=" "+o+'="'+(i.attributes[o]||"").replace(/"/g,"&quot;")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+l+">"+i.content+"</"+i.tag+">"},!e.document)return e.addEventListener&&(r.disableWorkerMessageHandler||e.addEventListener("message",function(t){var n=JSON.parse(t.data),a=n.language,i=n.code,s=n.immediateClose;e.postMessage(r.highlight(i,r.languages[a],a)),s&&e.close()},!1)),r;var c=r.util.currentScript();function d(){r.manual||r.highlightAll()}if(c&&(r.filename=c.src,c.hasAttribute("data-manual")&&(r.manual=!0)),!r.manual){var p=document.readyState;"loading"===p||"interactive"===p&&c&&c.defer?document.addEventListener("DOMContentLoaded",d):window.requestAnimationFrame?window.requestAnimationFrame(d):window.setTimeout(d,16)}return r}("undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{});"undefined"!=typeof module&&module.exports&&(module.exports=e),"undefined"!=typeof global&&(global.Prism=e),e.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},e.languages.markup.tag.inside["attr-value"].inside.entity=e.languages.markup.entity,e.languages.markup.doctype.inside["internal-subset"].inside=e.languages.markup,e.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Object.defineProperty(e.languages.markup.tag,"addInlined",{value:function(t,n){var a={};a["language-"+n]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:e.languages[n]},a.cdata=/^<!\[CDATA\[|\]\]>$/i;var r={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:a}};r["language-"+n]={pattern:/[\s\S]+/,inside:e.languages[n]};var i={};i[t]={pattern:RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g,function(){return t}),"i"),lookbehind:!0,greedy:!0,inside:r},e.languages.insertBefore("markup","cdata",i)}}),Object.defineProperty(e.languages.markup.tag,"addAttribute",{value:function(t,n){e.languages.markup.tag.inside["special-attr"].push({pattern:RegExp("(^|[\"'\\s])(?:"+t+")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))","i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[n,"language-"+n],inside:e.languages[n]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),e.languages.html=e.languages.markup,e.languages.mathml=e.languages.markup,e.languages.svg=e.languages.markup,e.languages.xml=e.languages.extend("markup",{}),e.languages.ssml=e.languages.xml,e.languages.atom=e.languages.xml,e.languages.rss=e.languages.xml,function(e){var t=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+t.source+"|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+t.source+"$"),alias:"url"}}},selector:{pattern:RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+t.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:t,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;var n=e.languages.markup;n&&(n.tag.addInlined("style","css"),n.tag.addAttribute("style","css"))}(e),e.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},e.languages.javascript=e.languages.extend("clike",{"class-name":[e.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),e.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,e.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:e.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:e.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:e.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:e.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:e.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),e.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:e.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),e.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),e.languages.markup&&(e.languages.markup.tag.addInlined("script","javascript"),e.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)","javascript")),e.languages.js=e.languages.javascript,function(e){function t(e,t){return"___"+e.toUpperCase()+t+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(n,a,r,i){if(n.language===a){var s=n.tokenStack=[];n.code=n.code.replace(r,function(e){if("function"==typeof i&&!i(e))return e;for(var r,l=s.length;-1!==n.code.indexOf(r=t(a,l));)++l;return s[l]=e,r}),n.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(n,a){if(n.language===a&&n.tokenStack){n.grammar=e.languages[a];var r=0,i=Object.keys(n.tokenStack);!function s(l){for(var o=0;o<l.length&&!(r>=i.length);o++){var u=l[o];if("string"==typeof u||u.content&&"string"==typeof u.content){var c=i[r],d=n.tokenStack[c],p="string"==typeof u?u:u.content,g=t(a,c),f=p.indexOf(g);if(-1<f){++r;var h=p.substring(0,f),m=new e.Token(a,e.tokenize(d,n.grammar),"language-"+a,d),b=p.substring(f+g.length),y=[];h&&y.push.apply(y,s([h])),y.push(m),b&&y.push.apply(y,s([b])),"string"==typeof u?l.splice.apply(l,[o,1].concat(y)):u.content=y}}else u.content&&s(u.content)}return l}(n.tokens)}}}})}(e),function(e){var t=/\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,n=[{pattern:/\b(?:false|true)\b/i,alias:"boolean"},{pattern:/(::\s*)\b[a-z_]\w*\b(?!\s*\()/i,greedy:!0,lookbehind:!0},{pattern:/(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,greedy:!0,lookbehind:!0},/\b(?:null)\b/i,/\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/],a=/\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,r=/<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,i=/[{}\[\](),:;]/;e.languages.php={delimiter:{pattern:/\?>$|^<\?(?:php(?=\s)|=)?/i,alias:"important"},comment:t,variable:/\$+(?:\w+\b|(?=\{))/i,package:{pattern:/(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,lookbehind:!0,inside:{punctuation:/\\/}},"class-name-definition":{pattern:/(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,lookbehind:!0,alias:"class-name"},"function-definition":{pattern:/(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,lookbehind:!0,alias:"function"},keyword:[{pattern:/(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/i,alias:"type-casting",greedy:!0,lookbehind:!0},{pattern:/([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/i,alias:"type-hint",greedy:!0,lookbehind:!0},{pattern:/(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string|void)\b/i,alias:"return-type",greedy:!0,lookbehind:!0},{pattern:/\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/i,alias:"type-declaration",greedy:!0},{pattern:/(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/i,alias:"type-declaration",greedy:!0,lookbehind:!0},{pattern:/\b(?:parent|self|static)(?=\s*::)/i,alias:"static-context",greedy:!0},{pattern:/(\byield\s+)from\b/i,lookbehind:!0},/\bclass\b/i,{pattern:/((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|new|or|parent|print|private|protected|public|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield|__halt_compiler)\b/i,lookbehind:!0}],"argument-name":{pattern:/([(,]\s+)\b[a-z_]\w*(?=\s*:(?!:))/i,lookbehind:!0},"class-name":[{pattern:/(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,greedy:!0,lookbehind:!0},{pattern:/(\|\s*)\b[a-z_]\w*(?!\\)\b/i,greedy:!0,lookbehind:!0},{pattern:/\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i,greedy:!0},{pattern:/(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,alias:"class-name-fully-qualified",greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}},{pattern:/(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,alias:"class-name-fully-qualified",greedy:!0,inside:{punctuation:/\\/}},{pattern:/(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,alias:"class-name-fully-qualified",greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}},{pattern:/\b[a-z_]\w*(?=\s*\$)/i,alias:"type-declaration",greedy:!0},{pattern:/(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,alias:["class-name-fully-qualified","type-declaration"],greedy:!0,inside:{punctuation:/\\/}},{pattern:/\b[a-z_]\w*(?=\s*::)/i,alias:"static-context",greedy:!0},{pattern:/(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,alias:["class-name-fully-qualified","static-context"],greedy:!0,inside:{punctuation:/\\/}},{pattern:/([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,alias:"type-hint",greedy:!0,lookbehind:!0},{pattern:/([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,alias:["class-name-fully-qualified","type-hint"],greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}},{pattern:/(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,alias:"return-type",greedy:!0,lookbehind:!0},{pattern:/(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,alias:["class-name-fully-qualified","return-type"],greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}}],constant:n,function:{pattern:/(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,lookbehind:!0,inside:{punctuation:/\\/}},property:{pattern:/(->\s*)\w+/,lookbehind:!0},number:a,operator:r,punctuation:i};var s={pattern:/\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,lookbehind:!0,inside:e.languages.php},l=[{pattern:/<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,alias:"nowdoc-string",greedy:!0,inside:{delimiter:{pattern:/^<<<'[^']+'|[a-z_]\w*;$/i,alias:"symbol",inside:{punctuation:/^<<<'?|[';]$/}}}},{pattern:/<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,alias:"heredoc-string",greedy:!0,inside:{delimiter:{pattern:/^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,alias:"symbol",inside:{punctuation:/^<<<"?|[";]$/}},interpolation:s}},{pattern:/`(?:\\[\s\S]|[^\\`])*`/,alias:"backtick-quoted-string",greedy:!0},{pattern:/'(?:\\[\s\S]|[^\\'])*'/,alias:"single-quoted-string",greedy:!0},{pattern:/"(?:\\[\s\S]|[^\\"])*"/,alias:"double-quoted-string",greedy:!0,inside:{interpolation:s}}];e.languages.insertBefore("php","variable",{string:l,attribute:{pattern:/#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,greedy:!0,inside:{"attribute-content":{pattern:/^(#\[)[\s\S]+(?=\]$)/,lookbehind:!0,inside:{comment:t,string:l,"attribute-class-name":[{pattern:/([^:]|^)\b[a-z_]\w*(?!\\)\b/i,alias:"class-name",greedy:!0,lookbehind:!0},{pattern:/([^:]|^)(?:\\?\b[a-z_]\w*)+/i,alias:["class-name","class-name-fully-qualified"],greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}}],constant:n,number:a,operator:r,punctuation:i}},delimiter:{pattern:/^#\[|\]$/,alias:"punctuation"}}}}),e.hooks.add("before-tokenize",function(t){/<\?/.test(t.code)&&e.languages["markup-templating"].buildPlaceholders(t,"php",/<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/gi)}),e.hooks.add("after-tokenize",function(t){e.languages["markup-templating"].tokenizePlaceholders(t,"php")})}(e),function(e){var t={pattern:/\\[\\(){}[\]^$+*?|.]/,alias:"escape"},n=/\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/,a="(?:[^\\\\-]|"+n.source+")",r=RegExp(a+"-"+a),i={pattern:/(<|')[^<>']+(?=[>']$)/,lookbehind:!0,alias:"variable"};e.languages.regex={"char-class":{pattern:/((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,lookbehind:!0,inside:{"char-class-negation":{pattern:/(^\[)\^/,lookbehind:!0,alias:"operator"},"char-class-punctuation":{pattern:/^\[|\]$/,alias:"punctuation"},range:{pattern:r,inside:{escape:n,"range-punctuation":{pattern:/-/,alias:"operator"}}},"special-escape":t,"char-set":{pattern:/\\[wsd]|\\p\{[^{}]+\}/i,alias:"class-name"},escape:n}},"special-escape":t,"char-set":{pattern:/\.|\\[wsd]|\\p\{[^{}]+\}/i,alias:"class-name"},backreference:[{pattern:/\\(?![123][0-7]{2})[1-9]/,alias:"keyword"},{pattern:/\\k<[^<>']+>/,alias:"keyword",inside:{"group-name":i}}],anchor:{pattern:/[$^]|\\[ABbGZz]/,alias:"function"},escape:n,group:[{pattern:/\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,alias:"punctuation",inside:{"group-name":i}},{pattern:/\)/,alias:"punctuation"}],quantifier:{pattern:/(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/,alias:"number"},alternation:{pattern:/\|/,alias:"keyword"}}}(e),function(){if(void 0!==e&&"undefined"!=typeof document){var t="line-numbers",n=/\n(?!$)/g,a=e.plugins.lineNumbers={getLine:function(e,n){if("PRE"===e.tagName&&e.classList.contains(t)){var a=e.querySelector(".line-numbers-rows");if(a){var r=parseInt(e.getAttribute("data-start"),10)||1,i=r+(a.children.length-1);n<r&&(n=r),i<n&&(n=i);var s=n-r;return a.children[s]}}},resize:function(e){i([e])},assumeViewportIndependence:!0},r=void 0;window.addEventListener("resize",function(){a.assumeViewportIndependence&&r===window.innerWidth||(r=window.innerWidth,i(Array.prototype.slice.call(document.querySelectorAll("pre."+t))))}),e.hooks.add("complete",function(a){if(a.code){var r=a.element,s=r.parentNode;if(s&&/pre/i.test(s.nodeName)&&!r.querySelector(".line-numbers-rows")&&e.util.isActive(r,t)){r.classList.remove(t),s.classList.add(t);var l,o=a.code.match(n),u=o?o.length+1:1,c=new Array(u+1).join("<span></span>");(l=document.createElement("span")).setAttribute("aria-hidden","true"),l.className="line-numbers-rows",l.innerHTML=c,s.hasAttribute("data-start")&&(s.style.counterReset="linenumber "+(parseInt(s.getAttribute("data-start"),10)-1)),a.element.appendChild(l),i([s]),e.hooks.run("line-numbers",a),a.element.parentElement.parentElement.classList.add("line-numbers")}}}),e.hooks.add("line-numbers",function(e){e.plugins=e.plugins||{},e.plugins.lineNumbers=!0})}function i(e){if(0!=(e=e.filter(function(e){var t=function(e){return e?window.getComputedStyle?getComputedStyle(e):e.currentStyle||null:null}(e)["white-space"];return"pre-wrap"===t||"pre-line"===t})).length){var t=e.map(function(e){var t=e.querySelector("code"),a=e.querySelector(".line-numbers-rows");if(t&&a){var r=e.querySelector(".line-numbers-sizer"),i=t.textContent.split(n);r||((r=document.createElement("span")).className="line-numbers-sizer",t.appendChild(r)),r.innerHTML="0",r.style.display="block";var s=r.getBoundingClientRect().height;return r.innerHTML="",{element:e,lines:i,lineHeights:[],oneLinerHeight:s,sizer:r}}}).filter(Boolean);t.forEach(function(e){var t=e.sizer,n=e.lines,a=e.lineHeights,r=e.oneLinerHeight;a[n.length-1]=void 0,n.forEach(function(e,n){if(e&&1<e.length){var i=t.appendChild(document.createElement("span"));i.style.display="block",i.textContent=e}else a[n]=r})}),t.forEach(function(e){for(var t=e.sizer,n=e.lineHeights,a=0,r=0;r<n.length;r++)void 0===n[r]&&(n[r]=t.children[a++].getBoundingClientRect().height)}),t.forEach(function(e){var t=e.sizer,n=e.element.querySelector(".line-numbers-rows");t.style.display="none",t.innerHTML="",e.lineHeights.forEach(function(e,t){n.children[t].style.height=e+"px"})})}}}(),void 0!==e&&"undefined"!=typeof document&&(Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),e.plugins.UnescapedMarkup=!0,e.hooks.add("before-highlightall",function(e){e.selector+=', [class*="lang-"] script[type="text/plain"], [class*="language-"] script[type="text/plain"], script[type="text/plain"][class*="lang-"], script[type="text/plain"][class*="language-"]'}),e.hooks.add("before-sanity-check",function(e){var t=e.element;if(t.matches('script[type="text/plain"]')){var n=document.createElement("code"),a=document.createElement("pre");a.className=n.className=t.className;var r=t.dataset;return Object.keys(r||{}).forEach(function(e){Object.prototype.hasOwnProperty.call(r,e)&&(a.dataset[e]=r[e])}),n.textContent=e.code=e.code.replace(/&lt;\/script(?:>|&gt;)/gi,"<\/script>"),a.appendChild(n),t.parentNode.replaceChild(a,t),void(e.element=n)}if(!e.code){var i=t.childNodes;1===i.length&&"#comment"==i[0].nodeName&&(t.textContent=e.code=i[0].textContent)}})),function(){if(void 0!==e){var t=Object.assign||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e};n.prototype={setDefaults:function(e){this.defaults=t(this.defaults,e)},normalize:function(e,n){for(var a in n=t(this.defaults,n)){var r=a.replace(/-(\w)/g,function(e,t){return t.toUpperCase()});"normalize"!==a&&"setDefaults"!==r&&n[a]&&this[r]&&(e=this[r].call(this,e,n[a]))}return e},leftTrim:function(e){return e.replace(/^\s+/,"")},rightTrim:function(e){return e.replace(/\s+$/,"")},tabsToSpaces:function(e,t){return t=0|t||4,e.replace(/\t/g,new Array(++t).join(" "))},spacesToTabs:function(e,t){return t=0|t||4,e.replace(RegExp(" {"+t+"}","g"),"\t")},removeTrailing:function(e){return e.replace(/\s*?$/gm,"")},removeInitialLineFeed:function(e){return e.replace(/^(?:\r?\n|\r)/,"")},removeIndent:function(e){var t=e.match(/^[^\S\n\r]*(?=\S)/gm);return t&&t[0].length?(t.sort(function(e,t){return e.length-t.length}),t[0].length?e.replace(RegExp("^"+t[0],"gm"),""):e):e},indent:function(e,t){return e.replace(/^[^\S\n\r]*(?=\S)/gm,new Array(++t).join("\t")+"$&")},breakLines:function(e,t){t=!0===t?80:0|t||80;for(var n=e.split("\n"),r=0;r<n.length;++r)if(!(a(n[r])<=t)){for(var i=n[r].split(/(\s+)/g),s=0,l=0;l<i.length;++l){var o=a(i[l]);t<(s+=o)&&(i[l]="\n"+i[l],s=o)}n[r]=i.join("")}return n.join("\n")}},"undefined"!=typeof module&&module.exports&&(module.exports=n),e.plugins.NormalizeWhitespace=new n({"remove-trailing":!0,"remove-indent":!0,"left-trim":!0,"right-trim":!0}),e.hooks.add("before-sanity-check",function(t){var n=e.plugins.NormalizeWhitespace;if((!t.settings||!1!==t.settings["whitespace-normalization"])&&e.util.isActive(t.element,"whitespace-normalization",!0))if(t.element&&t.element.parentNode||!t.code){var a=t.element.parentNode;if(t.code&&a&&"pre"===a.nodeName.toLowerCase()){for(var r=a.childNodes,i="",s="",l=!1,o=0;o<r.length;++o){var u=r[o];u==t.element?l=!0:"#text"===u.nodeName&&(l?s+=u.nodeValue:i+=u.nodeValue,a.removeChild(u),--o)}if(t.element.children.length&&e.plugins.KeepMarkup){var c=i+t.element.innerHTML+s;t.element.innerHTML=n.normalize(c,t.settings),t.code=t.element.textContent}else t.code=i+t.code+s,t.code=n.normalize(t.code,t.settings)}}else t.code=n.normalize(t.code,t.settings)})}function n(e){this.defaults=t({},e)}function a(e){for(var t=0,n=0;n<e.length;++n)e.charCodeAt(n)=="\t".charCodeAt(0)&&(t+=3);return e.length+t}}()
    };
  //==================================FINAL PRISM.JS=========================================//

    init(), prismjs()
  }
}


 