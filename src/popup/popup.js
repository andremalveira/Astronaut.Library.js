; (function () {
    'use strict';

    disableContextMenuDefault()
    setTimeout(() => {
        document.querySelector('#url').classList.add('fadeonleft')
    }, 300);

    var toggleCheck = true, 
        btnToggle = document.getElementById('btnToggle'),
        idforstrglcal = 'statusExtension'; // name in storageLocal

    //Actions button toggle
    const toggle = {
        on(){ // toggle on
            document.querySelector('label').setAttribute('checked','')
            storageLocal.set(idforstrglcal,'enabled')
            sentMessage('status-extension', true);
        },
        off(){ // toggle off
            document.querySelector('label').removeAttribute('checked')
            storageLocal.set(idforstrglcal,'disabled')
            sentMessage('status-extension', false);
        },
        check(){ // toggle check
            if(toggleCheck){this.off();toggleCheck = false}
            else {this.on();toggleCheck = true}
        }
    }
    
    //Comunication between popup and content
    const sentMessage = (req, data) => {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, {
                req: req,
                data: data
            });
        });
    }


    btnToggle.addEventListener('click', () => {toggle.check()}) //action click in toggle
    // check in storageLocal if it is enabled 
    var statusExtension = storageLocal.get(idforstrglcal)
    if(statusExtension == 'disabled'){
        document.querySelector('label').removeAttribute('checked')
        toggleCheck = false
    } 


})();