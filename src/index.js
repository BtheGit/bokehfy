'use strict'
const Field = require('./components/Field');

function bokehfy() {


  /**
   * Take in a hex value for a color (later any type) and return an object
   * containing the RGB values separated.
   * @param  {string} color [Hex value]
   * @return {object}       [eg {r: 255, g: 0, b: 100}]
   */
  const convertColors = color => {

  }

  /**
   * Create a new canvas element and attach it to the DOM, sized to fit the 
   * parent element provided (defaulting to 'body' if none is provided).
   * @param  {Node} parentElement [Container for canvas - body if none povided]
   * @return {canvas}               [canvas element attached to DOM]
   */
  const createCanvas = parentElement => {
    const canvas = window.document.createElement('canvas')
    if(parentElement === window.document.body) {
      canvas.setAttribute('style', "position: fixed; top: 0; left: 0;")
    }
    parentElement.appendChild(canvas);
    return canvas;
  }
  /**
   * Canvas will be resized to fit it's current parent
   * @param  {Canvas} canvas [Canvas already attached to DOM]
   * 
   */
  const sizeCanvas = (canvas) => {
    const width = canvas.parentNode.clientWidth;
    const height = canvas.parentNode.clientHeight;
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
  }

  /**
   * Create a new bokeh field instance. The user can optionally provide a parent
   * element to attach the canvas too. If none is provided it will be attached to the
   * document body and automatically set to full screen.
   * @param  {Node} parentNode [Optional: Parent element that will contain the canvas]
   * @return {Field}        [An instance of the bokehfy field with public methods]
   */
  const init = (parentElement = window.document.body) => {
    const canvas = createCanvas(parentElement)
    sizeCanvas(canvas)
    window.addEventListener('resize', () => sizeCanvas(canvas))
    const field = new Field(canvas)
    return field;
  }

  return {
    init
  }
};

module.exports = bokehfy();