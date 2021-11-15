  const page = {
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
/*         if(!head.querySelector('style#home-css')){
          head.appendChild(style) //INSERT CSS
        } */
        titleTab.default()
        selector.innerHTML=homeContentHTML //INSERT HTML


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
                <h3>${langText.aboutText.p5}</h3>
                <div tab>${langText.aboutText.ps6}</div>
                <div break></div>
                <h1>${langText.aboutText.p7}</h1>
                <p>${langText.aboutText.p8}</p>

                <div tab>${langText.aboutText.ps10}</div>
              </div>

              <div id="extension-preview" class="video-preview">
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
              overflow-x: hidden;
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
    downloads(params){
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
              <div class="${namePage}-container extension">
                <i>${icons.box}</i>
                <div class="center">
                  <h3>Astronaut Extension</h3>
                  <h5>Custom Localhost</h5>
                </div>
                <a class="btn">Download</a>
                <div class="footer">    
                  <div class="compatibilities">
                    <i yes title="Google Chrome">${icons.chrome}</i>
                    <i yes title="Opera">${icons.opera}</i>
                    <i yes title="Microsoft Edge">${icons.edge}</i>
                    <i not title="Mozilla Firefox">${icons.firefox}</i>
                    <i not title="Safari">${icons.safari}</i>
                  </div>      
                </div>
              </div>
              <div class="${namePage}-container library">
                <i>${icons.braces}</i>
                <div class="center">
                  <h3>Astronaut Library.js</h3>
                  <h5>Complete</h5>
                </div>
                <a href="${DOMINIO_MAIN}/${REPO}/src/download/astronaut.library.zip" download class="btn" >Download Zip</a>
                <div class="footer">
                  <div class="links">
                    <div data-copy="${DOMINIO_MAIN}/cdnjs">${icons.link} ${langText.copy} Link</div>
                    <div data-copy="<script src='${DOMINIO_MAIN}/cdnjs'></script>">${icons.slash} ${langText.copy} Script Tag</div>
                  </div>
                </div>
              </div>
            
     
              <div class="astronaut">
                <div class="home-stars"><div class="small"></div><div class="medium"></div><div class="big"></div></div>
                <img class="home-astronaut jumping" style="position: absolute;top: 4rem;" 
                src="./src/img/svg/astronaut-coffe.svg">
                <div class="svg bg home-background"></div>
                <div class="svg bg home-planet"></div>
              </div>
            </div>
          `;
    
          //======================== CSS =======================//
          var css = `
            .${namePage}-body {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 5rem;
              width: 100%;
              height: 100%;
            }
            .${namePage}-container {
              display: flex;
              gap: 1rem;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 1rem;
              height: 22rem;
              width: 20rem;
              border-radius: 0.5rem;
              background: var(--btn-primary);
              box-shadow: 0px 0px 20px -7px var(--bg-primary);
              transition: ease 0.3s;
              margin-top: 10rem;
              position: relative;
            } 
            .${namePage}-container .footer {
              height: 3rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            } 

            .${namePage}-container i svg {
              width: 5rem;
              height: 5rem;
            } 
            .${namePage}-container .center {
              text-align: center;
            }
            .${namePage}-container h3 {
              font-weight: normal;
              color: var(--link-primary);
              margin: 0;
            } 
            .${namePage}-container h5 {
              font-weight: normal;
              margin: 0;
              opacity: 0.5;
            } 
            .${namePage}-container a.btn {
              padding: 0.4rem 1.5rem;
              border-radius: 0.3rem;
              background: var(--btn-second-hover);
              color: #cad7e5;
              border: solid 0.01rem var(--btn-second-border-hover);
              cursor: pointer;
              transition: ease 0.2s;
            } 
            .${namePage}-container a.btn:hover {
              background: var(--btn-second);
            } 
            .${namePage}-container .links {
              display: flex;
              gap: 1rem;
              justify-content: center;
              align-items: center;
            } 
            .${namePage}-container .compatibilities  {
              display: flex;
              gap: 1rem;
              justify-content: center;
              align-items: center;
            } 
            .${namePage}-container .compatibilities i {
              display: flex;
              position: relative;
              font-style: normal;
            } 
            .${namePage}-container .compatibilities i[not]::before {
              content: '✖';
              color: var(--btn-third-border);
            } 
            .${namePage}-container .compatibilities i[yes]::before {
              content: '✔';
              color: var(--btn-second-border-hover);
            } 
            .${namePage}-container .compatibilities i[not]::before,
            .${namePage}-container .compatibilities i[yes]::before  {
              position: absolute;
              width: 100%;
              height: 100%;
              font-size: 1.3rem;
              font-size: 1rem;
              right: -15px;
              bottom: -5px;
            } 
            .${namePage}-container .compatibilities i svg {
              width: 1.3rem;
              height: 1.3rem;
            } 
            .${namePage}-container .links div {
              display: flex;
              gap: 0.3rem;
              justify-content: center;
              align-items: center;
              padding: 0.3rem 0.6rem;
              background: var(--btn-primary);
              border: solid 1px var(--btn-primary-hover);
              border-radius: 0.2rem;
              font-size: 0.8rem;
              cursor: pointer;
              transition: ease 0.2s;
            } 
            .${namePage}-container .links div:hover {
              background: var(--btn-primary-hover);
              border: solid 1px var(--btn-primary);
            } 
            .${namePage}-container .links svg {
              width: 1.1rem;
              height: 1.1rem;
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
          selector.querySelectorAll('#new-page [data-copy]').forEach(e => {
            e.addEventListener('click', () => {
              var copyValue = e.dataset.copy
              copy(copyValue)
            })
          })
          
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
          <p>Astronaut Library.js is a small library with useful resources for developers created by André Malveira.

          Developed entirely in Pure Javascript, the library was primarily created as a browser extension to customize the default "localhost" environment of Apache, Wamp and Xampp servers.
          
          The extension would just change the default parsing of localhost, but as the process progressed I came up with new ideas that could be useful for application development, like having the project view in the same tab as localhost keeping the list of other projects while side, but of course not only with that, but with other tools. </p>
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
  }
