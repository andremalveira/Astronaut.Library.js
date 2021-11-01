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

          <div class="page ${namePage}-body space">
              <div class="bg-overlay p-h100">
                <div class="p-container">
                  <section id="intro">
                    <div class="about grid-rows">
                      <div>
                        <h1>Astronaut Library - Notify</h1>
                        <p>${langText.ntAbout}</p>
                        <div class="btn-download">
                          <a class="btn-2" title="Notify Version ${V_NOTIFY.split('v')[1]}" >Download ${V_NOTIFY}</a>
                        </div>
                      </div>
                      <div class="install">
                        <h3>${langText.howto}:</h3>
                        <div class="ast-codeview" data-blur="1.5rem" data-lang="html" data-title="index.html">
                          <script src="src/js/astronaut.notify.js"></script>
                        </div>
                        <div data-run="true" class="ast-codeview" data-blur="1.5rem" data-lang="js" data-title="script.js">
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
                      <div></div>
                      <div class="install">
                        <h3>Opções:</h3>
                        <div class="${namePage}-table"></div>
                      </div>
                    </div>
                  </section>

                  <div class="arrow-bottom-next-page"><a smooth href="#message"><div class="chevron"></div></a></div>
                </div>
              </div>
              <div class="bg-color">
                <div class="p-container-hauto">
                  <div class="column-1-center">
                    <section id="message">
                      <h2 hyperlink="message"> Message:</h2>
                      <div tab>
                        <p>${langText.ntMessageDescripDot1}</p>
                        <div data-run="true" class="ast-codeview" data-lang="js" data-title="script.js">
                          astronaut.notify({
                            message: 'Main message'
                          })
                        </div>
                    
                        <p>${langText.ntMessageDescripDot2}</p>
                        <div data-run="true" class="ast-codeview" data-lang="js" data-title="script.js">
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
                        <div data-run="true" class="ast-codeview" data-lang="js" data-title="script.js">
                          astronaut.notify({
                            message: 'Main message -> Secondary message',
                            icon: 'https://andremalveira.github.io/astronaut/src/img/icon/128x128.png'
                          })
                        </div>
                        <p>${langText.ntIconDescripDot2}</p>
                        <div data-run="true" class="ast-codeview" data-lang="js" data-title="script.js">
                          astronaut.notify({
                            message: 'Main message -> Secondary message',
                            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/></svg>'
                          })
                        </div>
                        <p>${langText.ntIconDescripDot3}</p>
                        <div data-run="true" class="ast-codeview" data-lang="js" data-title="script.js">
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
                        <div data-run="true" class="ast-codeview" data-lang="js" data-title="script.js">
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
                        <div data-run="true" class="ast-codeview" data-lang="js" data-title="script.js">
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
                        <div data-run="true" class="ast-codeview" data-lang="js" data-title="script.js">
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
                        <div data-run="true" class="ast-codeview" data-lang="js" data-title="script.js">
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

      //CodeView
      astronaut.codeview({
        width: '100%',
        options: {
          hyperlink: false,
          copy: true,
        },
      })

      //Table
      astronaut.table({
        selector: `#new-page .${namePage}-table`,
        thead:['Option','Type',	'Values',	'Usability',	'Description'],
        tbody:[ 
          ['<a smooth attr href="#message">message:</a>',	"String -> attr:obj",	"text -> attr:text",	`${langText.required}`,	`${langText.ntMessageDescrip}`],
          ['<a smooth attr href="#icon">icon:</a>',	"String -> attr:obj",	"<t text>url</t> or <t text><span><</span>svg></t>",	`${langText.optional} -> attr:opacity`,	`${langText.ntIconDescrip}`],
          ['<a smooth attr href="#link">link:</a>',	"Object -> attr:obj",	"{object}",	`${langText.optional} -> attr:opacity`,	`${langText.ntLinkDescrip}`],
          ['<a smooth attr href="#type">type:</a>',	"String -> attr:obj",	"text -> attr:text",	`${langText.optional} -> attr:opacity`,	`${langText.ntTypeDescrip}`],
          ['<a smooth attr href="#type">theme:</a>',	"String -> attr:obj",	"text -> attr:text",	`${langText.optional} -> attr:opacity`,	`${langText.ntThemeDescrip}`],
          ['<a smooth attr href="#style">style:</a>',	"Object -> attr:obj",	"{object}",	`${langText.optional} -> attr:opacity`,	`${langText.ntStyleDescrip}`],
        ],
        style: {
          blur: '2rem',
          border: false
        }
      })
      astronaut.table({
        selector: `#new-page .${namePage}-table-link`,
        thead:['Option','Type',	'Values',	'Usability',	'Description'],
        tbody:[ 
          ['message: -> attr:attr',	"String -> attr:obj",	"url -> attr:text",	`${langText.optional} -> attr:opacity`,	`${langText.netLinkDescripOp1}`],
          ['icon: -> attr:attr',	"String -> attr:obj",	"url -> attr:text",	`${langText.optional} -> attr:opacity`,	`${langText.netLinkDescripOp2}`],
          ['target: -> attr:attr',	"String -> attr:obj",	"_blank -> attr:text",	`${langText.optional} -> attr:opacity`,	`${langText.netLinkDescripOp3}`],
        ],
      })
      astronaut.table({
        selector: `#new-page .${namePage}-table-style`,
        thead:['Option','Type',	'Default',	'Usability',	'Description -> width:50%'],
        tbody:[ 
          ['position: -> attr:attr',	"String -> attr:obj",	"'<t>top <i>-</i>> left</t>' -> attr:text fira",	`${langText.optional} -> attr:opacity`,	`${langText.ntStyleDescripOp1}`],
          ['background: -> attr:attr',	"String -> attr:obj",	"'<t viewcolor >#fff</t>' -> attr:text fira",	`${langText.optional} -> attr:opacity`,	`${langText.ntStyleDescripOp2}`],
          ['color: -> attr:attr',	"String -> attr:obj",	"'<t viewcolor >#878787</t>' -> attr:text fira",	`${langText.optional} -> attr:opacity`,	`${langText.ntStyleDescripOp3}`],
          ['border: -> attr:attr',	"String -> attr:obj",	"'<t viewcolor >#2ecc71</t>' -> attr:text fira",	`${langText.optional} -> attr:opacity`,	`${langText.ntStyleDescripOp4}`],
          ['margin: -> attr:attr',	"String -> attr:obj",	"'2rem 2rem' -> attr:text fira",	`${langText.optional} -> attr:opacity`,	`${langText.ntStyleDescripOp5}`],
          ['iconColor: -> attr:attr',	"String -> attr:obj",	"'<t viewcolor >#fff</t>' -> attr:text fira",	`${langText.optional} -> attr:opacity`,	`${langText.ntStyleDescripOp6}`],
          ['iconBackground: -> attr:attr',	"String -> attr:obj",	"'<t viewcolor >#2ecc71</t>' -> attr:text fira",	`${langText.optional} -> attr:opacity`,	`${langText.ntStyleDescripOp7}`],
          ['iconSize: -> attr:attr',	"String -> attr:obj",	"'2.2rem' -> attr:text fira",	`${langText.optional} -> attr:opacity`,	`${langText.ntStyleDescripOp8}`],
          ['closeColor: -> attr:attr',	"String -> attr:obj",	"'<t viewcolor >#878787</t>' -> attr:text fira",	`${langText.optional} -> attr:opacity`,	`${langText.ntStyleDescripOp9}`],
          ['closeBackground: -> attr:attr',	"String -> attr:obj",	"'<t viewcolor >#f2f2f2</t>' -> attr:text fira",	`${langText.optional} -> attr:opacity`,	`${langText.ntStyleDescripOp10}`],
          ['closeSize: -> attr:attr',	"String -> attr:obj",	"'0.8rem' -> attr:text fira",	`${langText.optional} -> attr:opacity`,	`${langText.ntStyleDescripOp11}`],
          ['filter: -> attr:attr',	"String -> attr:obj",	"'none' -> attr:text fira",	`${langText.optional} -> attr:opacity`,	`${langText.ntStyleDescripOp12}`],
          ['timeout: -> attr:attr',	"String -> attr:obj",	"'0.5s' -> attr:text fira",	`${langText.optional} -> attr:opacity`,	`${langText.ntStyleDescripOp13}`],
        ],
      })
      scrooll.smooth(selector.firstElementChild)
      hyperlink()

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

      document.querySelectorAll('[viewcolor]').forEach(viewcolor => {
        viewcolor.style.background=viewcolor.textContent
        viewcolor.style.color='#000'
      })
  }
}

