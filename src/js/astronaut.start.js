function messageStartedInConsole(){console.log("%c 👨🏿‍🚀 Astronaut - Custom Localhost Started! 👨🏿‍🚀"," color: #adbac7; \n      background-size: contain;\n      background-position: right; \n      padding: 0.3rem 1.8rem 0.3rem 0.3rem;\n      font-size:1rem;\n    ")}


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
  //F5 - update all iframes
    keypress.down({
      key: 116,
      func: () => {
        var layout = document.querySelector('#layout')
        layout = (layout)
          ? layout
          : parent.document.querySelector('#layout')

        layout.querySelectorAll('[window] iframe').forEach(iframe => {
          console.clear()
          iframe.contentWindow.location.reload()
        })
      }
    })
  if(DOCUMENT_MAIN && PATHNAME_EMPTY){
    storageLocal.update()
    var statusExtension = storageLocal.get('statusExtension')
    if(statusExtension == undefined || statusExtension == 'enabled'){
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
 









