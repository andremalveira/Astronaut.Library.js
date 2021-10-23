//---------------------------------------------------//
//           Astronaut Library.js - Table            //
//                                                   //
// Author: André Malveira.                           //
// Github: https://github.com/andremalveira          //
// Site:   https://andremalveira.github.io/astronaut //
//---------------------------------------------------//

/*

  astronaut.table({
    selector: selector.querySelector(`.${namePage}-table`),
    thead:['Option','Type',	'Values',	'Default',	'Description'],
    tbody:[ 
      ['message -> attr:attr',	"'string' -> attr:text",	'You Text',	'Empty',	'Mensagem que deseja mostrar']
    ]
  })
*/


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

        fontColor     = (s && s.fontColor)      ? s.fontColor     : false,
        theadColor    = (s && s.theadColor)     ? s.theadColor    : false,
        tbodyColor    = (s && s.tbodyColor)     ? s.tbodyColor    : false,
        blur          = (s && s.blur)           ? s.blur          : false,
        border        = (s && s.border == false)? s.border        : true,
        borderRight   = (s && s.borderRight == false) ? s.borderRight        : true,
        borderBottom  = (s && s.borderBottom == false)? s.borderBottom       : true,
        blur          = (s && s.blur)           ? s.blur          : false,
        borderColor   = (s && s.borderColor && border) ? `style="
        ${(borderRight) ? `border-right: solid 1px ${s.borderColor};` : ''} 
        ${(borderBottom) ? `border-bottom: solid 1px ${s.borderColor};` : ''}"` : '',
        borderNone = (!border) ? 'style="border:none;"' : '',
        theadHTML = '', 
        tbodyHTML = '' ;

    this.insert.css(`
/*Astronaut Library.js - Table*/
.ast-table  {
  margin: 0.5rem 0;
  overflow: hidden;
  border-radius: 0.6rem;
  font-size: 0.9rem;
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
  ${(border && borderRight) ? 'border-right: solid 1px #1f262b;' : ''}
  ${(border && borderBottom) ? 'border-bottom: solid 1px #1f262b;' : ''}
}
.ast-table :is(th, td):last-child {
  border-right: none!important;
}
.ast-table tr:last-child :is(th, td) {
  border-bottom: none!important;
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
        <div class="ast-table" style="${(fontColor) ? `color:${fontColor};` : ''} ${(blur) ? `backdrop-filter:blur(${blur});` : ''}" >
          <table ${(blur) ? `style="background:#232a2f73;"` : ''}>
            <thead ${(theadColor) ? `style="background:${theadColor};"` : ''}>
              ${thead}
            </thead>
            <tbody ${(tbodyColor) ? `style="background:${tbodyColor};"` : ''}>
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
      theadHTML += `<th ${borderColor} ${borderNone} ${prop} >${th}</th>\n`
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

        tdHTML += `<td ${borderColor} ${borderNone} ${prop}>${td}</td>\n`
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
    }
  }
}

var howtouse = 'call the function this way: astronaut.table({})'
try{$astronautType
try{original=astronaut
astronaut='anything';astronaut=original;console.log('is var')}catch(err){console.log(`%cIt looks like you already have the full astronaut library in your project, to avoid mistakes, if you are not using the full library and you only want to use a specific library, remove the full library! 🤔 `,` color: #ff8080;background-color: #290000;padding: 0.3rem 1.8rem 0.3rem 0.3rem;
    font-size:0.8rem;border-radius:0.2rem;border: solid 1px #5c0000;
    `);table=howtouse}}catch(error){if(typeof astronaut==='undefined'){window.astronaut=table
table=howtouse}else{astronaut=Object.assign(astronaut,table);table=howtouse}}




