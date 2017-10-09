'use strict'

class Point {
  constructor({
      canvas, 
      ctx, 
      gradient = [{r: 255, g: 255, b: 255}], 
      halflifeRatio = 450,
      maxRadius = 80,
      maxDX = 2,
      maxDY = 0.5
    }) {
    this.max_dx = maxDX;
    this.max_dy = maxDY;
    this.max_r = maxRadius;
    this.canvas = canvas;
    this.ctx = ctx;
    this.gradient = gradient;
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
    this.fillStyle = null;
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

    this.fillStyle = this.createGradient(this.gradient);
    this.ctx.fillStyle = this.fillStyle;
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

  createGradient(grads = []) {
    const opacity = 1 - (this.ratio/this.halflife);
    const opacityRatio = this.ratio * opacity;
    const gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, (opacityRatio <= 0 ? 1 : opacityRatio));
    if(grads) {
      if(grads.length > 3) {
        grads = grads.slice(0,4)
      }

      if(grads.length === 1) {
        gradient.addColorStop(0, `rgba(${grads[0].r}, ${grads[0].g}, ${grads[0].b}, ${opacity})`)
      }
      else if(grads.length === 2) {
        gradient.addColorStop(0, `rgba(${grads[0].r}, ${grads[0].g}, ${grads[0].b}, ${opacity})`)
        gradient.addColorStop(1, `rgba(${grads[1].r}, ${grads[1].g}, ${grads[1].b}, 0)`)      
      }
      else {
        gradient.addColorStop(0, `rgba(${grads[0].r}, ${grads[0].g}, ${grads[0].b}, ${opacity})`)
        gradient.addColorStop(this.colorStop, `rgba(${grads[1].r}, ${grads[1].g}, ${grads[1].b}, ${(opacity * .5)})`)
        gradient.addColorStop(1, `rgba(${grads[2].r}, ${grads[2].g}, ${grads[2].b}, 0)`)      
      }
    }
    else {
      gradient.addColorStop(0.0, 'rgba(255,255,255,' + opacity + ')');
    }

    return gradient;
  }


  addGradient(newGradientArray) {
    this.gradient = newGradientArray;
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