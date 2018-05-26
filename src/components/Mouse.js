'use strict'
const { throttle } = require('../utilities');

class Mouse {
    constructor(canvas){
        // this.canvas = canvas;
        this.x;
        this.y;
        this.eventListener = this.mouseMoveListener(canvas);
        this.init(canvas);
    }

    init(canvas){
        // set up event listeners
        canvas.addEventListener('mousemove', this.eventListener)
    }

    unmount(){
        // remove event listeners
        canvas.removeEventListener('mousemove', this.eventListener)
    }

    mouseMoveListener(canvas){
        const func = e => {
            const pos = this.getPos(canvas, e);
            this.x = pos.x;
            this.y = pos.y;
        }

        const throttledFunc = throttle(func, );

        return throttledFunc;
        
    }

    getPos(canvas, evt){
        const rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }
}

module.exports = Mouse;