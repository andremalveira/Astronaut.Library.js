function typography(params) {

  var 
      theme = (params.theme) ? params.theme : '', 
      langText = (params.lang) ? params.lang : '', 
      cache = (params.cache) ? params.cache : 'reload',
      window = params.iframe.contentWindow, 
      document = window.document, 
      html = document.documentElement,
      body = document.body,
      head = document.head,
      style = document.createElement('style'), 
      navBarTitle = parent.document.querySelector('[window][tab="typography"] .navbar .bar-search');

      const fontPreview = (params) => {
        var allpreviewTitle = document.querySelectorAll('.main-container .font-preview-title'),
            allpreviewText = document.querySelectorAll('.main-container .font-preview-text'),
            retrn = (params.retrn) ? params.retrn : false,
            title = (params.title) ? params.title : 'Lorem Ipsum',
            text = (params.text) ? params.text : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

        if(retrn == 'title'){return title}else if(retrn == 'text'){return text}
        
        if(params.title || params.title == ''){
          allpreviewTitle.forEach(previewTitle => {
            previewTitle.innerText = title
          });
        }
        if(params.text || params.text == ''){
          allpreviewText.forEach(previewText => {
            previewText.innerText = text
          });
        }
      }

    function start(dataJSON){
      var HTMLFontBox = '';
      //others variables
      var LPCdata = (storageLocal.get('lastPaletteColor')) ?? false,
          fontColor = (LPCdata) ? LPCdata.fontColor : 'var(--font-primary)',
          bgColor = (LPCdata) ? LPCdata.bgColor : 'var(--bg-second)',
          LTGdata = (storageLocal.get('lastTypography')) ?? false,
          ltgtitle = (LTGdata) ? LTGdata.title : '',
          ltgtext = (LTGdata) ? LTGdata.text : '',
          fontPreviewTitle = fontPreview({retrn:'title'}),
          fontPreviewText = fontPreview({retrn:'text'});

      if(ltgtitle != ''){fontPreviewTitle = ltgtitle}
      if(ltgtext != ''){fontPreviewText = ltgtext}

      //<div class=""></div>
      //======================= HTML ========================// 
      dataJSON.forEach(font => {
        HTMLFontBox += `
        <div class="font-box">
          <div class="embed"> 
            <div id="fontfamily">font-family:'${font.namecss}', sans-serif;</div>
            <div id="link">&lt;link href="${font.link}" rel="stylesheet"&gt;</div>
            <style id="import">@import url('${font.link}');</style>
          </div>
          <div class="font-box-header">
            <div class="font-name">${font.name}</div>
            <div class="font-author">${font.author}</div>
          </div>
          <div class="font-box-preview" style="font-family:'${font.namecss}', sans-serif">
            <div class="font-preview-title">${fontPreviewTitle}</div>
            <div class="font-preview-text">${fontPreviewText}</div>
          </div>
          <div class="font-box-footer">
            <div type="fontfamily" class="btn" title="${langText.copy} font-family">font-family</div>
            <div type="link" class="btn" title="${langText.copy} <link>"><<span>link></div>
            <div type="import" class="btn" title="${langText.copy} @import">@import</div>
          </div>
        </div>
      `;
      })

      navBarTitle.innerHTML=`
        <input value="${ltgtitle}" class="search fadeonleft" type="text" name="title" placeholder="${langText.tgInputTitle}" maxlength="23"autocomplete="off" style="width:15rem;">
        <input value="${ltgtext}" class="search fadeonleft" type="text" name="text" placeholder="${langText.tgInputText}" maxlength="125" autocomplete="off">
      `
      var typographyContentHTML = `
        <div class="main-container">
          <div class="grid">${HTMLFontBox}</div>
        </div>
      `;

      //======================== CSS =======================//
      var css = `
        body.typography-body {
          height: 100%;
          color: var(--font-primary) ;
          background: var(--bg-second);
          transition: ease 0.2s;
        }    
        .main-container {
          padding: 1.5rem;
        }
        .main-container .grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
          justify-items: center;
          align-items: center;
        }
        @media (max-width: 1520px){
          .main-container .grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 1280px){
          .main-container .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 720px){
          .main-container .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        /*FONT-BOX*/

        .main-container .font-box {
          width: -moz-available;
          width: -webkit-fill-available;
          width: fill-available;
          height: 15rem;
          padding: 0.8rem;
          background: var(--btn-primary);
          border-radius: 0.8rem;
          display: grid;
          grid-template-rows: auto 70% auto;
          user-select: none;
          transition: ease 0.2s;
          border: solid 1px transparent;
        }
        .main-container .font-box:hover {
          background: var(--bg-primary-transparent);
          border: solid 1px var(--border);
        }
        .main-container .font-box .embed,
        .main-container .font-box .embed div {
          position: absolute;
          width: 0;
          height: 0;
          overflow: hidden;
          opacity: 0;
        }
        .main-container .font-name {
          font-weight: 500;
        }
        .main-container .font-author {
          font-size: 0.8rem;
        }
        .main-container .font-box-preview {
          padding: 1.5rem 0 0.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          border-bottom: solid 1px transparent;
          margin-bottom: 0.5rem;
          word-break: break-all;
        }
        .main-container .font-box:hover .font-box-preview {
          border-bottom: solid 1px var(--border);
        }
        .main-container .font-preview-title {
          font-size: 1.3rem;
        }
        .main-container .font-preview-text {
          font-size: 0.9rem;
          max-height: 100%;
          overflow: overlay;
        }
        .main-container .font-box-footer {
          display: grid;
          grid-template-columns: repeat(3, auto);
          font-size: 0.9rem;
          gap: 0.3rem;
          opacity: 0.5;
        }
        .main-container .font-box:hover .font-box-footer {
          opacity: 1;
        }
        .main-container .font-box-footer .btn {
          padding: 0.2rem 0.3rem;
          border-radius: 0.2rem;
          transition: ease 0.2s;
          justify-content: center;
          display: flex;
          cursor: pointer;
        }
        .main-container .font-box-footer .btn:hover {
          background: var(--bg-info-border);
        }


      `;

      //=============== INITIAL EXECUTABLES ===============//
      style.id='typography-css'
      style.textContent = css;
      if(!head.querySelector('style#typography-css')){
        head.appendChild(style) //INSERT CSS
      }

      body.classList.add('typography-body')
      html.setAttribute('astronaut','')
      html.setAttribute('themecolor', theme)
      body.innerHTML=typographyContentHTML //INSERT HTML

      //===================== FUNCTIONS ======================//
      const copyEmbed = (value) => {
        clipboard(value)
          .then(() => {
            oldNotify(langText.pcCopySuccess, {type:'success'})
          })
          .catch(err => {
            oldNotify(langText.pcCopyError, {type:'error'})
            console.error(err)
          })
      }
      function ltgStorage(name,value){
        var ltgName = 'lastTypography';
        if(storageLocal.get(ltgName)){
          var lpc = storageLocal.get(ltgName); lpc[name] = value
              storageLocal.set(ltgName, lpc)
        }else{storageLocal.set(ltgName, {[name]:value})}
      }

      //===================== SCRIPTS ======================//
      var inputTitle = navBarTitle.querySelector('input[name="title"]'),
          inputText = navBarTitle.querySelector('input[name="text"]'),
          btns = document.querySelectorAll('.font-box .font-box-footer .btn');
          

      inputTitle.addEventListener('input', () => {
        var inputTitleValue = inputTitle.value;
        fontPreview({title:inputTitleValue})
        ltgStorage('title', inputTitleValue)
      })
      inputText.addEventListener('input', () => {
        var inputTextValue = inputText.value;
        fontPreview({text:inputTextValue})
        ltgStorage('text', inputTextValue)
      })
      btns.forEach(btn => {
        var type = btn.attributes['type'].value,
            embed = btn.parentElement.parentElement.querySelector('.embed'),
            textforcopy = embed.querySelector('#'+type).innerText;

        btn.addEventListener('click', () => {copyEmbed(textforcopy)})
      })

    }

    //execute and get data json in astronaut/api/palettecolor/ with fetch 


    CONNECTION({
      online: () => {
        fetch(DIRECTORY_API('typography.json'), {cache})
        .then(response => response.json())
        .then(data => {
          start(data)
          storageLocal.cacheData('typography', data)
        })
        .catch(err => {console.error(err)})
      },
      offline: () => {
        var newValue = storageLocal.get('cacheData').typography
        start(newValue)
      }
    })

}
