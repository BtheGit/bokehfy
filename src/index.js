'use strict'
const Bokeh = require('./components/Bokeh');

/**
 * Users have an option to call bokehfy with a settings object (containing a
 * DOM element), with a DOM element, or with nothing. In the case that nothing is 
 * passed or a valid settings object with no parent, bokehfy assumes a full screen 
 * effect is desired and the new canvas will be directly prepended to the DOM body.
 * In the case that an invalid Element is passed, bokehfy will not instantiate
 * a new Field instance or create a canvas and simply return null for error catching.
 * 
 */


const isValidElement = obj => {
  return obj instanceof Element;
}

const bokehfy = (settings = window.document.body) => {
  if(settings === Object(settings) && typeof settings === 'object') {
    if (isValidElement(settings)) {
      const settingsObj = {
        parent: settings
      }
      return new Bokeh(settingsObj);
    }
    else if (settings.hasOwnProperty('parent')){
      if(isValidElement(settings.parent)){
        return new Bokeh(settings)
      }
      else {
        return null;
      }
    }
    else {
      const settingsObj = Object.assign({}, settings, {parent: window.document.body})
      return new Bokeh(settingsObj)
    }
  }
  else {
    return null;
  }
}


module.exports = bokehfy;