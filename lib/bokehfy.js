(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bokehfy", [], factory);
	else if(typeof exports === 'object')
		exports["bokehfy"] = factory();
	else
		root["bokehfy"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Field = __webpack_require__(1);

function bokehfy() {


  /**
   * Take in a hex value for a color (later any type) and return an object
   * containing the RGB values separated.
   * @param  {string} color [Hex value]
   * @return {object}       [eg {r: 255, g: 0, b: 100}]
   */
  const convertColors = color => {

  }

  /**
   * Create a new canvas element and attach it to the DOM, sized to fit the 
   * parent element provided (defaulting to 'body' if none is provided).
   * @param  {Node} parentElement [Container for canvas - body if none povided]
   * @return {canvas}               [canvas element attached to DOM]
   */
  const createCanvas = parentElement => {
    const canvas = window.document.createElement('canvas')
    if(parentElement === window.document.body) {
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
    const width = canvas.parentNode.clientWidth;
    const height = canvas.parentNode.clientHeight;
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
  const init = (parentElement = window.document.body) => {
    const canvas = createCanvas(parentElement)
    sizeCanvas(canvas)
    window.addEventListener('resize', () => sizeCanvas(canvas))
    const field = new Field(canvas)
    return field;
  }

  return {
    init
  }
};

module.exports = bokehfy();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Point = __webpack_require__(2);

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ })
/******/ ]);
});