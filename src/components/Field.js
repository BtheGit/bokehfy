'use strict'
const Point = require('./Point');

const FRAMERATE = 60;
const INTERVAL = 1000 / FRAMERATE;

/**
 * A new canvas will be created
 */
class Field {
  constructor(canvas) {
    this.animationFrame = null;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.BG = '#111';
    this.pointColor = {r: 77, g: 101, b: 181};
    this.points = this.generatePoints();
    this.start()
  }

  generatePoints() {
    const points = [];
    for (let i = 0; i < 100; i++) {
      points.push(new Point(this.canvas, this.ctx, this.pointColor, 30))
    }
    return points;
  }

  start() {
    let then = Date.now()
    let delta;

    const draw = timestamp => {
      const now = Date.now(timestamp);
      delta = now - then;
      if(delta > INTERVAL) {
        this.clear();
        this.animatePoints();

        then = now - (delta % INTERVAL)
      }
      this.animationFrame = requestAnimationFrame(draw);
    }
    this.animationFrame = requestAnimationFrame(draw)
  }

  stop() {
    cancelAnimationFrame(this.animationFrame)
    this.animationFrame = null;
  }

  clear() {
    this.ctx.fillStyle = this.BG;
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    // ctx.clearRect(0,0, canvas.width, canvas.height)
  }

  animatePoints() {
    for(let i = 0; i < this.points.length; i++) {
      this.points[i].pulse();
      this.points[i].draw();
      this.points[i].move();
    }      
  }
}

module.exports = Field;