'use strict'
const Point = require('./Point');

class Field {
  constructor(canvas) {
    this.interval = this._setInterval()
    this.animationFrame = null;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.transparent = false;
    this.BG = '#111';
    this.pointColor = {r: 77, g: 101, b: 181};
    this.gradient = null;
    this.pointRadius = 35;
    this.pointHalflife = 250;
    this.pointDX = 5;
    this.pointDY = 2;
    this.points = this._generatePoints();
    this._start()
  }

  _setInterval(framerate = 30) {
    return 1000 / framerate;
  }

  _generatePoints(density = 100) {
    const points = [];
    for (let i = 0; i < density; i++) {
      points.push(new Point({
        canvas: this.canvas, 
        ctx: this.ctx, 
        color: this.pointColor,
        maxRadius: this.pointRadius,
        halflifeRatio: this.pointHalflife,
        maxDX: this.pointDX,
        maxDY: this.pointDY,
        gradient: this.gradient
      }))
    }
    return points;
  }

  _start() {
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

  _stop() {
    cancelAnimationFrame(this.animationFrame)
    this.animationFrame = null;
  }

  _clear() {
    if(this.transparent) {
      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
    }
    else {
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
  pause() {
    if(this.animationFrame) {
      this._stop();
    } 
    else {
      this._start();
    }
  }

  recolorPoints(color) {
    this.pointColor = color;
    this.points.forEach(point => {
      point.recolor(this.pointColor);
    });
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