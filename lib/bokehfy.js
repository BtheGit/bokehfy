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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Field = __webpack_require__(1);

//   /**
//    * Take in a hex value for a color (later any type) and return an object
//    * containing the RGB values separated.
//    * @param  {string} color [Hex value]
//    * @return {object}       [eg {r: 255, g: 0, b: 100}]
//    */
//   const convertColors = color => {

//   }


var Bokehfy = function () {
  function Bokehfy() {
    var parentElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.document.body;

    _classCallCheck(this, Bokehfy);

    this.parent = parentElement;
    this.canvas = this.createCanvas(this.parent);
    this.field = this.init(this.canvas);
    this.fitCanvas = this.fitCanvas.bind(this);
    window.addEventListener('resize', this.fitCanvas);
  }

  _createClass(Bokehfy, [{
    key: 'init',


    /**
     * Create a new bokeh field instance. The user can optionally provide a parent
     * element to attach the canvas too. If none is provided it will be attached to the
     * document body and automatically set to full screen.
     * @param  {Node} parentNode [Optional: Parent element that will contain the canvas]
     * @return {Field}        [An instance of the bokehfy field with public methods]
     */
    value: function init() {
      this.fitCanvas();
      var field = new Field(this.canvas);
      return field;
    }

    /**
     * Create a new canvas element and attach it to the DOM, sized to fit the 
     * parent element provided (defaulting to 'body' if none is provided).
     * @param  {Node} parent [Container for canvas - body if none povided]
     * @return {canvas}               [canvas element attached to DOM]
     */

  }, {
    key: 'createCanvas',
    value: function createCanvas() {
      var canvas = window.document.createElement('canvas');
      if (this.parent === window.document.body) {
        canvas.setAttribute('style', "position: fixed; top: 0; left: 0;");
      }
      this.parent.appendChild(canvas);
      return canvas;
    }

    /**
     * Canvas will be resized to fit it's current parent
     * @param  {Canvas} canvas [Canvas already attached to DOM]
     **/

  }, {
    key: 'fitCanvas',
    value: function fitCanvas() {
      var width = this.canvas.parentNode.clientWidth;
      var height = this.canvas.parentNode.clientHeight;
      this.canvas.setAttribute('width', width);
      this.canvas.setAttribute('height', height);
    }

    //API

  }, {
    key: 'pause',
    value: function pause() {
      this.field.pause();
    }
  }, {
    key: 'delete',
    value: function _delete() {
      window.removeEventListener('resize', this.fitCanvas);
      this.parent.removeChild(this.canvas);
    }

    /**
     * Take in custom settings object with parameters. Change parameters if possible.
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     * {
     *   backgroundColor,
     *   pointColor,
     *   pointCount,
     *   speed,
     *   size
     * }
     */

  }, {
    key: 'settings',
    value: function settings(obj) {}
  }]);

  return Bokehfy;
}();

module.exports = Bokehfy;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = __webpack_require__(2);

var FRAMERATE = 60;
var INTERVAL = 1000 / FRAMERATE;

/**
 * A new canvas will be created
 */

var Field = function () {
  function Field(canvas) {
    _classCallCheck(this, Field);

    this.animationFrame = null;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.BG = '#111';
    this.pointColor = { r: 77, g: 101, b: 181 };
    this.points = this.generatePoints();
    this.start();
  }

  _createClass(Field, [{
    key: 'generatePoints',
    value: function generatePoints() {
      var points = [];
      for (var i = 0; i < 100; i++) {
        points.push(new Point(this.canvas, this.ctx, this.pointColor, 30));
      }
      return points;
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      var then = Date.now();
      var delta = void 0;

      var draw = function draw(timestamp) {
        var now = Date.now(timestamp);
        delta = now - then;
        if (delta > INTERVAL) {
          _this.clear();
          _this.animatePoints();

          then = now - delta % INTERVAL;
        }
        _this.animationFrame = requestAnimationFrame(draw);
      };
      this.animationFrame = requestAnimationFrame(draw);
    }
  }, {
    key: 'stop',
    value: function stop() {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (this.animationFrame) {
        this.stop();
      } else {
        this.start();
      }
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.ctx.fillStyle = this.BG;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      // ctx.clearRect(0,0, canvas.width, canvas.height)
    }
  }, {
    key: 'animatePoints',
    value: function animatePoints() {
      for (var i = 0; i < this.points.length; i++) {
        this.points[i].pulse();
        this.points[i].draw();
        this.points[i].move();
      }
    }
  }]);

  return Field;
}();

module.exports = Field;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
  function Point(canvas, ctx, color, framerate) {
    _classCallCheck(this, Point);

    this.PRESETS = {
      max_dx: 5,
      max_dy: 2,
      max_r: 35,
      halflife: 8000 / framerate
    };
    this.canvas = canvas;
    this.ctx = ctx;
    this.color = color;
    this.reset();
  }

  _createClass(Point, [{
    key: 'reset',
    value: function reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.r = Math.random() * this.PRESETS.max_r + 1;
      this.dx = Math.random() * this.PRESETS.max_dx * (Math.random() > .5 ? -1 : 1);
      this.dy = Math.random() * this.PRESETS.max_dx * (Math.random() > .5 ? -1 : 1);
      this.hl = this.PRESETS.halflife * (this.r / this.PRESETS.max_r);
      this.colorStop = Math.random() * .2 + .4;
      this.ratio = Math.random() * this.hl;
      this.dratio = Math.random() + 1;
    }
  }, {
    key: 'draw',
    value: function draw() {
      if (this.ratio <= 0 || this.ratio >= this.hl) {
        this.dratio *= -1;
      }

      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.fill();

      var opacity = 1 - this.ratio / this.hl;
      var opacityRatio = this.ratio * opacity;
      var gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, opacityRatio <= 0 ? 1 : opacityRatio);
      gradient.addColorStop(0.0, 'rgba(255,255,255,' + opacity + ')');
      gradient.addColorStop(this.colorStop, 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + opacity * .5 + ')');
      gradient.addColorStop(1.0, 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ', 0)');
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    }
  }, {
    key: 'move',
    value: function move() {
      this.x += this.ratio / this.hl * this.dx;
      this.y += this.ratio / this.hl * this.dy;
      if (this.x > this.canvas.width + 50 || this.x < -50) this.dx *= -1;
      if (this.y > this.canvas.height + 50 || this.y < -50) this.dy *= -1;
    }
  }, {
    key: 'pulse',
    value: function pulse() {
      this.ratio += this.dratio;
    }
  }]);

  return Point;
}();

module.exports = Point;

/***/ })
/******/ ]);
});