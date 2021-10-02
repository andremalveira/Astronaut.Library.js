function notFound(params) {

  var theme = (params.theme) ? params.theme : '', 
      langText = (params.lang) ? params.lang : '', 
      selector = params.selector ?? false,
      error = params.error ?? false, 
      errorNumber = error.number ?? '',
      errorText = error.text ?? '',
      head = document.head,
      style = document.createElement('style');


      //======================= HTML ========================// 
      //<div class=""></div>
        var errorContentHTML = `
        <div class="error-body space">
          <div class="astronaut">
            <div class="home-stars"><div class="small"></div><div class="medium"></div><div class="big"></div></div>
            <div class="astronaut_wandering"><img class="home-astronaut astronaut_spin" src="./src/img/astronaut-lost.svg"></div>
            <div class="error-number">${errorNumber}</div>
            <div class="error-text">${errorText}</div>
            <div class="svg bg home-background"></div>
          </div>

        </div>
      `;

      //======================== CSS =======================//
      var css = `
        .error-body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        .error-body .astronaut .astronaut_wandering  {
          position: absolute;
          top: 15rem;
        }
        .error-body .astronaut img.home-astronaut  {
          width: 10rem;
          height: 10rem;
        }
        .error-number {
          font-size: 10rem;
        }
        .error-text {
          font-size: 1.8rem;
        }
        
      }

        
      `;

      //=============== INITIAL EXECUTABLES ===============//
      style.id='error-css'
      style.textContent = css;
      if(!head.querySelector('style#error-css')){
        head.appendChild(style) //INSERT CSS
      }
      head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="src/css/default.css">')
      head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="src/css/palleteColor.css">')
      selector.setAttribute('themecolor', theme)
      selector.innerHTML=errorContentHTML //INSERT HTML


      //===================== FUNCTIONS ======================//

      function disableContextMenuDefault(){
        if (document.addEventListener) {
          document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
          }, false);
        } else {
          document.attachEvent('oncontextmenu', function() {
            window.event.returnValue = false;
          });
        }
      }disableContextMenuDefault()
      //===================== SCRIPTS ======================//
      
 
}
