//---------------------------------------------------------------------------//
//                    Astronaut Library.js - Table v1.0                      //
// License: MIT                                                              //
// Author: André Malveira.                                                   //
// Github: https://github.com/andremalveira                                  //
// Docs:   https://astlibjs.ga/?docs=table                                   //
//---------------------------------------------------------------------------//

let table = {
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
  table(params) {
    var selector  = (params.selector)   ? params.selector   : false,
        thead     = (params.thead)      ? params.thead      : false,
        tbody     = (params.tbody)      ? params.tbody      : false,
        s         = (params.style)      ? params.style      : false,

        fontSize      = (s && s.fontSize)             ? s.fontSize           : false,
        theadColor    = (s && s.theadColor)           ? s.theadColor         : false,
        tbodyColor    = (s && s.tbodyColor)           ? s.tbodyColor         : false,
        theadBg       = (s && s.theadBackground)      ? s.theadBackground    : false,
        tbodyBg       = (s && s.tbodyBackground)      ? s.tbodyBackground    : false,
        blur          = (s && s.blur)                 ? s.blur               : false,
        borderInside  = (s && s.borderInside)         ? s.borderInside       : false,
        borderOutside = (s && s.borderOutside)        ? s.borderOutside      : false,
        borderRadius  = (s && s.borderRadius)         ? s.borderRadius       : false,
        boxShadow     = (s && s.boxShadow)            ? s.boxShadow          : false,
        trowHover     = (s && s.trowHover)            ? s.trowHover          : false,
        theadHTML     = '', tbodyHTML = '',
        borderInSize    = '1px',borderInX = true, borderInY = true, borderInColor = '#1f262b';

      if(borderInside){
       var borderray = s.borderInside.split(' ');
           borderInSize = (borderray[0] && borderray[0] != 'default') ? borderray[0] : borderInSize;
           borderInColor = (borderray[1] && borderray[1] != 'default') ? borderray[1] : borderInColor;
           borderInX = (borderray[2] && borderray[2] === 'false' && borderray[2] != 'true') ? false : borderInX
           borderInY = (borderray[3] && borderray[3] === 'false' && borderray[3] != 'true') ? false : borderInY
      }
      if(borderOutside){
        var borderOutrray = s.borderOutside.split(' '),
            borderOutSize = (borderOutrray[0]) ? borderOutrray[0] : '',
            borderOutColor = (borderOutrray[1]) ? borderOutrray[1] : 'currentColor';
       }


    this.insert.css(`
/*Astronaut Library.js - Table*/
.ast-table  {
  margin: 0.5rem 0;
  overflow: hidden;
  border-radius: 0.6rem;
  color: #939da5;
}
.ast-table table {
  width: 100%;
  border-spacing: 0;
  background: #232A2F;
}
.ast-table thead {
  background: #1a202363;
}
.ast-table :is(th, td) {
  text-align: left;
  padding: 0.4rem 0.8rem;
  height: 1.5rem;
  font-weight: normal;
}
.ast-table :is(th, td):last-child {
  border-right: none!important;
}
.ast-table tr:last-child :is(td) {
  border-bottom: none!important;
}
.ast-table :is(td) a {
  position: relative;
  color: #539bf5;
}
.ast-table :is(td) a:hover {
  text-decoration: underline;
}
.ast-table :is(td) a::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
}

.ast-table tr {
  height: 2rem;
}
.ast-table [fira] {
  font-family: Fira Code, 'system-ui';
}
.ast-table [attr] {
  color: #9cdcfe;
}
.ast-table [boolean] {
  color: #36a3f0!important;
}
.ast-table [text] {
  color: #ce915b;
}
.ast-table [number] {
  color: #94cea8;
}
.ast-table [obj] {
  color: #4ec9b0;
}
.ast-table [opacity] {
  opacity: 0.6;
}
      `, 'table')

    function tableHTML(params) { 
      var thead = (params.thead) ? params.thead : false,
          tbody = (params.tbody) ? params.tbody : false;
      return `
        <div class="ast-table" 
        ${(borderRadius || blur || borderOutside || fontSize || boxShadow) ? `style="
        ${(blur) ? `backdrop-filter:blur(${blur});` : ''} 
        ${(borderOutside) ? `border: solid ${borderOutSize} ${borderOutColor};`: ''}
        ${(borderRadius) ? `border-radius: ${borderRadius};` : ''}
        ${(fontSize) ? `font-size: ${fontSize};` : ''}
        ${(boxShadow) ? `box-shadow: ${boxShadow};` : ''}
        "`: ''}
        >
          <table ${(blur) ? `style="background:#232a2f73;"` : ''}>
            <thead ${(theadBg || theadColor) ? `style="${(theadBg) ? `background:${theadBg};` : ''} ${(theadColor) ? `color:${theadColor}` : ''} "` : ''}>
              ${thead}
            </thead>
            <tbody ${(tbodyBg || tbodyColor) ? `style="${(tbodyBg) ? `background:${tbodyBg};` : ''} ${(tbodyColor) ? `color:${tbodyColor}` : ''} "` : ''}>
              ${tbody}
            </tbody>
          </table>
        </div>
      `
    }

    thead.forEach(th => {
      var prop = '';

      if(th.includes('->')){
        var thOld = th,
            param = th.split('->')[1].trim();

        if(param != ''){
          if(param.includes('width:') || param.includes('class:') || param.includes('attr:')){
            var name = param.split(':')[0],
                value = param.split(':')[1];
            if(name == 'width'){
              prop = `style="width:${value};"`
            } else if(name == 'class') {
              prop = `class="${value}"`
            } else if(name == 'attr') {
              prop = `${value}`
            }

          } else {
            console.error(`💔 ${astronaut.name}.table()! Error in the parameter entered in '${thOld}', the parameter '${param.split(':')[0]}' is not color: `)
          }
        }
        th = th.split('->')[0].trim()

      }
      theadHTML += `<th 
      ${
        (borderInside) ? `style="
        ${(borderInX) ? `border-bottom: solid ${borderInSize} ${borderInColor};` : ''} 
        ${(borderInY) ? `border-right: solid ${borderInSize} ${borderInColor};` : ''}"` : ''
      }
      ${prop} >${th}</th>\n`
    });

    tbody.forEach(tr => {
      var tdHTML = '';

      tr.forEach(td => {
        var prop = '';

        if(td.includes('->')){
          var tdOld = td,
              param = td.split('->')[1].trim();

          if(param != ''){
            if(param.includes('color:') || param.includes('class:') || param.includes('attr:')){
              var name = param.split(':')[0],
                  value = param.split(':')[1];
              if(name == 'color'){
                prop = `style="color:${value};"`
              } else if(name == 'class') {
                prop = `class="${value}"`
              } else if(name == 'attr') {
                prop = `${value}`
              }

            } else {
              console.error(`💔 ${astronaut.name}.table()! Error in the parameter entered in '${tdOld}', the parameter '${param.split(':')[0]}' is not color: `)
            }
          }
          td = td.split('->')[0].trim()

        }

        tdHTML += `<td
        ${
          (borderInside) ? `style="
          ${(borderInX) ? `border-bottom: solid ${borderInSize} ${borderInColor};` : ''} 
          ${(borderInY) ? `border-right: solid ${borderInSize} ${borderInColor};` : ''}"` : ''
        }
        ${prop}>${td}</td>\n`
      });
      tbodyHTML += `<tr>\n${tdHTML}</tr>\n`
    });

    var newTable = tableHTML({
      thead: theadHTML,
      tbody: tbodyHTML
    })

    
    if(selector){
      if(selector.constructor.name == 'String') {selector = document.querySelector(selector)}
      selector.innerHTML = newTable;
    } else {console.error('Astronaut.table(), selector: not defined!')}
    
    if(trowHover){
      var trowHoverArray = trowHover.split(' '),
          trowHoverColor = trowHoverArray[0],
          trowHoverTime = trowHoverArray[1];

      selector.querySelectorAll('.ast-table table tbody tr').forEach(e => {
        e.addEventListener('mouseover', () => {
          e.style.transition=`ease ${(trowHoverTime) ? trowHoverTime : '0.2s'}`
          e.style.background=`${(trowHoverColor) ? trowHoverColor : ''}`
        })
        e.addEventListener('mouseout', () => {
          e.style.transition=``
          e.style.background=``
        })
      })
    }
  }
}

var howtouse = 'call the function this way: astronaut.table({})'
try{$astronautType
try{original=astronaut
astronaut='anything';astronaut=original;}catch(err){console.log(`%cIt looks like you already have the full astronaut library in your project, to avoid mistakes, if you are not using the full library and you only want to use a specific library, remove the full library! 🤔 `,` color: #ff8080;background-color: #290000;padding: 0.3rem 1.8rem 0.3rem 0.3rem;
    font-size:0.8rem;border-radius:0.2rem;border: solid 1px #5c0000;
    `);table=howtouse}}catch(error){if(typeof astronaut==='undefined'){window.astronaut=table;window.ast=notify;window.astlibjs=notify
table=howtouse}else{astronaut=Object.assign(astronaut,table);table=howtouse}}




