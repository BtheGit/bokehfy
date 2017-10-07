'use strict'
const Field = require('./components/Field');

//   /**
//    * Take in a hex value for a color (later any type) and return an object
//    * containing the RGB values separated.
//    * @param  {string} color [Hex value]
//    * @return {object}       [eg {r: 255, g: 0, b: 100}]
//    */
//   const convertColors = color => {

//   }


class Bokehfy {
  constructor(parentElement = window.document.body) {
    this.parent = parentElement;
    this.canvas = this.createCanvas(this.parent);
    this.field = this.init(this.canvas);
    this.fitCanvas = this.fitCanvas.bind(this);
    window.addEventListener('resize', this.fitCanvas)
  };

  /**
   * Create a new bokeh field instance. The user can optionally provide a parent
   * element to attach the canvas too. If none is provided it will be attached to the
   * document body and automatically set to full screen.
   * @param  {Node} parentNode [Optional: Parent element that will contain the canvas]
   * @return {Field}        [An instance of the bokehfy field with public methods]
   */
  init() {
    this.fitCanvas()
    const field = new Field(this.canvas)
    return field;    
  }

  /**
   * Create a new canvas element and attach it to the DOM, sized to fit the 
   * parent element provided (defaulting to 'body' if none is provided).
   * @param  {Node} parent [Container for canvas - body if none povided]
   * @return {canvas}               [canvas element attached to DOM]
   */
  createCanvas() {
    const canvas = window.document.createElement('canvas')
    if(this.parent === window.document.body) {
      canvas.setAttribute('style', "position: fixed; top: 0; left: 0;")
    }
    this.parent.appendChild(canvas);
    return canvas;
  }

  /**
   * Canvas will be resized to fit it's current parent
   * @param  {Canvas} canvas [Canvas already attached to DOM]
   **/
  fitCanvas() {
    const width = this.canvas.parentNode.clientWidth;
    const height = this.canvas.parentNode.clientHeight;
    this.canvas.setAttribute('width', width)
    this.canvas.setAttribute('height', height)    
  }

  //API

  pause() {
    this.field.pause();
  }

  delete() {
    window.removeEventListener('resize', this.fitCanvas)
    this.parent.removeChild(this.canvas)
  }

  /**
   * Take in custom settings object with parameters. Change parameters if possible.
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   * {
   *   backgroundColor,
   *   pointColor,
   *   pointCount,
   *   speed,
   *   size
   * }
   */
  settings(obj) {

  }


}

module.exports = Bokehfy;