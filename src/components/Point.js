'use strict'

class Point {
  constructor({
      canvas, 
      ctx, 
      color = {r: 77, g: 101, b: 181}, 
      halflifeRatio = 250,
      maxRadius = 35,
      maxDX = 5,
      maxDY = 2
    }) {
    this.max_dx = maxDX;
    this.max_dy = maxDY;
    this.max_r = maxRadius;
    this.canvas = canvas;
    this.ctx = ctx;
    this.color = color;
    this.halflifeRatio = halflifeRatio;
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.r = (Math.random() * this.max_r) + 1;
    this.dx = (Math.random() * this.max_dx) * (Math.random() > .5 ? -1 : 1);
    this.dy = (Math.random() * this.max_dx) * (Math.random() > .5 ? -1 : 1);
    this.halflife = this.halflifeRatio * (this.r / this.max_r);
    this.colorStop = (Math.random() * .2) + .4;
    this.ratio = Math.random() * this.halflife;
    this.dratio = Math.random() + 1;
    this.gradient = null;
  }

  //### API

  draw() {
    if(this.ratio <= 0 || this.ratio >= this.halflife) {
      this.dratio *= -1;
    }

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();

    const opacity = 1 - (this.ratio/this.halflife);
    const opacityRatio = this.ratio * opacity;
    this.gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, (opacityRatio <= 0 ? 1 : opacityRatio));
    this.gradient.addColorStop(0.0, 'rgba(255,255,255,' + opacity + ')');
    this.gradient.addColorStop(this.colorStop, `rgba(${this.color.r},${this.color.g},${this.color.b},${(opacity * .5)})`);
    this.gradient.addColorStop(1.0, `rgba(${this.color.r},${this.color.g},${this.color.b}, 0)`);
    this.ctx.fillStyle = this.gradient;
    this.ctx.fill();
  }

  move() {
    this.x += (this.ratio / this.halflife) * this.dx;
    this.y += (this.ratio / this.halflife) * this.dy;
    if(this.x > (this.canvas.width + 50) || this.x < -50) this.dx *= -1;
    if(this.y > (this.canvas.height + 50) || this.y < -50) this.dy *= -1;
  }

  pulse() {
    this.ratio += this.dratio;
  }


  recolor(color) {
    this.color = color;
  }

  changeHalflife(newHalflife) {
    this.halflifeRatio = newHalflife;
    this.halflife = this.halflifeRatio * (this.r / this.max_r);
  }

  resize(newMaxRadius) {
    this.max_r = newMaxRadius;
    this.r = (Math.random() * this.max_r) + 1;
    this.halflife = this.halflifeRatio * (this.r / this.max_r);    
  }

  changeDX(newDX) {
    this.max_dx = newDX;    
    this.dx = (Math.random() * this.max_dx) * (Math.random() > .5 ? -1 : 1);
  }

  changeDY(newDY) {
    this.max_dy = newDY;
    this.dy = (Math.random() * this.max_dy) * (Math.random() > .5 ? -1 : 1);
  }
}

module.exports = Point;