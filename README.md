# Bokehfy 

## A super-light library to add flickering bokeh points to the DOM
[Demo](https://bthegit.github.io/bokehfy/)

### Getting Started

In Node.js:

```npm i -S bokehfy```

```import bokehfy from 'bokehfy'```

or 

```const bokehfy = require('bokehfy')```


In the browser:

Add bokehfy.min.js to your webpage.

```<script src="https://cdn.jsdelivr.net/npm/bokehfy@0.1.1/lib/bokehfy.min.js"></script>```

Create a new Bokeh field instance by calling bokehfy()
Bokehfy takes an optional parameter of an HTML element. 
If one is provided a new field will be created and appended to the provided element, otherwise if bokehfy is called without any parameters it will create a fullsized canvas and append it to the document.body.

Save the result of bokehfy() to a variable to have access to additional methods.

```const field = bokehfy();```

### Methods

#### pause

#### delete

#### backgroundColor

#### toggleBackground

#### resize

#### recolor

#### density

#### halflife

#### framerate

#### dx

#### dy



Notes:
ES5 module.exports used in favor of import/export to avoid open webpack issue that means library is accessible as 'libraryName.default' rather than just 'libraryName'