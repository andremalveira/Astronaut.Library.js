//====================================================//
// by ritwickdey on 
// https://github.com/ritwickdey/live-server-web-extension
// mod by andremalveira on 
// https://github.com/andremalveira/
//====================================================//



const liveReload = {
    apache(SSPLiveServer, notify){
        'use strict';
        var viewMessage = true

        GET_ALL('[window] iframe').forEach( iframe => {

            var window = iframe.contentWindow
            const protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
            let address = protocol + window.location.host + window.location.pathname + '/ws';
            let socket;
            let isActive = false;
    
            function init(data) {
                if (!data.proxySetup) {
                    //Correction
                    if (data.liveServerUrl.indexOf('http') !== 0)
                        data.liveServerUrl = 'http' + data.liveServerUrl;
                    if (data.actualUrl.indexOf('http') !== 0)
                        data.actualUrl = 'http' + data.actualUrl;
                    if (!data.actualUrl.endsWith('/'))
                        data.actualUrl = data.actualUrl + '/';
    
                    address = data.liveServerUrl.replace('http', 'ws') + '/ws';
                }
    
                var stliveServer = storageLocal.get('liveServer')
                if (stliveServer) {
                    if (stliveServer.liveServerUrl == '') {
                        astronaut.notify({
                            message: `${langText.liveServerAddressEmpty} -> ${langText.accessConsole}`,
                            icon: icons.broadcast,
                            style: ASTRONAUT_NOTIFY_SETTINGS_DEFAULT,
                            type: 'error',
                        })
                        console.error(`ASTRONAUT: ${langText.liveServerAddressEmpty}`);
                        console.warn(`ASTRONAUT: ${langText.liveServerInformAddress}`)
                        console.warn(
                            `%c.`,
                            ` 
                                background: url(${getImage('others/address-live-server.png')});
                                background-size: contain;
                                background-position: center;
                                background-repeat: no-repeat;
                                padding: 0rem 16rem 4rem 0rem;
                                font-size:0.7rem;border-radius:0.2rem;
                            `);
                        liveServer.isEnabled.enable('error')
                    }
                }
    
                socket = new WebSocket(address);
          
                socket.onerror = function (event) {
                    astronaut.notify({
                        message: `${langText.liveServerFailed} -> ${langText.accessConsole}`,
                        icon: icons.broadcast,
                        style: ASTRONAUT_NOTIFY_SETTINGS_DEFAULT,
                        type: 'error',
                    })
                    console.error(`ASTRONAUT: ${langText.liveServerFailed}, ${stliveServer.liveServerUrl}`);
                    console.warn(
                        `%cASTRONAUT: ${langText.liveServerFailedWarn}`,
                        ` 
                            background: url(${getImage('others/go-live.png')});
                            background-size: contain;
                            background-position: center;
                            background-repeat: no-repeat;
                            padding: 0.5rem 2rem 3rem 0.5rem;
                            font-size:0.7rem;border-radius:0.2rem;
                            `);
                    liveServer.isEnabled.enable('error', 'liveServer')
                };
    
                socket.onmessage = (msg) => {
                    reloadWindow(msg, data)
                };
          
       
            }
    
            function reloadWindow(msg, data) {
                if (!isActive) return;
                const currentUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
                if (msg.data == 'reload' || msg.data == 'refreshcss') {
                    if (data.proxySetup === true || (data.proxySetup === false && currentUrl.startsWith(data.actualUrl))) {
                        window.location.reload();
                    }
                }
                logMsgForASingleTime();
            };
    
            function logMsgForASingleTime() {
                const key = 'oneTimeLog-live-server-web-extesion';
                if (!sessionStorage.getItem(key)) {
                    if(viewMessage){
                        viewMessage = false
                        astronaut.notify({
                            message: `${langText.liveServerEnabled}`,
                            icon: icons.broadcast,
                            style: ASTRONAUT_NOTIFY_SETTINGS_DEFAULT,
                            autoClose: 3000
                        })
                        liveServer.isEnabled.check()
        
                    }
                    sessionStorage.setItem(key, 1);
                }
               

            }
    
            chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
                if (typeof msg !== 'object') return;
                if (msg.req === 'live-server-config-updated') {
                    isActive = msg.data.isEnable;
                    if (isActive && !socket) {
                        init(msg.data);
                    }
                }
            });
    
            chrome.runtime.sendMessage({
                req: 'get-live-server-config'
            }, (data) => {
                isActive = SSPLiveServer.isEnable;
                if (isActive && !socket) {
                    init(SSPLiveServer);
                }
    
            });

        })

    },
    liveServer(){
        setTimeout(() => {
            parent.document.querySelectorAll('[window] iframe').forEach(iframe => {
                var window = iframe.contentWindow, document = iframe.contentWindow.document;
                (function () {
                    function refreshCSS() {
                        var sheets = [].slice.call(document.getElementsByTagName("link"));
                        var head = document.getElementsByTagName("head")[0];
                        for (var i = 0; i < sheets.length; ++i) {
                            var elem = sheets[i];
                            var parent = elem.parentElement || head;
                            parent.removeChild(elem);
                            var rel = elem.rel;
                            if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                                var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                                elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                            }
                            parent.appendChild(elem);
                        }
                    }
                    var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
                    var address = protocol + window.location.host + window.location.pathname + '/ws';
                    var socket = new WebSocket(address);
                    socket.onmessage = function (msg) {
                        if (msg.data == 'reload') window.location.reload();
                        else if (msg.data == 'refreshcss') refreshCSS();
                    };
                    if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
                        console.log('Live reload enabled.');
                        sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
                    }
                })();
                }
            )
        }, 3000);
    }
}
