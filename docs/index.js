const canvas = document.getElementById('canvas');
const field = bokehfy(canvas)
field.recolor('#FFF')

const inFramerate = document.getElementById('in-framerate'),
      inHalflife = document.getElementById('in-halflife'),
      inResize = document.getElementById('in-resize'),
      inDensity = document.getElementById('in-density'),
      inBackground = document.getElementById('in-background'),
      inTransparent = document.getElementById('in-transparent'),
      inColor = document.getElementById('in-color');

const liFramerate = inFramerate.addEventListener('input', changeFramerate),
      liHalflife = inHalflife.addEventListener('input', changeHalflife),
      liResize = inResize.addEventListener('input', changeResize),
      liDensity = inDensity.addEventListener('input', changeDensity),
      liBackground = inBackground.addEventListener('change', changeBackground),
      liTransparent = inTransparent.addEventListener('change', changeTransparent),
      liColor = inColor.addEventListener('change', changeColor);

function changeFramerate(e) {
  field.framerate(e.target.value)
}

function changeHalflife(e) {
  field.halflife(e.target.value)
}

function changeResize(e) {
  field.resize(e.target.value)
}

function changeDensity(e) {
  field.density(e.target.value)
}

function changeBackground(e) {
  console.log(e)
  field.backgroundColor(e.target.value)
}

function changeTransparent(e) {
  field.toggleBackground()
}

function changeColor(e) {
  field.recolor(e.target.value)
}