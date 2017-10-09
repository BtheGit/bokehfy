'use strict'
const Point = require('./Point');
const DEFAULTS = require('./defaultSettings.js');

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
        maxRadius: this.pointRadius,
        halflifeRatio: this.pointHalflife,
        maxDX: this.pointDX,
        maxDY: this.pointDY,
        gradient: this.gradient
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

  changeFramerate(newFramerate) {
    this.interval = this._setInterval(newFramerate);
  }
}

module.exports = Field;