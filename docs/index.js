const canvas = document.getElementById('canvas');
const field = bokehfy(canvas);
field.backgroundColor(rgb(49, 159, 159));
field.framerate(20);
field.color('#FFF');
field.halflife(542);
field.radius(87);
field.dx(4);
field.dy(4);

const inFramerate = document.getElementById('in-framerate'),
      inHalflife = document.getElementById('in-halflife'),
      inRadius = document.getElementById('in-radius'),
      inDensity = document.getElementById('in-density'),
      inBackground = document.getElementById('in-background'),
      inTransparent = document.getElementById('in-transparent'),
      inColor = document.getElementById('in-color'),
      inDx = document.getElementById('in-dx'),
      inDy = document.getElementById('in-dy');

const liFramerate = inFramerate.addEventListener('input', changeFramerate),
      liHalflife = inHalflife.addEventListener('input', changeHalflife),
      liRadius = inRadius.addEventListener('input', changeRadius),
      liDensity = inDensity.addEventListener('input', changeDensity),
      liBackground = inBackground.addEventListener('change', changeBackground),
      liTransparent = inTransparent.addEventListener('change', changeTransparent),
      liColor = inColor.addEventListener('change', changeColor),
      liDx = inDx.addEventListener('input', changeDx),
      liDy = inDy.addEventListener('input', changeDy);

function changeFramerate(e) {
  field.framerate(e.target.value)
}

function changeHalflife(e) {
  field.halflife(e.target.value)
}

function changeRadius(e) {
  field.radius(e.target.value)
}

function changeDensity(e) {
  field.density(e.target.value)
}

function changeBackground(e) {
  field.backgroundColor(e.target.value)
}

function changeTransparent(e) {
  field.toggleBackground()
}

function changeColor(e) {
  field.color(e.target.value)
}

function changeDx(e) {
  field.dx(e.target.value)
}

function changeDy(e) {
  field.dy(e.target.value)
}