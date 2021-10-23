var howtouse = 'call the function this way: astronaut.notify({})'
try {
  $astronautType
  try {
    original = astronaut
    astronaut = 'anything';
    astronaut = original;

    console.log('is var')
  } catch (err) {
    console.log(
    `%cIt looks like you already have the full astronaut library in your project, to avoid mistakes, if you are not using the full library and you only want to use a specific library, remove the full library! 🤔 `,
    ` color: #ff8080;background-color: #290000;padding: 0.3rem 1.8rem 0.3rem 0.3rem;
    font-size:0.8rem;border-radius:0.2rem;border: solid 1px #5c0000;
    `);
    notify = howtouse
  }
} catch (error) {
  if(typeof astronaut === 'undefined'){
    window['astronaut'] = notify
    notify = howtouse
  } else {
    astronaut = Object.assign(astronaut, notify);
  }
}  
