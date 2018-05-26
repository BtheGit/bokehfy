'use strict'
const Point = require('./Point');
const Mouse = require('./Mouse');
const DEFAULTS = require('./defaultSettings.js');
const tinyColor = require('tinycolor2');

class Field {
  constructor(canvas) {
    this.interval = this._setInterval()
    this.animationFrame = null;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.transparent = false;
    this.BG = DEFAULTS.backgroundColor;
    this.gradient = DEFAULTS.gradient;
    this.pointRadius = DEFAULTS.radius;
    this.pointHalflife = DEFAULTS.halflife;
    this.pointDX = DEFAULTS.dx;
    this.pointDY = DEFAULTS.dy;
    this.isInteractive = false;
    this.Mouse = new Mouse(this.canvas);
    this.points = this._generatePoints();
    this.start()
  }

  _setInterval(framerate = DEFAULTS.framerate) {
    return 1000 / framerate;
  }

  _generatePoints(density = DEFAULTS.density) {
    const points = [];
    for (let i = 0; i < density; i++) {
      points.push(new Point({
        canvas: this.canvas, 
        ctx: this.ctx, 
        gradient: this.gradient,
        halflifeRatio: this.pointHalflife,
        maxRadius: this.pointRadius,
        maxDX: this.pointDX,
        maxDY: this.pointDY,
      }))
    }
    return points;
  }

  _clear() {
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
    if(!this.transparent) {
      this.ctx.fillStyle = this.BG;
      this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    }
  }

  _animatePoints() {
    for(let i = 0; i < this.points.length; i++) {
      this.points[i].pulse();
      if(this.isInteractive){
        this.points[i].interact(this.Mouse);
      }
      this.points[i].draw();
      this.points[i].move();
    }      
  }

  //### API
  start() {
    let then = Date.now()
    let delta;

    const draw = timestamp => {
      const now = Date.now(timestamp);
      delta = now - then;
      if(delta > this.interval) {
        this._clear();
        this._animatePoints();

        then = now - (delta % this.interval)
      }
      this.animationFrame = requestAnimationFrame(draw);
    }
    this.animationFrame = requestAnimationFrame(draw)
  }

  stop() {
    cancelAnimationFrame(this.animationFrame)
    this.animationFrame = null;
  }

  pause() {
    if(this.animationFrame) {
      this.stop();
    } 
    else {
      this.start();
    }
  }

  getSettings() {
    const newBG = tinyColor(this.BG).toRgb()
    const newGradient = this.gradient.map(color => tinyColor(color).toRgb())
    const settings = {
      transparent: this.transparent,
      backgroundColor: newBG,
      gradient: newGradient,
      radius: this.pointRadius,
      halflife: this.pointHalflife,
      dx: this.pointDX,
      dy: this.pointDY,
      density: this.points.length
    }
    return settings;
  }

  setGradient(colors) {
    this.gradient = colors;
    this.points.forEach(point => {
      point.addGradient(this.gradient);
    })
  }

  changeBackgroundColor(color) {
    this.BG = color;
  }

  toggleBackground() {
    this.transparent = !this.transparent;
  }

  setTransparency(isTrans) {
    this.transparent = isTrans;
  }

  resizePoints(newMaxRadius) {
    this.pointRadius = newMaxRadius;
    this.points.forEach(point => {
      point.resize(this.pointRadius);
    })
  }

  changeDensity(newDensity) {
    this.points = this._generatePoints(newDensity);
  }

  changeHalflife(newHalflife) {
    this.pointHalflife = newHalflife
    this.points.forEach(point => {
      point.changeHalflife(this.pointHalflife);
    })
  }

  changeDX(newDX) {
    this.pointDX = newDX;
    this.points.forEach(point => {
      point.changeDX(this.pointDX)
    })
  }

  changeDY(newDY) {
    this.pointDY = newDY;
    this.points.forEach(point => {
      point.changeDY(this.pointDY)
    })
  }

  stepDX(increment) {
    this.pointDX += increment;
    this.points.forEach(point => {
      point.stepDX(increment);
    })
  }

  stepDY(increment) {
    this.pointDY += increment;
    this.points.forEach(point => {
      point.stepDY(increment);
    })
  }

  stepRadius(increment) {
    this.pointRadius += increment;
    this.points.forEach(point => {
      point.stepRadius(increment);
    })
  }

  changeFramerate(newFramerate) {
    this.interval = this._setInterval(newFramerate);
  }

  setInteractiveState(isInteractive){
    this.isInteractive = isInteractive;
  }
}

module.exports = Field;