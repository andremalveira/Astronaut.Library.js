const docs = {
  extension(params){
    var theme = (params.theme) ? params.theme : '', 
    langText = (params.lang) ? params.lang : '', 
    selector = params.selector ?? false,
    head = document.head,
    style = document.createElement('style'),
    namePage = 'extension';

    //======================= HTML ========================// 
    //<div class=""></div>
    var pageContentHTML = `
      <div class="${namePage}-body">
      <div class="${namePage}-container">
        <h1>extension</h1>
        <p>Astronaut Library .js</p>
      </div>
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
      .${namePage}-container {
        max-width: 30rem;
      }   
      
    `;

    //=============== INITIAL EXECUTABLES ===============//
    style.id=`${namePage}-css`
    style.textContent = css;
    if(!head.get(`style#${namePage}-css`)){
      head.appendChild(style) //INSERT CSS
    }
    titleTab.change(namePage)
    selector.innerHTML=pageContentHTML //INSERT HTML


    //===================== FUNCTIONS ======================//

    //===================== SCRIPTS ======================//
    

  },
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
      titleTab.change(namePage)
      selector.innerHTML=pageContentHTML //INSERT HTML


      //===================== FUNCTIONS ======================//

      //===================== SCRIPTS ======================//
      
  
  }
}