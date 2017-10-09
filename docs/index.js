const canvas = document.getElementById('canvas');
const field = bokehfy(canvas);

const inFramerate = document.getElementById('in-framerate'),
      inHalflife = document.getElementById('in-halflife'),
      inRadius = document.getElementById('in-radius'),
      inDensity = document.getElementById('in-density'),
      inBackground = document.getElementById('in-background'),
      inTransparent = document.getElementById('in-transparent'),
      inColor = document.getElementById('in-color'),
      inStar = document.getElementById('in-star'),
      inDx = document.getElementById('in-dx'),
      inDy = document.getElementById('in-dy');

const liFramerate = inFramerate.addEventListener('input', changeFramerate),
      liHalflife = inHalflife.addEventListener('input', changeHalflife),
      liRadius = inRadius.addEventListener('input', changeRadius),
      liDensity = inDensity.addEventListener('input', changeDensity),
      liBackground = inBackground.addEventListener('change', changeBackground),
      liTransparent = inTransparent.addEventListener('change', changeTransparent),
      liColor = inColor.addEventListener('change', changeColor),
      liStar = inStar.addEventListener('change', changeStar),
      liDx = inDx.addEventListener('input', changeDx),
      liDy = inDy.addEventListener('input', changeDy);

function changeFramerate(e) {
  field.framerate(Number(e.target.value))
}

function changeHalflife(e) {
  field.halflife(Number(e.target.value))
}

function changeRadius(e) {
  field.radius(Number(e.target.value))
}

function changeDensity(e) {
  field.density(Number(e.target.value))
}

function changeBackground(e) {
  field.backgroundColor(e.target.value)
}

function changeTransparent(e) {
  field.toggleBackground()
}

function changeStar(e) {
  field.star(e.target.value)
}

function changeColor(e) {
  field.color(e.target.value)
}

function changeDx(e) {
  field.dx(Number(e.target.value))
}

function changeDy(e) {
  field.dy(Number(e.target.value))
}