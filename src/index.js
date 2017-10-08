'use strict'
const Bokeh = require('./components/Bokeh');

const bokehfy = (parentElement = window.document.body) => {
  return new Bokeh(parentElement);
}

module.exports = bokehfy;