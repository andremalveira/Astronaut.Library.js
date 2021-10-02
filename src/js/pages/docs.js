const docs = {
  notify(params){
  var theme = (params.theme) ? params.theme : '', 
      langText = (params.lang) ? params.lang : '', 
      selector = params.selector ?? false,
      head = document.head,
      style = document.createElement('style'),
      namePage = 'notify';

      //======================= HTML ========================// 
      //<div class=""></div>
      var pageContentHTML = `
        <div class="${namePage}-body space">
        </div>
      `;

      //======================== CSS =======================//
      var css = `
        .${namePage}-body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
       
      }

        
      `;

      //=============== INITIAL EXECUTABLES ===============//
      style.id=`${namePage}-css`
      style.textContent = css;
      if(!head.get(`style#${namePage}-css`)){
        head.appendChild(style) //INSERT CSS
      }

      selector.innerHTML=pageContentHTML //INSERT HTML


      //===================== FUNCTIONS ======================//

      //===================== SCRIPTS ======================//
      
  
    }
    

}