function messageStartedInConsole(){console.log("%c 👨🏿‍🚀 Astronaut - Custom Localhost Started! 👨🏿‍🚀"," color: #adbac7; \n      background-size: contain;\n      background-position: right; \n      padding: 0.3rem 1.8rem 0.3rem 0.3rem;\n      font-size:1rem;\n    ")}
var isAstExt = storageLocal.get('isAstExt') ;
isAstExt = (isAstExt == undefined || isAstExt == true) 
? true  : false

if(!DOCUMENT_MAIN){
  
  if(FRAME_MAIN){
    titleTab.update()
  }   
  if(FRAME_MAIN || FRAME_MIRROR){
    metaThemeColorMobile.update()
  }   

  //focus in window main when ctrl is pressed
  keypress.down({
    key: 17,func: () => {parent.window.focus()}
  })
  
}


window.addEventListener('load', () => {
  if(isAstExt) enableRefreshWindows()
  if(DOCUMENT_MAIN && PATHNAME_EMPTY){
    storageLocal.update()
    if(isAstExt){
      ASTRONAUT_LOCALHOST.build()
    } 
    chrome.runtime.onMessage.addListener((msg) => {
      if (typeof msg !== 'object') return;
      if (msg.req === 'status-extension') {
        if(msg.data){
          ASTRONAUT_LOCALHOST.build()
        } else {
          storageLocal.update()
          location.reload()
        }
      }
    }); 
  }  

})
 









