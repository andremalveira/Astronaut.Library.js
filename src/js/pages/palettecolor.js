function palettecolor(params) {

    var theme = (params.theme) ? params.theme : '', 
        langText = (params.lang) ? params.lang : '', 
        cache = (params.cache) ? params.cache : 'reload',
        window = params.iframe.contentWindow, 
        document = window.document, 
        html = document.documentElement,
        body = document.body,
        head = document.head,
        style = document.createElement('style');

      function start(dataJSON){
        var HTMLColorSolidSet = '', colorSolid = dataJSON[0], HTMLColorGradientSet = '', colorGradient = dataJSON[1];
        colorSolid.forEach(e => {
          var HTMLColorSolidPalette = '';
          e.colors.forEach(colorCode => {
            HTMLColorSolidPalette += 
            `
              <div class="grid palette" title="${langText.copy}" data-color="${colorCode}" data-type="solid">
                <div class="color-solid" style="background: ${colorCode}"></div>
                <span class="color-code">${colorCode}</span>
              </div>  
            `
          })

          HTMLColorSolidSet += 
          `
            <div class="color-set">
              <div class="title-color-set">${e.title}</div>
              <div class="codes-color-set">${HTMLColorSolidPalette}</div>
            </div>
          `
        })
        colorGradient.forEach(e => {

          HTMLColorGradientSet += 
          `
          <div class="grid palette" title="Copiar" data-color="linear-gradient(180deg, ${e.colorOne} 3%, ${e.colorTwo} 100%)"  data-type="gradient">
            <span class="color-code">${e.colorOne}</span>
            <div class="color-gradient" style="background: linear-gradient(180deg, ${e.colorOne} 3%, ${e.colorTwo} 100%); "></div>
            <span class="color-code">${e.colorTwo}</span>
          </div>
          `
        })
        
        //others variables
        var LPCdata = (storageLocal.get('lastPaletteColor')) ?? false,
            fontColor = (LPCdata) ? LPCdata.fontColor : 'var(--font-primary)',
            bgColor = (LPCdata) ? LPCdata.bgColor : 'linear-gradient(204deg, #FD7869 -40%,  #a376bb00 85%)';

        //======================= HTML ========================// 
        //<div class=""></div>
          var paletteContentHTML = `
          <div class="grid palette-content ">
            
            <div class="group solid">
              <div class="title">${langText.pcSolid}</div>
              <div class="main horizontal">
                ${HTMLColorSolidSet}
              </div>
            </div>
            <div class="group gradient">
              <div class="title">${langText.pcGradient}</div>
              <div class="main">
                ${HTMLColorGradientSet}
              </div>
            </div>

          </div>
        `;

        //======================== CSS =======================//
        var css = `
          body.palette-body {
            display: flex;
            height: 100%;
            color: ${fontColor} ;
            background: ${bgColor};
            transition: ease 0.2s;
          }
          .palette-body .grid {
            display: grid;
          }
          .palette-content {
            width: 100%;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: 100%;
            padding: 1rem 1rem 0 1rem;
          }
          .palette-content .group {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          .group .title  {
            font-size: 1.3rem;
            user-select: none;
          }
          .group .main  {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
            overflow: overlay;
            overflow-x: hidden;
          }
          .group .main::-webkit-scrollbar {
            background: #22272e26;
          }
          .group .main::-webkit-scrollbar-thumb {
            background: #22272e26;
          }
          .group .title-color-set  {
            display: flex;
            justify-content: center;
            font-size: 0.8rem;
            user-select: none;
          }
          .group .main.horizontal .title-color-set  {
            writing-mode: vertical-lr;
            transform: scale(-1);
          }
          .group .palette {
            width: 5rem;
            height: 5rem;
            display: grid;
            justify-content: center;
            justify-items: center;
            align-items: center;
            transition: ease 0.2s;
            background: #22272e26;
            padding: 0.5rem;
            border-radius: 0.4rem;
            border: solid 0.01rem transparent;
            cursor: pointer;
          }
          .group .palette:hover,
          .group .palette.active {
            background: #22272e9e;
            border: solid 0.01rem currentColor;
          }
          .group .palette:active,
          .group .palette.active {
            transform: scale(0.95);
          }
          .group .palette .color-code {
            font-size: 0.8rem;
            user-select: none;
          }

          /*Solid Colors*/
          .group.solid .codes-color-set {
            border: solid 0.01rem transparent;
            padding: 0.4rem;
            border-radius: 0.4rem;
            flex-wrap: wrap;
          }
          .group.solid .color-set:hover .codes-color-set {
            border: solid 0.01rem currentColor;
          }
          .group.solid .color-set,
          .group.solid .codes-color-set  {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .group.solid .main.horizontal .color-set,
          .group.solid .main.horizontal .codes-color-set  {
            flex-direction: row;
          }
          .group.solid .palette {
            width: 5rem;
            height: 5rem;
          }
          .group.solid .palette .color-solid {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
          }


          /*Gradient Colors*/
          .group.gradient .main.horizontal  {
            flex-direction: column;
          }
          .group.gradient .palette {
            width: 11rem;
            height: 11rem;
          }
          .group.gradient .palette .color-gradient {
            width: 7rem;
            height: 7rem;
            border-radius: 50%;
            transition: ease 0.2s;
          }
          .group.gradient .palette:hover .color-gradient {
            width: 10rem;
            border-radius: 0.5rem;
          }
        `;

        //=============== INITIAL EXECUTABLES ===============//
        style.id='palettecolor-css'
        style.textContent = css;
        if(!head.querySelector('style#palettecolor-css')){
          head.appendChild(style) //INSERT CSS
        }
        body.classList.add('palette-body')
        html.setAttribute('astronaut','')
        html.setAttribute('themecolor', theme)
        body.innerHTML=paletteContentHTML //INSERT HTML

        //===================== FUNCTIONS ======================//
        const copyColor = (value) => {
          clipboard(value)
            .then(() => {
              oldNotify(langText.pcCopySuccess, {type:'success'})
            })
            .catch(err => {
              oldNotify(langText.pcCopyError, {type:'error'})
              console.error(err)
            })
        }

        //===================== SCRIPTS ======================//
        body.querySelectorAll('.grid.palette').forEach(palette => {
          palette.addEventListener('click', () => {
            var value = palette.dataset.color
            copyColor(value)
          })
          palette.addEventListener('contextmenu', function(e) {
            var value = palette.dataset.color
            var type = palette.dataset.type
            
            function lcpStorage(name,value){
              var lcpName = 'lastPaletteColor';
              if(storageLocal.get(lcpName)){
                var lpc = storageLocal.get(lcpName); lpc[name] = value
                    storageLocal.set(lcpName, lpc)
              }else{storageLocal.set(lcpName, {[name]:value})}
            }
            if(type == 'solid'){
               newContextMenu({
                btn:palette, event:e, document,
                options: `
                  <button class="btn" option="font-color"><i></i><span>Font Color</span></button>
                  <button class="btn" option="bg-color"><i></i><span>Background Color</span></button>
                `,
                func: (newContextMenu) => {

                  newContextMenu.querySelector('#contextMenu [option="font-color"]').addEventListener('click',() => {
                    body.style.color=value
                    lcpStorage('fontColor', value)
                  })
                  newContextMenu.querySelector('#contextMenu [option="bg-color"]').addEventListener('click',() => {
                    body.style.background=value
                    lcpStorage('bgColor', value)
                  })
                }
              });
            } else {
              body.style.background=value
              lcpStorage('bgColor', value)
            }
            e.preventDefault();
          }, false);
        });
      }

      //execute and get data json in astronaut/api/palettecolor/ with fetch 
      CONNECTION({
        online: () => {
          fetch(DIRECTORY_API('palettecolor.json'), {cache})
          .then(response => response.json())
          .then(data => {
            start(data)
            storageLocal.cacheData('paletteColor', data)
          })
          .catch(err => {console.error(err)})
        },
        offline: () => {
          var newValue = storageLocal.get('cacheData').paletteColor
          start(newValue)
        }
      })
}
