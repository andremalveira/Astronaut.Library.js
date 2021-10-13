//--------------------------------!IMPORTANT------------------------------------//
//  funcs.js -> Functions Useful created by @andremalveira for development web  //
//------------------------------------------------------------------------------//
THIS = HTMLElement.prototype,BODY=document.body,HEAD=document.head, HTML = document.documentElement;

function GET(e){return document.querySelector(e)} 
function GET_ALL(e){return document.querySelectorAll(e)} 
function log(text, css){return console.log(text)}
function error(e){return console.error(e)}
THIS.stylesheet=function(params){
var doc = (params.dom) ? params.dom : document;
newStyle = doc.createElement('style');
newStyle.textContent = params.css;this.appendChild(newStyle)}
THIS.get=function(e){return this.querySelector(e)}
THIS.getAll=function(e){return this.querySelectorAll(e)}
String.prototype.capitalize = function() {return this.charAt(0).toUpperCase() + this.substr(1);}
String.prototype.lastCaracter = function(e) {return this.match(`(?:jpg|jpeg|gif|png|svg|js|json|html|css|php|txt|zip|exe|rar|/|)*$(?!\w|\s)`)[0];}
THIS.loadHTML=function(url){
  var local = this
  fetch(url)
  .then(function (response) {
    return response.text();
  })
  .then(function (body) {
    local.innerHTML = body;
    var notifyScript= local.getElementsByTagName("script");
    if(notifyScript){
      var scripts = local.getElementsByTagName('script');
      Array.prototype.forEach.call (scripts, function (script) {
        var scriptText = script.innerText;

        var newScript = document.createElement('script');
            newScript.innerHTML = scriptText;
        script.parentElement.appendChild(newScript);
        script.remove();
      });
    }
  });
}  
Date.prototype.getMesEmPortugues = function() {
  if (this.getMonth() == 0){this.mesEmPortugues = "Janeiro"};
  if (this.getMonth() == 1){this.mesEmPortugues = "Fevereiro"};
  if (this.getMonth() == 2){this.mesEmPortugues = "Março"};
  if (this.getMonth() == 3){this.mesEmPortugues = "Abril"};
  if (this.getMonth() == 4){this.mesEmPortugues = "Maio"};
  if (this.getMonth() == 5){this.mesEmPortugues = "Junho"};
  if (this.getMonth() == 6){this.mesEmPortugues = "Julho"};
  if (this.getMonth() == 7){this.mesEmPortugues = "Agosto"};
  if (this.getMonth() == 8){this.mesEmPortugues = "Setembro"};
  if (this.getMonth() == 9){this.mesEmPortugues = "Outubro"};
  if (this.getMonth() == 10){this.mesEmPortugues = "Novembro"};
  if (this.getMonth() == 11){this.mesEmPortugues = "Dezembro"};
};
THIS.setCaretEnd=function(e){
  var range = document.createRange(),
      selection = window.getSelection();
  selection.removeAllRanges();
  range.selectNodeContents(this);
  range.collapse(false);
  selection.addRange(range);
  this.focus();

};
THIS.insertTime=function(e) {
  function checkTime(i) {if(i < 10){i = "0" + i}return i;}

  function start(e) {
    var date = new Date();
    var dia = date.getDate();
    
    date.getMesEmPortugues();
    var mes = date.mesEmPortugues;
  
    var ano = date.getFullYear();
    var horas = date.getHours();
    var minutos = date.getMinutes();
    var segundos = date.getSeconds();
  
    // add a zero in front of numbers<10
    minutos = checkTime(minutos);
    segundos = checkTime(segundos);
  
    var time = `<span>${horas}:${minutos}</span>`;
    e.innerHTML=time
    
    t = setTimeout(function() {
      start(e);
    }, 1000);
  }
  start(this)
}
THIS.contextMenuCustom=function(event){
  function viewContextMenu(event, clientX, clientY) {
    
    var body = document.body, 
        url = event.get('a').attributes['src'].value,
        filename = event.get('a').attributes['src'].value.match('(?:\w+:)?\/\/[^\/]+([^?#]+)')[1],

        btnOpenVscode = (storageLocal.get()) 
        ? (storageLocal.get().dirprojects && storageLocal.get().dirprojects != '') 
        ? `<button class="btn" option="openinvscode"><i>${icons.vscode}</i><span>${langText.openInVscode}</span></button>`
        : '' : ''

        contextMenuMarkup = `
          <div id="contextMenu">
            <div class="overlayContextMenuCustom"></div>
            <div class="contextMenuCustom" style="transform: translate(${clientX}, ${clientY});" >
              <button class="btn" option="newtab"><i></i><span>${langText.openNewTab}</span></button>
              ${btnOpenVscode}
            </div>
          </div>
        `;
    body.insertAdjacentHTML('beforeend', contextMenuMarkup);
    var contextMenuid = body.children["contextMenu"],
        overlayContextMenuCustom = contextMenuid.get('.overlayContextMenuCustom'),
        contextMenuCustom = contextMenuid.get('.contextMenuCustom');
        function contextMenuExit() {
          contextMenuid.remove();
        }


        contextMenuCustom.getAll('button.btn').forEach(e => {
          e.addEventListener('click', () => {
            var optionValue = e.attributes["option"].value;
            if(optionValue == 'newtab'){
              window.open(url, '_blank');
            } else if(optionValue == 'openinvscode'){
              dirProjectsLocal = (storageLocal.get()) ? storageLocal.get().dirprojects : ''
              vscodeUrl = 'vscode://file/'+dirProjectsLocal+filename
              window.open(vscodeUrl, ''); 
            }

            contextMenuExit()
          })
        })


        overlayContextMenuCustom.addEventListener('click', () => {contextMenuExit()}, false)
        window.addEventListener('scroll', function (e) {if(body.children["contextMenu"]){ log('scrol'), contextMenuExit()}}, true)
  }
  function init(event) {
    if (document.addEventListener) {
      event.addEventListener('contextmenu', function(e) {
        clientX = e.clientX + 'px';
        clientY = e.clientY + 'px';
        viewContextMenu(event, clientX, clientY);
        e.preventDefault();
      }, false);
    } else {
      event.attachEvent('oncontextmenu', function() {
        clientX = e.clientX + 'px';
        clientY = e.clientY + 'px';
        viewContextMenu(event, clientX, clientY);
        window.event.returnValue = false;
      });
    }
    
  }
  init(this);
}
function clipboard(textToCopy) {
  // navigator clipboard api needs a secure context (https)
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
const copy = (value) => {
  clipboard(value)
    .then(() => {
      oldnotify(langText.pcCopySuccess, {type:'info'})
    })
    .catch(err => {
      oldnotify(langText.pcCopyError, {type:'error'})
      console.error(err)
    })
}
function oldnotify(text, settings) {
  let body = document.body ?? document.documentElement;
  settings = settings ?? {};

  if(body){

    if(body.children["notify"]){body.children["notify"].remove()}

    body.insertAdjacentHTML('beforeend', `
      <div id="notify"><div class="message"><div class="text">${text}</div></div></div>
    `);

    const notify = body.children["notify"];

    var notifyScript= notify.getElementsByTagName("script");
    if(notifyScript){
      var scripts = notify.getElementsByTagName('script');
      Array.prototype.forEach.call (scripts, function (script) {
        var scriptText = script.innerText;

        var newScript = document.createElement('script');
            newScript.innerHTML = scriptText;
        script.parentElement.appendChild(newScript);
        script.remove();
      });
    }

    //functions
    function closeNotify(time) {
      var time = time ?? 2800;
      setTimeout(() => {
        notify.classList.remove('visible');
         setTimeout(() => {
          notify.remove();
        }, time + 100); 
      }, time); 
    }
    function openNotify() {
      notify.classList.add('visible');
    }
    //settings arr
    var position = settings['position'] ?? 'bottom';
    var autoClose = settings['autoClose'] ?? true;
    var color = settings['color'] ?? settings['type'] ?? 'linear-gradient(339deg, rgba(104,76,176,1) 0%, rgba(114,104,207,1) 100%)';
        if(color == 'error'){
          color = 'linear-gradient(339deg, rgba(210,84,84,1) 0%, rgba(235,97,97,1) 100%)'
        } else if(color == 'warning'){
          color = 'linear-gradient(339deg, rgba(194, 149, 62) 0%, rgba(248, 204, 81) 100%)'
        } else if(color == 'success'){
          color = 'linear-gradient(339deg, rgba(76,176,105,1) 0%, rgba(104,207,169,1) 100%)'
        } else if(color == 'info'){
          color = 'linear-gradient(339deg, rgba(52, 105, 210) 0%, rgba(116, 172, 230) 100%)'
        } 
    var confirmation = settings['confirmation'] ?? false;
    var lang = settings['lang'] ?? 'pt-br';

    var translate = {
      'pt-br':{
        'ok':'OK',
        'cancel':'Cancelar'
      },
      'es-us':{
        'ok':'OK',
        'cancel':'Cancel'
      }
    }

    //conditions
    if(confirmation) {
      notify
        .firstElementChild
        .insertAdjacentHTML('beforeend',`
          <div class="buttons">
            <div id="confirm">${translate[lang].ok}</div>
            <div id="cancel">${translate[lang].cancel}</div>
          </div>
        `);
      notify.style.maxHeight = 'inherit';
      autoClose = false;
      if(!settings['position']){position = 'top'};
      if(!settings['color'] && !settings['type']){color = 'linear-gradient(320deg, rgba(198,54,54,1) 0%, rgba(238,205,73,1) 100%)';}

      body.insertAdjacentHTML('beforeend', '<div id="notifyOverlay"></div>')
      var notifyOverlay = body.children["notifyOverlay"];

      var buttonConfirm = notify.querySelector('#confirm');
      var buttonCancel = notify.querySelector('#cancel');

      buttonConfirm.addEventListener('click', (e) => {
        (!isFunction(confirmation)) ? (console.error('Notify diz: O valor "'+confirmation+'" que você passou não é uma função. Informe o nome da sua função, Ex: {confirmation: NomeDaSuaFunção} sem parênteses "()."'),
        console.error('Notify says: The "'+confirmation+'" value you passed is not a function. Enter the name of your function, Eg: {confirmation:NameOfYourFunction} without parentheses "()."'))
        : confirmation()
        if(isFunction(confirmation)){closeNotify(0);notifyOverlay.remove();}
      })
      buttonCancel.addEventListener('click', (e) => {
        closeNotify(0);
        notifyOverlay.remove();
      })
      notifyOverlay.addEventListener('click', (e) => {
        notify.firstElementChild.style.animation='shake 0.82s cubic-bezier(.36,.07,.19,.97) both';
        setTimeout(() => {
          notify.firstElementChild.style.animation='';
        }, 500);
      })

    }
    if(position){
      position = position.split('->'); var attr = position[0], value = position[1] ?? '';
      notify.setAttribute(attr, value);

      notify.firstElementChild.style.animationName='notify'+attr;
    }
    if(color){
      notify.firstElementChild.style.background=color;
    }


    openNotify();
    if(autoClose){closeNotify()}

  } else {console.error('<body> ou <html> Não Localizado')}
  
} 
function newContextMenu(params) {
  var x = (params && params.event) ? params.event.clientX + 'px': '0', 
      y = (params && params.event) ? params.event.clientY + 'px' : '0', 
      doc = (params) ? params.document : document, 
      btn = (params) ? params.btn : '',
      options = (params) ? params.options : 'options not defined!', 
      func = (params) ? params.func : '';


    btn.classList.add('active')
    contextMenuMarkup = `
      <div id="contextMenu">
        <div class="overlayContextMenuCustom"></div>
        <div class="contextMenuCustom" style="transform: translate(${x}, ${y});" >
          ${options}
        </div>
      </div>
    `;
    doc.body.insertAdjacentHTML('beforeend', contextMenuMarkup);
    var contextMenuid = doc.body.children["contextMenu"],

    overlayContextMenuCustom = contextMenuid.querySelector('.overlayContextMenuCustom'),
    contextMenuCustom = contextMenuid.querySelector('.contextMenuCustom');

    function contextMenuExit() {
      contextMenuid.remove();
      btn.classList.remove('active')
    }
    contextMenuCustom.querySelectorAll('button.btn').forEach(e => {
      e.addEventListener('click', () => {
        contextMenuExit()
      })
    })
    if(func){func(contextMenuCustom)}


    overlayContextMenuCustom.addEventListener('click', () => {contextMenuExit()}, false)
    overlayContextMenuCustom.addEventListener('contextmenu', () => {contextMenuExit()}, false)
    window.addEventListener('scroll', function (e) {if(doc.body.children["contextMenu"]){contextMenuExit()}}, true)

}
function getRandom() {
  return Math.random();
}

function disableContextMenuDefault(){
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    }, false);
  } else {
    document.attachEvent('oncontextmenu', function() {
      window.event.returnValue = false;
    });
  }
}


//------------------------------------------------------------------------------//

 /*      for (var i = 0; i < 7; i++) {
        HTMLColorSolidSet += `
        <div class="font-box">
          <div class="font-box-header">
            <div class="font-name">Lorem Ipsum</div>
            <div class="font-author">Lipsum</div>
          </div>
          <div class="font-box-preview">
            <div class="font-preview-title">${fontPreview({retrn:'title'})}</div>
            <div class="font-preview-text">${fontPreview({retrn:'text'})}</div>
          </div>
          <div class="font-box-footer">
            <div class="btn fontfamily" title="Copiar font-family">{font-family}</div>
            <div class="btn link" title="Copiar <link>"><<span>link></div>
            <div class="btn import" title="Copiar @import">@import</div>
          </div>
        </div>
      `;
      }
       */






      
