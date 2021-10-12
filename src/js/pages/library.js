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
        titleTab.default()
        selector.innerHTML=homeContentHTML //INSERT HTML


        //===================== FUNCTIONS ======================//

        //===================== SCRIPTS ======================//
    },
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
    about(params){
      var theme = (params.theme) ? params.theme : '', 
          langText = (params.lang) ? params.lang : '', 
          selector = params.selector ?? false,
          head = document.head,
          style = document.createElement('style'),
          namePage = 'about';
    
          //======================= HTML ========================// 
          //<div class=""></div>
          var pageContentHTML = `
            <div class="${namePage}-body">
              <div class="${namePage}-container">
                <h1>${langText.aboutText.p0}</h1>
                <p>${langText.aboutText.p1}</p>
                <p>${langText.aboutText.p2}</p>
                <p>${langText.aboutText.p3}</p>
                <p>${langText.aboutText.p4}</p>
                <h3>${langText.aboutText.p5}</h3>
                <div tab>${langText.aboutText.ps6}</div>
                <div break></div>
                <h1>${langText.aboutText.p7}</h1>
                <p>${langText.aboutText.p8}</p>
                <h3>${langText.aboutText.p9}</h3>
                <div tab>${langText.aboutText.ps10}</div>
              </div>

              <div class="video-preview">
                <h1 class="text-vertical">Extension Preview</h1>
                <div class="video">
                  <video src="./src/video/astronaut-preview.mp4" loop="true"></video>
                  <div class="controls">${icons.play}</div>                
                </div>
              </div>
            </div>
    
          `;
    
          //======================== CSS =======================//
          var css = `
            .${namePage}-body {
              overflow: scroll;
              width: 100%;
              height: 100%;
              position: relative;
            }
            .${namePage}-body .video-preview {
              display: flex;
              justify-items: center;
              align-items: center;
              justify-content: center;
              height: 100%;
            }
            .${namePage}-body .video-preview .text-vertical {
              writing-mode: vertical-lr;
              transform: scale(-1);
            }
            .${namePage}-body .video {
              position: relative;
              width: 86rem;
              display: flex;
              box-shadow: 0px 0px 10px 3px var(--bg-primary);
              border-radius: 0.4rem;
            }
            .${namePage}-body .video .controls {
              position: absolute;
              top: 0;
              width: 100%;
              height: 100%;
              background: #0000004d;
              border-radius: 0.4rem;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .${namePage}-body .video .controls svg {
              width: 5rem;
              height: 5rem;
              background: var(--bg-second);
              border-radius: 0.5rem;
              cursor: pointer;
              transition: ease 0.2s
            }
            .${namePage}-body .video .controls svg:hover {
              background: var(--bg-primary);
            }
            .${namePage}-body .video .controls.play {
              background: transparent;
              cursor: pointer;
            }
            .${namePage}-body .video .controls.play svg{
              opacity: 0
            }
            .${namePage}-body video {
              width: 100%;
              height: 100%;
              border-radius: 0.4rem;
            }
            .${namePage}-container {
              margin: 2rem 0 6rem 4rem;
              max-width: 70rem;
            }   
            .${namePage}-container a[author],
            .${namePage}-container a[opendoc] {
              cursor: pointer;
            }   
            .${namePage}-container [tab] {
              margin-left: 1rem;
            }   
            .${namePage}-container [break] {
              height: 1px;
              background: var(--bg-primary);
              margin: 2rem 0px;
            }  
            .${namePage}-container i[dot] {
              color: var(--bg-info-border);
            }  
            .${namePage}-container h3 {
              font-weight: normal;
              color: var(--link-primary);
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
          selector.querySelector('#new-page a[author]').addEventListener('click', () => {
            document.querySelector('nav .icons#author').click()
          })
          selector.querySelectorAll('#new-page a[opendoc]').forEach(e => {
            e.addEventListener('click', () => {
              var doc = e.getAttribute('opendoc')
              document.querySelector(`#list-items .item [data-id='${doc}']`).click()
            })
          });
          var play = false;
          selector.querySelector('#new-page .video-preview .controls').addEventListener('click', () => {
            if(!play){
              selector.querySelector('#new-page .video-preview video').play()
              selector.querySelector('#new-page .video-preview .controls').classList.add('play')
              play = true
            } else {
              selector.querySelector('#new-page .video-preview video').pause()
              selector.querySelector('#new-page .video-preview .controls').classList.remove('play')
              play = false
            }
          })
      
    },
    download(params){
      var theme = (params.theme) ? params.theme : '', 
          langText = (params.lang) ? params.lang : '', 
          selector = params.selector ?? false,
          head = document.head,
          style = document.createElement('style'),
          namePage = 'download';
    
          //======================= HTML ========================// 
          //<div class=""></div>
          var pageContentHTML = `
            <div class="${namePage}-body space">
            download
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
