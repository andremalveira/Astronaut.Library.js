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

          <div class="navigation page ${namePage}-body space">
              <div class="bg-overlay p-h100">
                <div class="p-container">
                  <section id="intro">
                    <div class="about grid-rows">
                      <div class="first-row">
                        <h1>Notify</h1>
                        <p>${langText.ntAbout}</p>
                        <div class="btns-container">
                          <div class="btn-download">
                            <a href="/src/download/only/astronaut.notify.${V_NOTIFY}.zip" class="btn-2" title="Notify Version ${V_NOTIFY.split('v')[1]}" >Download Notify ${V_NOTIFY}</a>
                          </div>
                          <div class="btn-download">
                          <a href="/src/download/complete/astronaut.library.${V_LIBRARY_COMPLETE}.zip" class="btn-2" title="Astronaut Library Full Version ${V_LIBRARY_COMPLETE.split('v')[1]}" >Download Library Complete ${V_LIBRARY_COMPLETE}</a>
                          </div>
                        </div>
                      </div>
                      <div class="install">
                        <h3>${langText.howto}:</h3>
                        <div class="ast-codeviewer" data-blur="1.5rem" data-lang="html" data-title="index.html">
                          <script src="src/js/astronaut.notify.js"></script>
                        </div>
                        <div data-run="true" class="ast-codeviewer" data-blur="1.5rem" data-lang="js" data-title="script.js">
                          //${langText.astronautVariableWarn}
                          astronaut.notify({ 
                            message: 'Hi Dev! -> Welcome to Astronaut Library',
                            icon: 'src/img/astronaut.head.svg',
                            style: {
                              iconSize: '80%',
                              position: 'bottom -> right'
                            },
                            theme: 'dark',
                          })
                        </div>

                      </div>

                    </div>
                    <div class="tab grid-rows">
                      <div class="first-row"></div>
                      <div class="install">
                        <h3>Opções:</h3>
                        <div class="${namePage}-table"></div>
                      </div>
                    </div>
                  </section>

                  <div class="arrow-bottom-next-page"><a smooth href=""><div class="chevron"></div></a></div>
                </div>
              </div>
              <div id="start_documentation" class="bg-color">
                <div class="p-container-hauto">
                  <div class="column-1-center">
                    <section id="message">
                      <h2 hyperlink="message"> Message:</h2>
                      <div tab>
                        <p>${langText.ntMessageDescripDot1}</p>
                        <div data-run="true" class="ast-codeviewer" data-lang="js" data-title="script.js">
                          astronaut.notify({
                            message: 'Main message'
                          })
                        </div>
                    
                        <p>${langText.ntMessageDescripDot2}</p>
                        <div data-run="true" class="ast-codeviewer" data-lang="js" data-title="script.js">
                          astronaut.notify({
                            message: 'Main message -> Secondary message'
                          })
                        </div>
                      </div>                      
                    </section>
                  </div>
                  <div class="column-1-center">
                    <section id="icon">
                      <h2 hyperlink="icon"> Icon:</h2>
                      <div tab>
                        <p>${langText.ntIconDescripDot1}</p>
                        <div data-run="true" class="ast-codeviewer" data-lang="js" data-title="script.js">
                          astronaut.notify({
                            message: 'Main message -> Secondary message',
                            icon: 'https://andremalveira.github.io/astronaut/src/img/icon/128x128.png'
                          })
                        </div>
                        <p>${langText.ntIconDescripDot2}</p>
                        <div data-run="true" class="ast-codeviewer" data-lang="js" data-title="script.js">
                          astronaut.notify({
                            message: 'Main message -> Secondary message',
                            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/></svg>'
                          })
                        </div>
                        <p>${langText.ntIconDescripDot3}</p>
                        <div data-run="true" class="ast-codeviewer" data-lang="js" data-title="script.js">
                          astronaut.notify({
                            message: 'Main message -> Secondary message',
                            icon: '<i class="gg-coffee"></i>'
                          })
                        </div>
                      </div>
                    </section>
                  </div>
                  <div class="column-1-center">
                    <section id="link">
                      <h2 hyperlink="link"> Link:</h2>
                      <div tab>
                        <p>${langText.netLinkDescripDot1}</p>
                        <div class="${namePage}-table-link"></div>
                        <div hr></div>
                        <div data-run="true" class="ast-codeviewer" data-lang="js" data-title="script.js">
                          astronaut.notify({
                            message: 'Main message -> Secondary message',
                            icon: 'https://andremalveira.github.io/astronaut/src/img/icon/128x128.png',
                            link: {
                              message: '#url', 
                              icon: '#url', 
                              target: '_blank'
                            }
                          })
                        </div>
                      </div>
                    </section>
                  </div>
                  <div class="column-1-center">
                    <section id="type">
                      <h2 hyperlink="type"> Type:</h2>
                      <div tab>
                        <p>${langText.ntTypeDescripDot1}</p>
                        <p>${langText.ntTypeDescripDot2}</p>
                        <div data-run="true" class="ast-codeviewer" data-lang="js" data-title="script.js">
                          astronaut.notify({
                            message: 'Main message -> Secondary message',
                            icon: '<i class="gg-coffee"></i>',
                            type: 'error'
                          })
                        </div>
                      </div>
                    </section>
                  </div>
                  <div class="column-1-center">
                    <section id="theme">
                      <h2 hyperlink="theme"> Theme:</h2>
                      <div tab>
                        <p>${langText.ntThemeDescrip}</p>
                        <div data-run="true" class="ast-codeviewer" data-lang="js" data-title="script.js">
                          astronaut.notify({
                            message: 'Main message -> Secondary message',
                            icon: '<i class="gg-coffee"></i>',
                            theme: 'dark'
                          })
                        </div>
                      </div>
                    </section>
                  </div>
                  <div class="column-1-center">
                    <section id="style">
                      <h2 hyperlink="style"> Style:</h2>
                      <div tab>
                        <p>${langText.ntStyleDescrip}</p>
                        <div class="${namePage}-table-style"></div>
                        <div hr></div>
                        <div data-run="true" class="ast-codeviewer" data-lang="js" data-title="script.js">
                          astronaut.notify({
                            message: 'Main message -> Secondary message',
                            icon: 'src/img/astronaut.head.svg',
                            style: {
                              background: '#574b8799 -> 5px', //Example with background blur
                              color: '#e9e9e9',
                              iconSize: '80%',
                              iconBackground: '#3b395c',
                              border: '#e9e9e9',
                              closeColor: '#574b87'
                            }
                          })
                        </div>
                        <p color="warn">${langText.ntStyleDescripTip}</p>
                        <div data-run="true" class="ast-codeviewer" data-lang="js" data-title="script.js">
                           var styleForNotify = {
                              background: '#574b8799 -> 5px', //Example with background blur
                              color: '#e9e9e9',
                              iconSize: '80%',
                              iconBackground: '#3b395c',
                              border: '#e9e9e9',
                              closeColor: '#574b87'
                            };

                            astronaut.notify({
                              message: 'Main message -> Secondary message',
                              icon: 'src/img/astronaut.head.svg',
                              style: styleForNotify
                            })
                        </div>
                      </div>
                    </section>
                  </div>
                  <div class="column-1-center">
                    <section id="autoClose">
                      <h2 hyperlink="autoClose"> Auto Close:</h2>
                      <div tab>
                        <p>${langText.ntAutoCloseDescrip}, ${langText.ntAutoCloseDescripOp1}</p>
                        <p></p>
                        <p>${langText.ntAutoCloseDescripOp2}</p>
                        <div class="${namePage}-table-style"></div>
                        <div hr></div>
                        <div data-run="true" class="ast-codeviewer" data-lang="js" data-title="script.js">
                          astronaut.notify({
                            message: 'Main message -> Secondary message',
                            icon: 'src/img/astronaut.head.svg',
                            style: {
                              iconSize: '80%',
                            },
                            autoClose: true //true or time in milisecond Ex: (1000)
                          })
                        </div>
                        <div data-run="true" class="ast-codeviewer" data-lang="js" data-title="script.js">
                          astronaut.notify({
                            message: 'Main message -> Secondary message',
                            icon: 'src/img/astronaut.head.svg',
                            style: {
                              iconSize: '80%',
                            },
                            autoClose: 1000 //true or time in milisecond Ex: (1000)
                          })
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
      `;

      //======================== CSS =======================//
      var css = `
        .${namePage}-body {
          background: url(src/img/bg/4851471.jpg);
          background-size: cover;
        }

        .gg-coffee {
          box-sizing: border-box;
          position: relative;
          display: block;
          transform: scale(var(--ggs,1));
          width: 18px;
          height: 14px;
          border: 2px solid;
          border-radius: 6px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          margin-left: -4px;
          margin-top: 3px
      }
      .gg-coffee::after,
      .gg-coffee::before {
          content: "";
          display: block;
          box-sizing: border-box;
          position: absolute
      }
      .gg-coffee::before {
          left: 2px;
          background: currentColor;
          box-shadow:
              4px 0 0,
              8px 0 0;
          border-radius: 3px;
          width: 2px;
          height: 4px;
          top: -7px
      }
      .gg-coffee::after {
          width: 6px;
          height: 8px;
          border: 2px solid;
          border-radius: 100px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          right: -6px;
          top: -1px
      }
      `;

      //=============== INITIAL EXECUTABLES ===============//
      style.id=`page-${namePage}-css`
      style.textContent = css;
      if(!head.get(`style#${namePage}-css`)){
        head.appendChild(style) //INSERT CSS
      }
      titleTab.change(namePage)
      selector.innerHTML=pageContentHTML //INSERT HTML
      var sHeight = selector.offsetHeight

      //CodeViewer
      astronaut.codeviewer({
        options: {
          hyperlink: false,
          copy: true,
        },
      })

      //Table
      astronaut.table({
        selector: `#new-page .${namePage}-table`,
        thead:['Option','Type',	'Values',	'Description'],
        tbody:[ 
          ['<a smooth attr href="#message">message:</a>',	"String -> attr:obj",	"text -> attr:text",	`${langText.ntMessageDescrip}`],
          ['<a smooth attr href="#icon">icon:</a>',	"String -> attr:obj",	"<t text>url</t> or <t text><span><</span>svg></t>",	`${langText.ntIconDescrip}`],
          ['<a smooth attr href="#link">link:</a>',	"Object -> attr:obj",	"{object}",	`${langText.ntLinkDescrip}`],
          ['<a smooth attr href="#type">type:</a>',	"String -> attr:obj",	"text -> attr:text",	`${langText.ntTypeDescrip}`],
          ['<a smooth attr href="#type">theme:</a>',	"String -> attr:obj",	"text -> attr:text",	`${langText.ntThemeDescrip}`],
          ['<a smooth attr href="#style">style:</a>',	"Object -> attr:obj",	"{object}",	`${langText.ntStyleDescrip}`],
          ['<a smooth attr href="#autoClose">autoClose:</a>',	"Boolean/Number -> attr:obj",	"true/miliseconds -> attr:boolean",	`${langText.ntAutoCloseDescrip}`],
        ],
        style: {
          blur: '2rem',
          fontSize: '0.9rem'
        }
      })
      astronaut.table({
        selector: `#new-page .${namePage}-table-link`,
        thead:['Option','Type',	'Values', 'Description'],
        tbody:[ 
          ['message: -> attr:attr',	"String -> attr:obj",	"url -> attr:text",	`${langText.netLinkDescripOp1}`],
          ['icon: -> attr:attr',	"String -> attr:obj",	"url -> attr:text",	`${langText.netLinkDescripOp2}`],
          ['target: -> attr:attr',	"String -> attr:obj",	"_blank -> attr:text",	`${langText.netLinkDescripOp3}`],
        ],
        style: {
          fontSize: '0.9rem'
        }
      })
      astronaut.table({
        selector: `#new-page .${namePage}-table-style`,
        thead:['Option','Type',	'Default', 'Description -> width:50%'],
        tbody:[ 
          ['position: -> attr:attr',	"String -> attr:obj",	"'<t>top <i>-</i>> left</t>' -> attr:text fira",	`${langText.ntStyleDescripOp1}`],
          ['background: -> attr:attr',	"String -> attr:obj",	"'<t viewcolor >#fff</t>' -> attr:text fira",	`${langText.ntStyleDescripOp2}`],
          ['color: -> attr:attr',	"String -> attr:obj",	"'<t viewcolor >#878787</t>' -> attr:text fira",	`${langText.ntStyleDescripOp3}`],
          ['border: -> attr:attr',	"String -> attr:obj",	"'<t viewcolor >#2ecc71</t>' -> attr:text fira",	`${langText.ntStyleDescripOp4}`],
          ['margin: -> attr:attr',	"String -> attr:obj",	"'2rem 2rem' -> attr:text fira",	`${langText.ntStyleDescripOp5}`],
          ['iconColor: -> attr:attr',	"String -> attr:obj",	"'<t viewcolor >#fff</t>' -> attr:text fira",	`${langText.ntStyleDescripOp6}`],
          ['iconBackground: -> attr:attr',	"String -> attr:obj",	"'<t viewcolor >#2ecc71</t>' -> attr:text fira",	`${langText.ntStyleDescripOp7}`],
          ['iconSize: -> attr:attr',	"String -> attr:obj",	"'2.2rem' -> attr:text fira",	`${langText.ntStyleDescripOp8}`],
          ['closeColor: -> attr:attr',	"String -> attr:obj",	"'<t viewcolor >#878787</t>' -> attr:text fira",	`${langText.ntStyleDescripOp9}`],
          ['closeBackground: -> attr:attr',	"String -> attr:obj",	"'<t viewcolor >#f2f2f2</t>' -> attr:text fira",	`${langText.ntStyleDescripOp10}`],
          ['closeSize: -> attr:attr',	"String -> attr:obj",	"'0.8rem' -> attr:text fira",	`${langText.ntStyleDescripOp11}`],
          ['filter: -> attr:attr',	"String -> attr:obj",	"'none' -> attr:text fira",	`${langText.ntStyleDescripOp12}`],
          ['timeout: -> attr:attr',	"String -> attr:obj",	"'0.5s' -> attr:text fira",	`${langText.ntStyleDescripOp13}`],
        ],
        style: {
          fontSize: '0.9rem'
        }
      })
      scrooll.smooth(selector.firstElementChild)
      scrooll.onStart()
      hyperlink()
      viewColor()
      //===================== FUNCTIONS ======================//




      //===================== SCRIPTS ======================//
      document.querySelector('#new-page .page').addEventListener("scroll", function (event) {
      
        var arrow = document.querySelector('.arrow-bottom-next-page'),
            page = document.querySelector('#new-page .page');

        if(page.scrollTop + 200 >= arrow.offsetTop){
          arrow.firstElementChild.classList.add('ret')
        } else {
          arrow.firstElementChild.classList.remove('ret')
        }
      });
  },
  insert(params){
    var theme = (params.theme) ? params.theme : '', 
        langText = (params.lang) ? params.lang : '', 
        selector = params.selector ?? false,
        head = document.head,
        style = document.createElement('style'),
        namePage = 'insert';
  
        //======================= HTML ========================// 
        //<div class=""></div>
        var pageContentHTML = `
  
            <div class="navigation page ${namePage}-body space">
                <div class="bg-overlay p-h100">
                  <div class="p-container">
                    <section id="intro">
                      <div class="about grid-rows">
                        <div class="first-row">
                          <h1>Insert</h1>
                          <p>${langText.insAbout}</p>
                          <div class="btns-container">
                            <div class="btn-download">
                              <a href="/src/download/only/astronaut.insert.${V_INSERT}.zip" class="btn-2" title="Insert Version ${V_INSERT.split('v')[1]}" >Download Insert ${V_INSERT}</a>
                            </div>
                            <div class="btn-download">
                            <a href="/src/download/complete/astronaut.library.${V_LIBRARY_COMPLETE}.zip" class="btn-2" title="Astronaut Library Full Version ${V_LIBRARY_COMPLETE.split('v')[1]}" >Download Library Complete ${V_LIBRARY_COMPLETE}</a>
                            </div>
                          </div>
                        </div>
                        <div class="install">
                          <h3>${langText.howto}:</h3>
                          <div class="ast-codeviewer" data-blur="1.5rem" data-lang="html" data-title="index.html">
                            <script src="src/js/astronaut.insert.js"></script>
                          </div>
                          <div class="ast-codeviewer" data-blur="1.5rem" data-lang="js" data-title="script.js" data-copy="false">
                            //${langText.astronautVariableWarn}

                            astronaut.insert.'func'()
                          </div>
  
                        </div>
  
                      </div>
                      <div class="tab grid-rows">
                        <div class="first-row"></div>
                        <div class="install">
                          <h3>Opções:</h3>
                          <div class="${namePage}-table"></div>
                        </div>
                      </div>
                    </section>
  
                    <div class="arrow-bottom-next-page"><a smooth href=""><div class="chevron"></div></a></div>
                  </div>
                </div>
                <div id="start_documentation" class="bg-color">
                  <div class="p-container-hauto">
                    <div class="column-1-center">
                      <section id="css">
                        <h2 hyperlink="css"> Css:</h2>
                        <div tab>
                          <p>${langText.insCssDescrip}</p>
                          <div data-run="true" class="ast-codeviewer" data-lang="js" data-title="script.js">
                            astronaut.insert.css(\`
                            
                              section#css {
                                background: #000;
                                box-shadow: 0px 0px 25px #00000090;
                                color: blueviolet;
                              }

                            \`, 'inserted-style')
                          </div>
                        </div>                      
                      </section>
                    </div>
                    <div class="column-1-center">
                      <section id="script">
                        <h2 hyperlink="script"> Script:</h2>
                        <div tab>
                          <p>${langText.insScriptDescrip}</p>
                          <div data-run="true" class="ast-codeviewer" data-lang="js" data-title="script.js">
                            astronaut.insert.script(\`

                              alert('Script via insert.script inserted!')

                            \`, 'inserted-script')
                          </div>
                        </div>                      
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
  
        //======================== CSS =======================//
        var css = `
          .${namePage}-body {
            background: url(src/img/bg/44881471.jpg);
            background-size: cover;
          }
        `;
  
        //=============== INITIAL EXECUTABLES ===============//
        style.id=`page-${namePage}-css`
        style.textContent = css;
        if(!head.get(`style#${namePage}-css`)){
          head.appendChild(style) //INSERT CSS
        }
        titleTab.change(namePage)
        selector.innerHTML=pageContentHTML //INSERT HTML
        var sHeight = selector.offsetHeight
  
        //CodeView
        astronaut.codeviewer({
          options: {
            hyperlink: false,
            copy: true,
          },
        })
  
        //Table
        astronaut.table({
          selector: `#new-page .${namePage}-table`,
          thead:['Func','Type',	'Params',	'Description'],
          tbody:[ 
            ['<a smooth attr href="#css">css</a>',	"Function -> attr:boolean",	"( 'css' ,  'id' ) -> attr:text",	`${langText.insCssDescrip}`],
            ['<a smooth attr href="#script">script</a>',	"Function -> attr:boolean",	"( 'script' ,  'id' ) -> attr:text",	`${langText.insScriptDescrip}`],
          ],
          style: {
            blur: '2rem',
            fontSize: '0.9rem'
          }
        })

        scrooll.smooth(selector.firstElementChild)
        scrooll.onStart()
        hyperlink()
        viewColor()
        //===================== FUNCTIONS ======================//
  
        //===================== SCRIPTS ======================//
        document.querySelector('#new-page .page').addEventListener("scroll", function (event) {
        
          var arrow = document.querySelector('.arrow-bottom-next-page'),
              page = document.querySelector('#new-page .page');
  
          if(page.scrollTop + 200 >= arrow.offsetTop){
            arrow.firstElementChild.classList.add('ret')
          } else {
            arrow.firstElementChild.classList.remove('ret')
          }
        });
  },
  codeviewer(params){
    var theme = (params.theme) ? params.theme : '', 
        langText = (params.lang) ? params.lang : '', 
        selector = params.selector ?? false,
        head = document.head,
        style = document.createElement('style'),
        namePage = 'codeviewer';
  
        //======================= HTML ========================// 
        //<div class=""></div>
        var pageContentHTML = `
            <div class="navigation page ${namePage}-body space">
                <div class="bg-overlay p-h100">
                  <div class="p-container">
                    <section id="intro">
                      <div class="about grid-rows">
                        <div class="first-row">
                          <h1>CodeViewer</h1>
                          <p>${langText.cdvwAbout}</p>
                          <div class="btns-container">
                            <div class="btn-download">
                              <a href="/src/download/only/astronaut.codeviewer.${V_CODEVIEWER}.zip" class="btn-2" title="CodeViewer Version ${V_CODEVIEWER.split('v')[1]}" >Download CodeViewer ${V_CODEVIEWER}</a>
                            </div>
                            <div class="btn-download">
                              <a href="/src/download/complete/astronaut.library.${V_LIBRARY_COMPLETE}.zip" class="btn-2" title="Astronaut Library Full Version ${V_LIBRARY_COMPLETE.split('v')[1]}" >Download Library Complete ${V_LIBRARY_COMPLETE}</a>
                            </div>
                          </div>
                        </div>
                        <div class="install">
                          <h3>${langText.howto}:</h3>
                          <div class="ast-codeviewer" data-copy="true" data-blur="1.5rem" data-lang="html" data-title="index.html">
                            //Use with div tag
                            &lt;div class="ast-codeviewer" data-lang="LANGUAGE_HERE">
                              ${langText.cdvwYourCodeHere}
                            &lt;/div>

                            //OR use with script tag 
                            &lt;script type="text/plain" class="ast-codeviewer" data-lang=""> 
                              ${langText.cdvwYourCodeHere}
                            &lt;/script>
                          </div>
                          <div class="ast-codeviewer" data-copy="true" data-blur="1.5rem" data-lang="html" data-title="index.html">
                            <script src="src/js/astronaut.codeviewer.js"></script>
                          </div>
                          <div class="ast-codeviewer" data-copy="true" data-blur="1.5rem" data-lang="js" data-title="script.js" >
                            //${langText.astronautVariableWarn}

                            astronaut.codeviewer()
                          </div>
  
                        </div>
  
                      </div>
                      <div class="tab grid-rows">
                        <div class="install">
                          <h3>${langText.cdvwAttrDescri}</h3>
                            <div class="${namePage}-table-attr"></div>
                          </div>
                        <div class="install">
                          <h3>Opções:</h3>
                          <div class="${namePage}-table"></div>
                        </div>
                      </div>
                    </section>
  
                    <div class="arrow-bottom-next-page"><a smooth href=""><div class="chevron"></div></a></div>
                  </div>
                </div>
                <div id="start_documentation" class="bg-color">
                  <div class="p-container-hauto">
                    <div class="column-1-center">
                      <section id="data-lang">
                        <h2 hyperlink="data-lang">• data-lang:</h2>
                        <div tab>
                          <p>${langText.cdvwLangDescr}</p>
                          <p>Values: <span text>html, css, js, php</span></p>
                          <div class="ast-codeviewer" data-copy="true" data-lang="html" data-title="HTML">
                            &lt;div class="ast-codeviewer" data-lang="html">
                              <h1>Hello World</h1>
                            &lt;/div>
                          </div>
                        </div>                      
                      </section>
                    </div>
                    <div class="column-1-center">
                      <section id="data-title">
                        <h2 hyperlink="data-title">• data-title:</h2>
                        <div tab>
                          <p>${langText.cdvwTitleDescr}, HTML</p>
                          <div class="ast-codeviewer" data-copy="true" data-lang="html" data-title="HTML">
                            &lt;div class="ast-codeviewer" data-lang="html" data-title="HTML">
                              <h1>Hello World</h1>
                            &lt;/div>
                          </div>
                        </div>                      
                      </section>
                    </div>
                    <div class="column-1-center">
                      <section id="data-width-height">
                        <h2 hyperlink="data-width-height">• data-width, data-height:</h2>
                        <div tab>
                          <p>${langText.cdvwWHDescr}, Values default: width: <span text>100%</span>,  height: <span text>auto</span></p>
                          <div class="ast-codeviewer" data-copy="true" data-lang="html" data-title="HTML" data-width="80%" data-height="200px" style="margin: auto auto">
                            &lt;div class="ast-codeviewer" data-lang="html" data-width="80%" data-height="200px">
                              <h1>Hello World</h1>
                            &lt;/div>
                          </div>
                        </div>                      
                      </section>
                    </div>
                    <div class="column-1-center">
                      <section id="data-copy">
                        <h2 hyperlink="data-copy">• data-copy:</h2>
                        <div tab>
                          <p>${langText.cdvwCopyDescr}</p>
                          <div class="ast-codeviewer" data-copy="true" data-lang="html"  data-title="HTML">
                            &lt;div class="ast-codeviewer" data-lang="html" data-copy="true">
                              <h1>Hello World</h1>
                            &lt;/div>
                          </div>
                        </div>                      
                      </section>
                    </div>
                    <div class="column-1-center">
                      <section id="data-hyperlink">
                        <h2 hyperlink="data-hyperlink">• data-hyperlink:</h2>
                        <div tab>
                          <p>${langText.cdvwLinkDescr} - <sapn color="warn">${langText.cdvwLinkDescr2}</span></p>
                          <div id="hyperlink" class="ast-codeviewer" data-copy="true" data-lang="html"  data-hyperlink="true" data-title="HTML">
                            &lt;div class="ast-codeviewer" data-lang="html" id="hyperlink" data-hyperlink="true">
                              <h1>Hello World</h1>
                            &lt;/div>
                          </div>
                        </div>                      
                      </section>
                    </div>
                    <div class="column-1-center" style="background: url(src/img/bg/4859471.jpg); background-size: cover;border-radius:0.5rem">
                      <section id="data-blur">
                        <h2 hyperlink="data-blur">• data-blur:</h2>
                        <div tab>
                          <p>${langText.cdvwBlurDescr}</p>
                          <div class="ast-codeviewer" data-copy="true" data-lang="html" data-blur="true" data-title="HTML">
                            &lt;div class="ast-codeviewer" data-lang="html"  data-blur="true">
                              <h1>Hello World</h1>
                            &lt;/div>
                          </div>
                        </div>                      
                      </section>
                    </div>
                    <div class="column-1-center">
                      <section id="data-run">
                        <h2 hyperlink="data-run">• data-run:</h2>
                        <div tab>
                          <p>${langText.cdvwRunDescr}</p>
                          <div class="ast-codeviewer" data-copy="true" data-lang="html" data-run="true" data-title="HTML">
                            &lt;div class="ast-codeviewer" data-lang="js"  data-run="true">
                              alert('Hello World')
                              console.log('Hello World')
                            &lt;/div>
                          </div>
                          <p>Result</p>
                          <div class="ast-codeviewer" data-copy="true" data-lang="js" data-run="true" >
                              alert('Hello World')
                              console.log('Hello World')
                          </div>
                        </div>                      
                      </section>
                    </div>

                    <!--OPTIONS-->
                    <div class="column-1-center">
                      <section id="lineNumber">
                        <h2 hyperlink="lineNumber">• lineNumber:</h2>
                        <div tab>
                          <p>${langText.cdvwLineNumberDescrip}</p>
                          <div class="ast-codeviewer" data-copy="true" data-run="true" data-lang="js" data-title="Javascript">
                            astronaut.codeviewer({
                              lineNumber: true
                            })
                          </div>
                          <p>Others Options</p>
                          <div class="${namePage}-table-linenumber"></div>
                        </div>                      
                      </section>
                    </div>
                    <div class="column-1-center">
                      <section id="style">
                        <h2 hyperlink="style">• style:</h2>
                        <div tab>
                          <p>${langText.cdvwStyleDescrip}</p>
                          <div class="${namePage}-table-style"></div>
                          <p>Examples: </p>
                          <div class="ast-codeviewer" data-copy="true" data-run="true" data-lang="js" data-title="Javascript">
                            astronaut.codeviewer({
                              style: {
                                fontSize: '0.7rem',
                                background: "#000",
                                color: '#cfcfcf',
                              }
                            })
                          </div>
                          <div class="ast-codeviewer" data-copy="true" data-run="true" data-lang="js" data-title="Javascript">
                            astronaut.codeviewer({
                              style: {
                                windowBar: false
                              }
                            })
                          </div>
                          <div class="ast-codeviewer" data-copy="true" data-run="true" data-lang="js" data-title="Javascript">
                            astronaut.codeviewer({
                              style: {
                                fontFamily: 'monospace',
                                borderRadius: '1.5rem',
                                windowBar: 'transparent'
                              }
                            })
                          </div>
                        </div>                      
                      </section>
                    </div>
                    <div class="column-1-center">
                      <section id="buttons">
                        <h2 hyperlink="buttons">• buttons:</h2>
                        <div tab>
                          <p>${langText.cdvwButtonsDescrip}</p>
                          <div class="${namePage}-table-buttons"></div>
                          <p>Examples:</p>
                          <div id="example_hyperlink" class="ast-codeviewer" data-copy="true" data-run="true" data-lang="js" data-title="Javascript">
                            astronaut.codeviewer({
                              buttons: {
                                hyperlink: true,
                                color: '#fe2343',
                                backgroundHover: '#202'
                              }
                            })
                          </div>
                          <div id="example_hyperlink" class="ast-codeviewer" data-copy="true" data-run="true" data-lang="js" data-title="Javascript">
                            astronaut.codeviewer({
                              buttons: {
                                position: 'left'
                              }
                            })
                          </div>
                        </div>                      
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
  
        //======================== CSS =======================//
        var css = `
          .${namePage}-body {
            background: url(src/img/bg/4859471.jpg);
            background-size: cover;
          }
        `;
  
        //=============== INITIAL EXECUTABLES ===============//
        style.id=`page-${namePage}-css`
        style.textContent = css;
        if(!head.get(`style#${namePage}-css`)){
          head.appendChild(style) //INSERT CSS
        }
        titleTab.change(namePage)
        selector.innerHTML=pageContentHTML //INSERT HTML
        var sHeight = selector.offsetHeight
  
        //CodeView
        astronaut.codeviewer({})
  
        //Tables
        //Atributes
        astronaut.table({
          selector: `#new-page .${namePage}-table-attr`,
          thead:['Name','Values',	'Description'],
          tbody:[ 
            ['<a smooth attr href="#data-lang">data-lang</a>',	"Languages -> attr:text",	`${langText.cdvwLangDescr}`],
            ['<a smooth attr href="#data-title">data-title</a>',	"Title -> attr:text",	`${langText.cdvwTitleDescr}`],
            ['<a smooth attr href="#data-width-height">data-width<br>data-height</a>',	"Measure  -> attr:text",	`${langText.cdvwWHDescr}`],
            ['<a smooth attr href="#data-copy">data-copy</a>',	"true/false -> attr:text",	`${langText.cdvwCopyDescr}`],
            ['<a smooth attr href="#data-hyperlink">data-hyperlink</a>',	"true/false -> attr:text",	`${langText.cdvwLinkDescr}`],
            ['<a smooth attr href="#data-blur">data-blur</a>',	"true/false -> attr:text",	`${langText.cdvwBlurDescr}`],
            ['<a smooth attr href="#data-run">data-run</a>',	"true/false -> attr:text",	`${langText.cdvwRunDescr}`],
          ],
          style: {
            blur: '2rem',
            fontSize: '0.9rem'
          }
        })

        //Options
        astronaut.table({
          selector: `#new-page .${namePage}-table`,
          thead:['Option','Type',	'Value',	'Description'],
          tbody:[ 
            ['<a smooth attr href="#lineNumber">lineNumber:</a>',	"Boolean/Object -> attr:obj",	"<span boolean>true</span>/{object}",	`${langText.cdvwLineNumberDescrip}`],
            ['<a smooth attr href="#style">style:</a>',	"Object -> attr:obj",	"{object}",	`${langText.cdvwStyleDescrip}`],
            ['<a smooth attr href="#buttons">buttons:</a>',	"Object -> attr:obj",	"{object}",	`${langText.cdvwButtonsDescrip}`],
          ],
          style: {
            blur: '2rem',
            fontSize: '0.9rem'
          }
        })

        //lineNumber
        var tableStyle = { fontSize: '0.9rem'}
        astronaut.table({
          selector: `#new-page .${namePage}-table-linenumber`,
          thead:['Option','Type',	'Default',	'Description'],
          tbody:[ 
            ['color -> attr:attr',	"String -> attr:obj",	"<t viewcolor >#adbac74a</t>",	`Change the color of the line numbers`],
            ['separator -> attr:attr',	"Boolean -> attr:obj",	"true -> attr:boolean",	`Show or hide separator`],
            ['opacity -> attr:attr',	"Number -> attr:obj",	"1 -> attr:number",	`Apply opacity`],
          ],
          style: tableStyle
        })
        //style
        astronaut.table({
          selector: `#new-page .${namePage}-table-style`,
          thead:['Option','Type',	'Default',	'Description'],
          tbody:[ 
            ['fontSize: -> attr:attr',	"String -> attr:obj",	"0.9rem -> attr:text",	`${langText.cdvwStyleDescripOp1}`],
            ['fontFamily: -> attr:attr',	"String -> attr:obj",	"Fira Code, 'system-ui' -> attr:text",	`${langText.cdvwStyleDescripOp2}`],
            ['background: -> attr:attr',	"String -> attr:obj",	"<t viewcolor='#fff' >#232A2F</t>",	`${langText.cdvwStyleDescripOp3}`],
            ['color: -> attr:attr',	"String -> attr:obj",	"<t viewcolor >#939da5</t>",	`${langText.cdvwStyleDescripOp4}`],
            ['windowBar: -> attr:attr',	"Boolean/String -> attr:obj",	"<t viewcolor='#fff' >#1a202363</t>",	`${langText.cdvwStyleDescripOp5}`],
            ['blur: -> attr:attr',	"String -> attr:obj",	"0 -> attr:text",	`${langText.cdvwStyleDescripOp6}`],
            ['width: -> attr:attr',	"String -> attr:obj",	"100% -> attr:text",	`${langText.cdvwStyleDescripOp7}`],
            ['height: -> attr:attr',	"String -> attr:obj",	"auto -> attr:text",	`${langText.cdvwStyleDescripOp8}`],
            ['boxShadow: -> attr:attr',	"String -> attr:obj",	"none -> attr:text",	`${langText.cdvwStyleDescripOp9}`],
            ['borderRadius: -> attr:attr',	"String -> attr:obj",	"0.6rem -> attr:text",	`${langText.cdvwStyleDescripOp10}`],
            ['theme: -> attr:attr',	"String -> attr:obj",	"copilot -> attr:text",	`${langText.cdvwStyleDescripOp11}`],
          ],
          style: tableStyle
        })
        //buttons
        astronaut.table({
          selector: `#new-page .${namePage}-table-buttons`,
          thead:['Option','Type',	'Default',	'Description'],
          tbody:[ 
            ['hyperlink -> attr:attr',	"Boolean -> attr:obj",	"false -> attr:boolean",	`${langText.cdvwButtonsDescripOp1}`],
            ['copy -> attr:attr',	"Boolean -> attr:obj",	"false -> attr:boolean",	`${langText.cdvwButtonsDescripOp2}`],
            ['position -> attr:attr',	"String -> attr:obj",	"window -> attr:text",	`${langText.cdvwButtonsDescripOp3}`],
            ['color -> attr:attr',	"String -> attr:obj",	"<t viewcolor>#939da5</t>",	`${langText.cdvwButtonsDescripOp4}`],
            ['backgroundHover -> attr:attr',	"String -> attr:obj",	"<t viewcolor='#cfcfcf'>#adbac74a</t>",	`${langText.cdvwButtonsDescripOp5}`],
          ],
          style: tableStyle
        })
        scrooll.smooth(selector.firstElementChild)
        scrooll.onStart()
        hyperlink()
        viewColor()
        //===================== FUNCTIONS ======================//
  
        //===================== SCRIPTS ======================//
        document.querySelector('#new-page .page').addEventListener("scroll", function (event) {
        
          var arrow = document.querySelector('.arrow-bottom-next-page'),
              page = document.querySelector('#new-page .page');
  
          if(page.scrollTop + 200 >= arrow.offsetTop){
            arrow.firstElementChild.classList.add('ret')
          } else {
            arrow.firstElementChild.classList.remove('ret')
          }
        });
  

  },
  table(params){
    var theme = (params.theme) ? params.theme : '', 
        langText = (params.lang) ? params.lang : '', 
        selector = params.selector ?? false,
        head = document.head,
        style = document.createElement('style'),
        namePage = 'table';
  
        //======================= HTML ========================// 
        //<div class=""></div>
        var pageContentHTML = `
  
            <div class="navigation page ${namePage}-body space">
                <div class="bg-overlay p-h100">
                  <div class="p-container">
                    <section id="intro">
                      <div class="about grid-rows">
                        <div class="first-row">
                          <h1>Table</h1>
                          <p>${langText.tabAbout}</p>
                          <div class="btns-container">
                            <div class="btn-download">
                              <a href="/src/download/only/astronaut.table.${V_INSERT}.zip" class="btn-2" title="Table Version ${V_INSERT.split('v')[1]}" >Download Table ${V_INSERT}</a>
                            </div>
                            <div class="btn-download">
                            <a href="/src/download/complete/astronaut.library.${V_LIBRARY_COMPLETE}.zip" class="btn-2" title="Astronaut Library Full Version ${V_LIBRARY_COMPLETE.split('v')[1]}" >Download Library Complete ${V_LIBRARY_COMPLETE}</a>
                            </div>
                          </div>
                        </div>
                        <div class="install">
                          <h3>${langText.howto}:</h3>
                          <div class="ast-codeviewer" data-blur="1.5rem" data-lang="html" data-title="index.html">
                            <script src="src/js/astronaut.table.js"></script>
                          </div>
                          <div class="ast-codeviewer" data-run="true" data-blur="1.5rem" data-lang="js" data-title="script.js" data-copy="true">
                            //${langText.astronautVariableWarn}

                            astronaut.table({
                              selector: '#tab_run',
                              thead:['Name','Last Name'],
                              tbody:[
                                ['John','Doe'],
                                ['Peter','Stanbridge'],
                              ]
                            })
                          </div>
  
                        </div>
  
                      </div>
                      <div class="tab grid-rows">
                        <div class="first-row" id="tab_run"></div>
                        <div class="install">
                          <h3>Opções:</h3>
                          <div class="${namePage}-table"></div>
                        </div>
                      </div>
                    </section>
  
                    <div class="arrow-bottom-next-page"><a smooth href=""><div class="chevron"></div></a></div>
                  </div>
                </div>
                <div id="start_documentation" class="bg-color">
                  <div class="p-container-hauto">
                    <div class="column-1-center">
                      <section id="selector">
                        <h2 hyperlink="selector"> Selector:</h2>
                        <div tab>
                          <p>${langText.tabSelectorDescrip}</p>
                          <div class="ast-codeviewer" data-lang="js" data-title="script.js">
                            astronaut.table({
                              selector: '#tab_run'
                            })
                          </div>
                          or
                          <div class="ast-codeviewer" data-lang="js" data-title="script.js">
                            var tabRun = document.querySelector('#tab_run')

                            astronaut.table({
                              selector: tabRun
                            })
                          </div>
                        </div>                      
                      </section>
                    </div>
                    <div class="column-1-center">
                      <section id="thead">
                        <h2 hyperlink="thead"> Thead:</h2>
                        <div tab>
                          <p>${langText.tabTheadDescrip}</p>
                          <div class="ast-codeviewer" data-lang="js" data-title="script.js">
                            astronaut.table({
                              selector: '#tab_run',
                              thead: ['id', 'Name']
                            })
                          </div>
                        </div>                      
                      </section>
                    </div>
                    <div class="column-1-center">
                      <section id="tbody">
                        <h2 hyperlink="tbody"> Tbody:</h2>
                        <div tab>
                          <p>${langText.tabTbodyDescrip}</p>
                          <div class="ast-codeviewer" data-lang="js" data-title="script.js">
                            astronaut.table({
                              selector: '#tab_run',
                              thead: ['id', 'Name'],
                              tbody: [
                                ['001', 'Jhon']
                              ]
                            })
                          </div>
                        </div>                      
                      </section>
                    </div>
                    <div class="column-1-center">
                      <section id="style">
                        <h2 hyperlink="style"> Style:</h2>
                        <div tab>
                          <p>${langText.tabStyleDescrip}</p>
                          <h3>Opções:</h3>
                          <div class="${namePage}-table-style"></div>
                        </div>                      
                      </section>
                      <section id="style_trowHover">
                        <div tab>
                          <p hyperlink="style_trowHover">Example: <t attr>trowHover:</t></p>
                          <div class="ast-codeviewer" data-run="true" data-lang="js" data-title="script.js">
                            astronaut.table({
                              selector: '#tabTesttrowHover',
                              thead: ['id', 'Name'],
                              tbody: [
                                ['001', 'Jhon'],
                                ['002', 'Peter']
                              ],
                              style: {
                                trowHover: '#eee 0.5s',
                              }
                            })
                          </div>
                          <div id="tabTesttrowHover"></div>
                        </div>                      
                      </section>
                      <section id="style_borderInside">
                        <div tab>
                          <p hyperlink="style_borderInside">Example: <t attr>borderInside:</t></p>
                          <div class="ast-codeviewer" data-run="true" data-lang="js" data-title="script.js">
                            astronaut.table({
                              selector: '#tabTestborderInside',
                              thead: ['id', 'Name'],
                              tbody: [
                                ['001', 'Jhon'],
                                ['002', 'Peter']
                              ],
                              style: {
                                borderInside: '2px #eee',
                              }
                            })
                          </div>
                          <div id="tabTestborderInside"></div>
                          <p color="warn"><t attr>borderInside:</t> ${langText.tabStyleBorderInsideWarn1}</p>
                          <div class="ast-codeviewer" data-run="true" data-lang="js" data-title="script.js">
                            astronaut.table({
                              selector: '#tabTestborderInsidexy',
                              thead: ['id', 'Name'],
                              tbody: [
                                ['001', 'Jhon'],
                                ['002', 'Peter']
                              ],
                              style: {
                                borderInside: '2px #eee true false'
                              }
                            })
                          </div>
                          <p color="warn">${langText.tabStyleBorderInsideWarn2}</p>
                          <div id="tabTestborderInsidexy"></div>
                        </div>                      
                      </section>
                      <section id="style_borderOutside">
                        <div tab>
                          <p hyperlink="style_borderOutside">Example: <t attr>borderOutside:</t></p>
                          <div class="ast-codeviewer" data-run="true" data-lang="js" data-title="script.js">
                            astronaut.table({
                              selector: '#tabTestborderOutside',
                              thead: ['id', 'Name'],
                              tbody: [
                                ['001', 'Jhon'],
                                ['002', 'Peter']
                              ],
                              style: {
                                borderOutside: '2px #eee',
                              }
                            })
                          </div>
                          <div id="tabTestborderOutside"></div>
                        </div>                      
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
  
        //======================== CSS =======================//
        var css = `
          .${namePage}-body {
            background: url(src/img/bg/4111471.jpg);
            background-size: cover;
          }
        `;
  
        //=============== INITIAL EXECUTABLES ===============//
        style.id=`page-${namePage}-css`
        style.textContent = css;
        if(!head.get(`style#${namePage}-css`)){
          head.appendChild(style) //INSERT CSS
        }
        titleTab.change(namePage)
        selector.innerHTML=pageContentHTML //INSERT HTML
        var sHeight = selector.offsetHeight
  
        //CodeView
        astronaut.codeviewer({
          options: {
            hyperlink: false,
            copy: true,
          },
        })
  
        //Table
        astronaut.table({
          selector: `#new-page .${namePage}-table`,
          thead:['Option','Type',	'Value',	'Description'],
          tbody:[ 
            ['<a smooth attr href="#selector">selector</a>',	"String/HTMLElement -> attr:obj",	"\'#id\' -> attr:text",	`${langText.tabSelectorDescrip}`],
            ['<a smooth attr href="#thead">thead</a>',	"Array -> attr:obj",	"[' ', ' ']",	`${langText.tabTheadDescrip}`],
            ['<a smooth attr href="#tbody">tbody</a>',	"Array -> attr:obj",	"[' ', ' ']",	`${langText.tabTbodyDescrip}`],
            ['<a smooth attr href="#style">style</a>',	"Object -> attr:obj",	"{object}",	`${langText.tabStyleDescrip}`],
          ],
          style: {
            blur: '2rem',
            borderInside: false,
            fontSize: '0.9rem'
          }
        })

        astronaut.table({
          selector: `#new-page .${namePage}-table-style`,
          thead:['Option -> width:10rem','Type',	'Default  -> width:8rem', 'Description'],
          tbody:[ 
            ['fontSize -> attr:attr',	"String -> attr:obj",	"auto -> attr:text",	`${langText.tabStyleDescripOp1}`],
            ['theadColor -> attr:attr',	"String -> attr:obj",	"<t viewcolor>#939da5</t>",	`${langText.tabStyleDescripOp2}`],
            ['tbodyColor -> attr:attr',	"String -> attr:obj",	"<t viewcolor>#939da5</t>",	`${langText.tabStyleDescripOp3}`],
            ['theadBackground -> attr:attr',	"String -> attr:obj",	"<t viewcolor='#cfcfcf'>#1a202363</t>",	`${langText.tabStyleDescripOp4}`],
            ['tbodyBackground -> attr:attr',	"String -> attr:obj",	"<t viewcolor='#cfcfcf'>#232A2F</t>",	`${langText.tabStyleDescripOp5}`],
            ['borderRadius -> attr:attr',	"String -> attr:obj",	"0.6rem -> attr:text",	`${langText.tabStyleDescripOp6}`],
            ['blur -> attr:attr',	"String -> attr:obj",	"not defined!",	`${langText.tabStyleDescripOp7}`],
            ['trowHover -> attr:attr',	"String -> attr:obj",	"not defined!",	`${langText.tabStyleDescripOp8}`],
            ['<a smooth attr href="#style_borderInside">borderInside</a>',	"String -> attr:obj",	"not defined!",	`${langText.tabStyleDescripOp9}`],
            ['<a smooth attr href="#style_borderOutside">borderOutside</a>',	"String -> attr:obj",	"not defined!",	`${langText.tabStyleDescripOp10}`],            
            ['boxShadow -> attr:attr',	"String -> attr:obj",	"not defined!",	`${langText.tabStyleDescripOp11}`],
          ],
          style: {
           fontSize: '0.9rem'
          }
        })

        scrooll.smooth(selector.firstElementChild)
        scrooll.onStart()
        hyperlink()
        viewColor()

  },

}

