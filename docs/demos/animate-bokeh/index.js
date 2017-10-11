'use strict'

const bokeh = bokehfy({density:50, radius: 100, halflife: 600, color: 'black', backgroundColor: 'white'});

let color = 0;
let timeout;

function animate() {
  color += 1
  bokeh.color(`rgb(${color},${color},${color})`)
  bokeh.backgroundColor(`rgb(${255 -color},${255 - color},${255 - color})`)
  if(color < 256) {
    timeout = setTimeout(animate, 200)
  }
  else {
    clearTimeout(timeout)
  }
}

timeout = setTimeout(animate, 200)

