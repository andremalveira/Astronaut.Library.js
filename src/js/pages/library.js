  const library = {
    home(params) {

    var theme = (params.theme) ? params.theme : '', 
        langText = (params.lang) ? params.lang : '', 
        selector = params.selector ?? false,
        head = document.head,
        style = document.createElement('style');


        //======================= HTML ========================// 
        //<div class=""></div>
          var homeContentHTML = `
          <div class="home-body space">
            <div class="astronaut">
              <div class="home-stars"><div class="small"></div><div class="medium"></div><div class="big"></div></div>
              <img class="home-astronaut jumping" src="./src/img/svg/astronaut-hi.svg">
              <div class="svg bg home-background"></div>
              <div class="svg bg home-planet"></div>
              <div class="home-name"></div>
            </div>
          </div>
        `;

        //======================== CSS =======================//
        var css = `

          .space .astronaut {
            flex-direction: column;
          }
          .home-name {
            width: 30rem;
            height: 5rem;
            background-image: url(src/img/svg/astronaut-name.svg);
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            color: #adbac7;
          }
          .space .svg {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          .space .bg {
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
          .home-background {
            background-image: url(src/img/svg/astronaut-bg.svg);
            z-index: -2;
          }
          .home-planet {
            background-image: url(src/img/svg/astronaut-planet.svg);
            z-index: -1;
            transition: all 5s linear;
            animation: fall 10s cubic-bezier(0.75, -0.5, 0, 1.75), jumping 10s infinite ease;
          }
        }

          
        `;

        //=============== INITIAL EXECUTABLES ===============//
        style.id='home-css'
        style.textContent = css;
        if(!head.querySelector('style#home-css')){
          head.appendChild(style) //INSERT CSS
        }

        selector.innerHTML=homeContentHTML //INSERT HTML


        //===================== FUNCTIONS ======================//

        //===================== SCRIPTS ======================//
    }   

  }
