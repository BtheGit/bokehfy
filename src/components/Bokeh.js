'use strict'
const Field = require('./Field');
const tinyColor = require('tinycolor2');

class Bokeh {
  constructor(parentElement) {
    this.parent = parentElement;
    this.canvas = this._createCanvas(this.parent);
    this.field = this._init(this.canvas);
    this._fitCanvas = this._fitCanvas.bind(this);
    window.addEventListener('resize', this._fitCanvas)
  };

  /**
   * Create a new bokeh field instance. The user can optionally provide a parent
   * element to attach the canvas too. If none is provided it will be attached to the
   * document body and automatically set to full screen.
   * @param  {Node} parentNode [Optional: Parent element that will contain the canvas]
   * @return {Field}        [An instance of the bokehfy field with public methods]
   */
  _init() {
    this._fitCanvas()
    const field = new Field(this.canvas)
    return field;    
  }

  /**
   * Create a new canvas element and attach it to the DOM, sized to fit the 
   * parent element provided (defaulting to 'body' if none is provided).
   * @param  {Node} parent [Container for canvas - body if none povided]
   * @return {canvas}               [canvas element attached to DOM]
   */
  _createCanvas() {
    const canvas = window.document.createElement('canvas')
    canvas.setAttribute('style', "position: absolute; top: 0; left: 0;")
    this.parent.prepend(canvas);
    return canvas;
  }

  /**
   * Canvas will be resized to fit it's current parent
   * @param  {Canvas} canvas [Canvas already attached to DOM]
   **/
  _fitCanvas() {
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
    window.removeEventListener('resize', this._fitCanvas)
    this.parent.removeChild(this.canvas)
  }

  /**
   * Take in custom settings object with parameters. Change parameters if possible.
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   * {
   *   background,
   *   pointColor,
   *   pointCount,
   *   speed,
   *   size
   * }
   */
  settings(obj = {}) {
    //Enumerate through all keys of object.
  }

  backgroundColor(newColor = '') {
    const color = tinyColor(newColor);
    if(color.isValid() && this.field) {
      this.field.changeBackgroundColor(color.toHexString());
    }
  }

  toggleBackground() {
    if(this.field) {
      this.field.toggleBackground();
    }
  }

  //TODO: Validate input for numbers between a certain range
  radius(newMaxRadius) {
    if(this.field) {
      this.field.resizePoints(newMaxRadius);
    }
  }

  color(newPointColor = '') {
    const color = tinyColor(newPointColor)
    if(color.isValid() && this.field) {
      this.field.recolorPoints(color.toRgb());
    }
  }

  //TODO: Validate input for numbers between a certain range
  density(newDensity) {
    if(this.field) {
      this.field.changeDensity(newDensity);
    }
  }

  //TODO: Validate input for numbers between a certain range
  halflife(newHalflife) {
    if(this.field) {
      this.field.changeHalflife(newHalflife);
    }
  }

  //TODO: Validate input for numbers between a certain range
  framerate(newFramerate) {
    if(this.field) {
      this.field.changeFramerate(newFramerate);
    }
  }

  //TODO: Validate input for numbers between a certain range
  dx(newDX) {
    if(this.field) {
      this.field.changeDX(newDX);
    }
  }
  //TODO: Validate input for numbers between a certain range
  dy(newDY) {
    if(this.field) {
      this.field.changeDY(newDY);
    }
  }

}

module.exports = Bokeh;