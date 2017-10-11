'use strict'

const canvases = Array.from(document.querySelectorAll('.canvas'));
console.log(canvases)
const bokehs = canvases.map(div => {
  const redBG = (Math.random() * 350);
  const dx = (Math.random() * 10) + 1
  return bokehfy({
    parent: div,
    density: 5,
    radius: 100,
    halflife: 450,
    dx,
    dy: 0,
    gradient: ['white'],
    backgroundColor: `hsl(${redBG}, 95%, 75%)`
  })
})

console.log(bokehs)