'use strict'

const bokeh = bokehfy({radius: 20});

let dx = 0.5;
let i = 0;
let timeout;

function animate() {
  bokeh.stepRadius(dx)
  if(i < 150) {
    timeout = setTimeout(animate, 50)
  }
  else {
    clearTimeout(timeout)
  }
  i++
}

timeout = setTimeout(animate, 200)

