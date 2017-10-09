# Bokehfy 

## A super-light library to add flickering bokeh points to the DOM
[Demo](https://bthegit.github.io/bokehfy/)

![Screenshot](bokehfy2.png)

### Getting Started

In Node.js:

```npm i -S bokehfy```

```import bokehfy from 'bokehfy'```

or 

```const bokehfy = require('bokehfy')```


In the browser:

Add bokehfy.min.js to your webpage.

```<script src="https://cdn.jsdelivr.net/npm/bokehfy@0.1.7/lib/bokehfy.min.js"></script>```

Create a new Bokeh field instance by calling bokehfy()
Valid parameters: no parameters, a DOM element, a settings object (with or without a DOM element parent included)

If bokehfy is called without any parameters it will create a full-size instance with default parameters and prepend it to the window.document.body.

If a valid DOM element is passed an instance will be created and prepended to the DOM element with default paramters.

If a settings object is passed with no parent key then the DOM body will be assumed.

bokehfy() will return null in the case of an invalid parent element being passed, either alone or in the settings object.

Save the result of bokehfy() to a variable to have access to additional methods.

```const field = bokehfy();```

NOTE: bokehfy() makes use of [Tiny Color](https://github.com/bgrins/TinyColor) for color validation and conversion. Any valid CSS color format should work. Colors are converted to an RGB object for use so alpha values may be lost.

### Methods

#### start
```field.start()```

#### stop
```field.stop()```

#### pause

```field.pause()```

Cancel requestAnimationFrame until pause() or start() is called again.

#### delete
```field.delete()```

Stop animation, remove window listeners, and remove the field instance from its DOM parent.

#### toggleBackground
```field.toggleBackground()```

Toggle background transparency. No parameters.

#### transparent
```field.transparent(true)```

Set background transparency by passing a boolean value.

#### backgroundColor

Set new background color by passing a valid color. 

#### radius

#### color

#### gradient

#### density

#### halflife

#### framerate

#### dx

#### dy

#### settings



Notes:
ES5 module.exports used in favor of import/export to avoid open webpack issue that means library is accessible as 'libraryName.default' rather than just 'libraryName'