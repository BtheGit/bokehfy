
(function (root, factory) {
  'use strict'


    if (typeof define === 'function' && define.amd) {
        //AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        //CommonJS
        module.exports = factory();
    } else {
        // Script tag import i.e., IIFE
        root.bokehfy = factory();
  }
}(this, function () {
  const FRAMERATE = 60;
  const INTERVAL = 1000 / FRAMERATE;

  class Point {
    constructor(canvas, ctx, framerate) {
      this.PRESETS = {
        max_dx:5,
        max_dy:2,
        max_r: 35,
        halflife: 8000 / framerate
      };
      this.canvas = canvas;
      this.ctx = ctx;
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
      gradient.addColorStop(this.colorStop, 'rgba(77,101,181,' + (opacity * .5) + ')');
      gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
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

  /**
   * A new canvas will be created
   */
  class Field {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.BG = '#111';
      this.points = this.populateField();
      this.start()
    }

    populateField() {
      const points = [];
      for (let i = 0; i < 100; i++) {
        points.push(new Point(this.canvas, this.ctx, 30))
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
          this.ctx.fillStyle = this.BG;
          this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
          // ctx.clearRect(0,0, canvas.width, canvas.height)
          for(let i = 0; i < this.points.length; i++) {
            this.points[i].pulse()
            this.points[i].draw()
            this.points[i].move()
          }

          then = now - (delta % INTERVAL)
        }

        requestAnimationFrame(draw);
      }
      draw()
    }
  }

  /**
   * Create a new canvas element and attach it to the DOM, sized to fit the 
   * parent element provided (defaulting to 'body' if none is provided).
   * @param  {Node} parentElement [Container for canvas - body if none povided]
   * @return {canvas}               [canvas element attached to DOM]
   */
  const createCanvas = parentElement => {
    const canvas = this.document.createElement('canvas')
    if(parentElement === this.document.body) {
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
    width = canvas.parentNode.clientWidth;
    height = canvas.parentNode.clientHeight;
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
  const init = (parentElement = this.document.body) => {
    const canvas = createCanvas(parentElement)
    sizeCanvas(canvas)
    this.addEventListener('resize', () => sizeCanvas(canvas))
    const field = new Field(canvas)
    // _animate(canvas) 
  }

  return {
    init
  }
}));
