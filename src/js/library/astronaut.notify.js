//---------------------------------------------------------------------------//
//                    Astronaut Library.js - Notify v1.0                     //
// License: MIT                                                              //
// Author: André Malveira.                                                   //
// Github: https://github.com/andremalveira                                  //
// Docs:   https://astlibjs.ga/?docs=notify                                  //
//---------------------------------------------------------------------------//


let __notify = {
  $library:'Notify',
  $version: '1.0',
  $webSite: 'https://astlibjs.ga?docs=notify',
  $shortName: 'astlibjs',
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
  notify(params) {
    if(params){
      var ID = astronaut.create.id(),
        message = (params.message) ? params.message : false,  
        icon = (params.icon) ? params.icon : '',
        link = (params.link) ? params.link : false, 
        style = (params.style) ? params.style : false, 
        theme = (params.theme) ? params.theme : false, 
        autoClose = (params.autoClose) ? params.autoClose : false
        type = (params.type) ? params.type : false, 
        ok = (message) ? true : false,
        targetBlank = (link && link.target) ? link.target : false;
      //selector
      var selector = (params.selector) ? params.selector : document;
      if(selector.constructor.name === 'String') {
        selector = document.querySelector(`${selector}`)
        selector.style.position='relative'
      }


      //message
      if(message){
        message = message.split('->') 
        var mfirst = (message[0]) ? message[0] : '', msecond = message[1] ? message[1] : '',
        linkMessage = (link && link.message) ? link.message : false;
        message =  `<div class="details"><span title="${mfirst}">${mfirst}</span><p title="${msecond}">${msecond}</p></div>`,
        message = (link && linkMessage) ? `<a ${(targetBlank == '_blank') ? 'target="_blank"' : ''} href="${linkMessage}">${message}</a>` : message;
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
          iconBackground  = (style.iconBackground)  ? style.iconBackground  : false ,
          border          = (style.border)          ? style.border          : '#2ecc71' ,
          iconSize        = (style.iconSize)        ? style.iconSize        : '2.2rem',
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

      //icon
      if(icon && icon != ''){
        linkIcon = (link && link.icon) ? link.icon : false;
        isImg = (icon) ? this.check.isImg(icon) : false,
        icon = (icon) ? (isImg) 
        ? `<div class="icon" style="${(iconBackground) ? `background: ${iconBackground};` : ''}"><img ${(style.iconSize) ? `style="width:${style.iconSize}"` : ''} src="${icon}"></div>`  
        : `<div class="icon" style="${(iconBackground) ? `background: ${iconBackground};` : ''}"><i>${icon}</i></div>` : ''
        icon = (linkIcon) ? `<a ${(targetBlank == '_blank') ? 'target="_blank"' : ''} href="${linkIcon}">${icon}</a>` : icon
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
      function isNumber(variable) {
        if (variable instanceof Number || typeof variable ==='number') {
            return true;
        }
        return false;
      }
      //insert css and html
      if(ok){
        var _notify = selector.querySelector(`.${this.name}_notify`);

        if(_notify){
          _notify.querySelector(`.all_notify`).insertAdjacentHTML('beforeend', newNotifyHTML)
        } else {
          ((selector.body) ? selector.body : selector).insertAdjacentHTML('beforeend', notifyContainer)
          selector.querySelector(`.${this.name}_notify .all_notify`).insertAdjacentHTML('beforeend', newNotifyHTML)
        }
        
        var all_notify = selector.querySelector(`.${this.name}_notify .all_notify`) ;
        if(all_notify.querySelectorAll(`div.new_notify`).length >= 7){
          setTimeout(() => {
            all_notify.querySelector(`div.new_notify`).notifyClose()
          }, 200);
        }
        //btnClose
        var close = false;
        var _btnClose = selector.querySelectorAll(`.${this.name}_notify .close-icon`);
        _btnClose.forEach(btnClose => {
          btnClose.addEventListener('click', () => {
            btnClose.notifyClose()
            close = true;
          })
        })
        if(autoClose){
          setTimeout(() => {
            if(!close){
              selector.getElementById(ID).notifyClose()
            }
          }, (isNumber(autoClose)) ? autoClose : 5000);
        }

      }
    } else {
      console.warn(`😊 Please inform the parameters! Ex: ${this.name}.notify({parameters})`)
    }
  }
}

var howtouse='call the function this way: astronaut.notify({})'
try{$astronautType
try{original=astronaut
astronaut='anything';astronaut=original;}catch(err){console.log(`%cIt looks like you already have the full astronaut library in your project, to avoid mistakes, if you are not using the full library and you only want to use a specific library, remove the full library! 🤔 `,` color: #71b9ec;background-color: #053c63;padding: 0.3rem 1.8rem 0.3rem 0.3rem;
    font-size:0.8rem;border-radius:0.2rem;border: solid 1px #1667a0;
    `);__notify=howtouse}}catch(error){if(typeof astronaut==='undefined'){window.astronaut=__notify;window.ast=__notify;window.astlibjs=__notify;
__notify=howtouse}else{astronaut=Object.assign(astronaut,__notify);__notify=howtouse}}





