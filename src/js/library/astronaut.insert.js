//---------------------------------------------------------------------------//
//                    Astronaut Library.js - Insert v1.0                     //
// License: MIT                                                              //
// Author: André Malveira.                                                   //
// Github: https://github.com/andremalveira                                  //
// Docs:   https://astlibjs.ga/?docs=insert                                  //
//---------------------------------------------------------------------------//


let __insert = {
  $library:'Insert',
  $version: '1.0',
  $webSite: 'https://astlibjs.ga?docs=insert',
  $shortName: 'astlibjs',
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
    },
    script(script, id){
      newDiv = document.createElement('div'), 
      newScript = document.createElement('script');
      newScript.id = id
      newDiv.id ="scripts_inserted"
      newScript.textContent = script

      if(document.querySelector('#scripts_inserted')){
        var scriptag = scripts_inserted.querySelector(`script#${id}`)
        if(!scriptag || scriptag.textContent != script){
          if(scriptag) scriptag.remove()
          scripts_inserted.appendChild(newScript)
        }
      } else {
        document.body.appendChild(newDiv)
        scripts_inserted.appendChild(newScript)
      }
    }
  }
}

var howtouse='call the function this way: astronaut.insert({})'
try{$astronautType
try{original=astronaut
astronaut='anything';astronaut=original;}catch(err){console.log(`%cIt looks like you already have the full astronaut library in your project, to avoid mistakes, if you are not using the full library and you only want to use a specific library, remove the full library! 🤔 `,` color: #71b9ec;background-color: #053c63;padding: 0.3rem 1.8rem 0.3rem 0.3rem;
font-size:0.8rem;border-radius:0.2rem;border: solid 1px #1667a0;
    `);__insert=howtouse}}catch(error){if(typeof astronaut==='undefined'){window.astronaut=__insert;window.ast=__insert;window.astlibjs=__insert;
__insert=howtouse}else{astronaut=Object.assign(astronaut,__insert);__insert=howtouse}}





