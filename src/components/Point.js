'use strict'

class Point {
  constructor(canvas, ctx, color, framerate) {
    this.PRESETS = {
      max_dx:5,
      max_dy:2,
      max_r: 35,
      halflife: 8000 / framerate
    };
    this.canvas = canvas;
    this.ctx = ctx;
    this.color = color;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.r = (Math.random() * this.PRESETS.max_r) + 1;
    this.dx = (Math.random() * this.PRESETS.max_dx) * (Math.random() > .5 ? -1 : 1);
    this.dy = (Math.random() * this.PRESETS.max_dx) * (Math.random() > .5 ? -1 : 1);
    this.hl = this.PRESETS.halflife * (this.r / this.PRESETS.max_r);
    this.colorStop = (Math.random() * .2) + .4;
    this.ratio = Math.random() * this.hl;
    this.dratio = Math.random() + 1;
  }

  draw() {
    if(this.ratio <= 0 || this.ratio >= this.hl) {
      this.dratio *= -1;
    }

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();

    const opacity = 1 - (this.ratio/this.hl);
    const opacityRatio = this.ratio * opacity;
    const gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, (opacityRatio <= 0 ? 1 : opacityRatio));
    gradient.addColorStop(0.0, 'rgba(255,255,255,' + opacity + ')');
    gradient.addColorStop(this.colorStop, `rgba(${this.color.r},${this.color.g},${this.color.b},${(opacity * .5)})`);
    gradient.addColorStop(1.0, `rgba(${this.color.r},${this.color.g},${this.color.b}, 0)`);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  }

  move() {
    this.x += (this.ratio / this.hl) * this.dx;
    this.y += (this.ratio / this.hl) * this.dy;
    if(this.x > (this.canvas.width + 50) || this.x < -50) this.dx *= -1;
    if(this.y > (this.canvas.height + 50) || this.y < -50) this.dy *= -1;
  }

  pulse() {
    this.ratio += this.dratio;
  }
}

module.exports = Point;