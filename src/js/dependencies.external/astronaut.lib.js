const astronaut = {
  name: 'astronaut',
  doc: {body:document.body,head:document.head},
  check: {isImg(url) {return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);}},
  insert: {
    css(css, id) {
      var newStyle = document.createElement('style')
      newStyle.id= id ?? ''
      newStyle.textContent = css;
      if(!document.head.querySelector(`style#${id}`)){
        document.head.appendChild(newStyle) 
      }

    }
  },
  notify(params) {
    var message = params.message ?? false,  icon = params.icon ?? false,
        link = params.link ?? false, style = params.style ?? false, 
        theme = params.theme ?? false,
        type = params.type ?? false, ok = (message) ? true : false;

      //icon
      if(icon){
        linkIcon = (link && link.icon) ? link.icon : false, linkMessage = (link && link.message) ? link.message : false;
        isImg = (icon) ? this.check.isImg(icon) : false,
        icon = (icon) ? (isImg) 
        ? `<div class="icon"><img src="${icon}"></div>`  
        : `<div class="icon"><i>${icon}</i></div>` : ''
        icon = (linkIcon) ? `<a href="${linkIcon}">${icon}</a>` : icon
      }
      //message
      if(message){
        message = message.split('->') 
        var mfirst = message[0] ?? '', msecond = message[1] ?? '';
        message =  `<div class="details"><span>${mfirst}</span><p>${msecond}</p></div>`,
        message = (linkMessage) ? `<a href="${linkMessage}">${message}</a>` : message;
      }
      //type
      if(type){
        type_props = ['info','warn','error','off','success'];
        if(type_props.indexOf(type) == -1) {
          ok = false; 
          console.error(`✖ ERROR in ${this.name}.notify(type:'${type}'), The value informed is incorrect!`)}
      }
      //position
      position = (style.position) ? style.position : false;
      var l='-', r='', posone = 'top', postwo = 'left', position_props = ['top','bottom','left','right'];
      if(position){ position = position.split('->') 
        posone = position[0].trim()
        if(position[1]){postwo = position[1].trim()}
        if(position_props.indexOf(posone) == -1 || position_props.indexOf(postwo) == -1){ 
          ok = false; 
          console.error(`✖ ERROR in ${this.name}.notify(position:'${posone}->${postwo}' ), One of the values informed is incorrect!`)
        }
        if(posone == postwo) {
          ok = false; 
          console.error(`✖ ERROR in ${this.name}.notify(position:'${posone}->${postwo}'), You informed equal values!`)
        }
        if(posone == 'right' || postwo == 'right') {l='', r='-';}
      }
      //style
      var bg              = (style.background)      ? style.background      : '#fff' ,
          color           = (style.color)           ? style.color           : '#878787' ,
          closeColor      = (style.closeColor)      ? style.closeColor      : '#878787' ,
          closeBackground = (style.closeBackground) ? style.closeBackground : '#f2f2f2' ,
          iconColor       = (style.iconColor)       ? style.iconColor       : '#fff' ,
          border          = (style.border)          ? style.border          : '#2ecc71' ,
          iconSize        = (style.iconSize)        ? style.iconSize        : '1.7rem',
          closeSize       = (style.closeSize)       ? style.closeSize       : '0.8rem',
          margin          = (style.margin)          ? style.margin          : '2rem 4rem',
          filter          = (style.filter)          ? style.filter          : 'none',
          timeout         = (style.timeout)         ? style.timeout         : '0.5s';

      //margin
      if(margin.split(' ').length >= 3){
        ok = false; 
        console.error(`✖ ERROR in ${this.name}.notify(margin:'${margin}'), Margin property accepts only 2 arguments, eg 'arg1 arg2'!`)
      } margin = margin.split(' ')

          
      var 
      notifyContainer = `
        <div class="${this.name}_notify"><div class="all_notify"></div></div>
      `,
      newNotifyHTML = `
        <div class="new_notify ${(type) ? type : ''} ${(theme && !style.background || theme && !style.color || theme && !style.iconColor || theme && !style.closeBackground || theme && !style.closeColor) ? theme : ''}">
          <div class="content">
            ${icon}
            ${message}
          </div>
          <div class="close-icon"><i>${icons.close}</i></div>
        </div>
      `
      css = `
        .${this.name}_notify {
          z-index: 99;
          position: absolute;
          max-height: 100%;
          ${posone}: 0;
          ${postwo}: 0;
          display: flex;
          flex-direction: column;
          transform: translateX(${margin[1]});

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
        .${this.name}_notify .all_notify {
          margin: ${margin[0]} 0;
          overflow: overlay;
          overflow-x: hidden;
          padding-right: 3rem;
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
          0%{ height: 0rem;padding: 0px 15px 0px 16px;margin-bottom: 0rem;transform: translateX(${l}100%)}
          25%{height: 3.5rem;margin-bottom: 1rem;padding: 16px 15px 16px 16px;}
          40%{transform: translateX(${r}10%);}
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

        .new_notify .content .icon i svg {
          width: ${iconSize};
          height: ${iconSize};
        }
        .new_notify .content .icon img {
          border-radius: 50%;
          width: 100%;
        }
        .new_notify .content .details{
          margin-left: 15px;
          width: 18rem;
          overflow: hidden;
          height: 3.5rem;
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
        .new_notify .close-icon i svg {
          width: ${closeSize};
          height: ${closeSize};
        }
        .new_notify .close-icon:hover{
          filter: brightness(0.9);
        }
      `;

      if(message || !message && style){
        this.insert.css(css, 'astronaut_notify_css')
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
        var _btnClose = document.querySelectorAll(`.${this.name}_notify .close-icon`);
        _btnClose.forEach(btnClose => {
          btnClose.addEventListener('click', () => {
            btnClose.notifyClose()
          })
        })
      }
  }
}