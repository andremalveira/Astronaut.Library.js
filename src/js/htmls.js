

const htmls = {
  palettecolor:`
  <div id="notification" 
    class="info show" 
    style="display: flex; padding: 1rem; height: 2rem;">
    ${langText.pcInfoTextOne}
  </div>
    <img 
      style="width: 100%; margin: auto 0; " 
      src="https://andremalveira.github.io/astronaut/src/img/gif-information-palettecolor.gif"
    >
  `,
  typography:`
  <div id="notification" 
    class="info show" 
    style="display: flex; padding: 1rem; height: 2rem;">
    ${langText.tgInfoTextOne}
  </div>
    <img 
      style="width: 100%; margin: auto 0; " 
      src="https://andremalveira.github.io/astronaut/src/img/gif-information-typegraphy.gif"
    >
  `,
  donate() { return`
  <div class="profile-author">
    <div class="header">
      <a href="https://github.com/andremalveira" target="_blank"><div class="avatar"><img loading="lazy" src="
        https://github.com/andremalveira.png
      "></div></a>
      <a href="https://github.com/andremalveira" target="_blank"><div class="name">
        <span>André Malveira</span>
        <span>@andremalveira</span>
      </div></a>
      <div>${langText.coffee}</div>
    </div>
    <div class="main">
      <a href="https://www.paypal.com/donate/?business=VDQ4LD7Q6X9BA&currency_code=${langText.currency}" target="_blank"><div class="button"><i>${icons.paypal}</i>Paypal</div></a>
      <a href="https://ko-fi.com/andremalveira" target="_blank"><div class="button"><i>${icons.coffee}&nbsp</i>Ko-fi</div></a>
    </div>
  </div>
  <div class="donate-pix"><i>${icons.pix}pix:</i>donatefor.andremalveira@gmail.com</div>
  `}
}
