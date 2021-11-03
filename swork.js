; (function () {

    'use strict';

//====================================================//
// LiveServer by ritwickdey on 
// https://github.com/ritwickdey/live-server-web-extension
//====================================================//

function sendMsgToAllContainPage(req, data) {
    chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {
                req: req,
                data: data
            });
        });
    });
}
  const liveServer = 'liveServer';

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (typeof msg !== 'object') return;
      if (msg.req === 'set-live-server-config') {

          chrome.storage.local.set({liveServer: msg.data}, () =>{});
          
          console.log(msg.data)
          sendMsgToAllContainPage('live-server-config-updated', msg.data);
      }
      else if (msg.req === 'get-live-server-config') {
         
          chrome.storage.local.get(function (result) {
              if (result[liveServer] != undefined) {
                  var data = result.liveServer
                  sendResponse(data); 
              }
            })           
      }

  });

})();