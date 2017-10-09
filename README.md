# Bokehfy 

## A small library to add animated bokeh effects to the DOM
[Demo](https://bthegit.github.io/bokehfy/)

![Screenshot](bokehfy2.png)

### Getting Started

#### In Node.js:

```
npm i -S bokehfy
import bokehfy from 'bokehfy'
```

or 

```
const bokehfy = require('bokehfy')
```


#### In the browser:

Add bokehfy.min.js to your webpage.

```
<script src="https://cdn.jsdelivr.net/npm/bokehfy@0.1.8/lib/bokehfy.min.js"></script>
```

#### Downloaded

Download [Minified library](https://rawgit.com/BtheGit/bokehfy/master/lib/bokehfy.min.js)

```
import bokehfy from './bokehfy.min.js'
```

#### Create a new Bokeh field instance by calling bokehfy()

```
bokehfy()
```

#### Save the result of bokehfy() to a variable to have access to additional methods during runtime.

```
const field = bokehfy()
```
___


## Instantiation parameters
Valid parameters: no parameters, a DOM element, a settings object (with or without a DOM element parent included)

* No parameters:  it will create a full-size instance with default parameters and prepend it to the window.document.body.

    ```
    const field = bokehfy()
    ```

* Valid DOM element: an instance will be created and prepended to the DOM element with default paramters.
    ```
    const container = document.getElementById('container')
    const field = bokehfy(container)
    ```


* Settings object with key/value pair {parent: Valid DOM Element}.
    ```
    const container = document.getElementById('container')

    const settings = {
        backgroundColor: '#00FF00', 
        parent: container
    }

    const field = bokehfy(settings)
    ```

* Settings object with no parent key then the DOM body will be assumed.

    ```
    const setup = {
        dx: 0,
        dy: 0,
        framerate: 10,
        gradient: ['red', 'pink'],
        density: 200,
        radius: 100,
        halflife: 1000,
        transparent: false,
        backgroundColor: '#AAA'
    }

    const field = bokehfy(setup)
    ```   

bokehfy() will return null in the case of an invalid parent element being passed, either alone or in the settings object.

### Valid initial settings parameters:
- parent: DOM Element,
- backgroundColor: string,
- transparent: boolean,
- color: string,
- star: string,
- gradient: array of strings,
- radius: number (0.00001 - 1000),
- halflife: number (0.00001 - 10000),
- density: number (0 - 2000),
- framerate: number (0 - 10000),
- dx: number (0 - 10000),
- dy: number (0 - 10000)

Please note that color, star, and gradient will overwrite each other. JS does not guarantee which order an object will be iterated through and it's not possible to guarantee which value will end up being processed last and therefore displayed.

---

*bokehfy() makes use of [Tiny Color](https://github.com/bgrins/TinyColor) for color validation and conversion. Any valid CSS color format should work. Currently, alpha values are not supported.*

---


## Methods

#### start
```
field.start()
```

#### stop
```
field.stop()
```

#### pause

```
field.pause()
```

Cancel requestAnimationFrame until pause() or start() is called again.

#### delete
```
field.delete()
```

Stop animation, remove window listeners, and remove the field instance from its DOM parent.

#### toggleBackground
```
field.toggleBackground()
```

Toggle background transparency. No parameters.

#### transparent
```
field.transparent(true)
```
*default = false*

Set background transparency by passing a boolean value.

#### backgroundColor
```
field.backgroundColor('purple')
field.backgroundColor('#00FF00')
```
*default = 'rgb(49, 159, 159)'*

Set new background color by passing a valid color as a string. 

### color
```
field.color('#ABC')
```
*no default*

Creates a solid color point with no gradient. Equivalent to calling gradient with an array with one element. eg ```field.gradient(['white])```

#### gradient
```
field.gradient(['white'])
field.gradient(['orangered', 'salmon'])
field.gradient(['white', 'red', 'blue'])
```
*default = ['white']*

Accepts an array of colors in order of colorstop from 0-1 (more than three will be truncated to the first three).

* One color will create a solid color point with no gradient.
* Two colors will create a gradient with the first color at stop 0 and the second at stop 1.
* Three colors will create a gradient with the first color at stop 0, the third at stop 1, and the second at a randomized stop somewhere between 0.4 and 0.6.

#### star
```
field.star('blue')
```
*no default*

Passing a single color will create a 3 stop gradient using white as the first stop and the passed color as the next two.

#### radius

```
field.radius(10)
```
*default = 90*

Pass valid number. Accepted range is 0.00001 - 1000. Valid numbers outside that range will be coerced to the nearest acceptable value.

#### halflife
```
field.halflife(500)
```
*default = 450*

Pass valid number. Accepted range is 0.00001 - 10000. Valid numbers outside that range will be coerced to the nearest acceptable value.

Halflife and radius work hand in hand. To better understand the relationship, you may want to play with the [demo](https://bthegit.github.io/bokehfy/)

#### density
```
field.density(100)
```
*default = 70*

Increase the number of points. Pass valid number. Accepted range is 0 - 2000. Valid numbers outside that range will be coerced to the nearest acceptable value.

Abusing the density is the quickest way to 'hot lap syndrome'

#### framerate
```
field.framerate(5)
```
*default = 30*

Pass valid number. Accepted range is 0 - 10000. Valid numbers outside that range will be coerced to the nearest acceptable value.

#### dx
```
field.dx(0)
```
*default = 4*

Horizontal point speed. Pass valid number. Accepted range is 0 - 10000. Valid numbers outside that range will be coerced to the nearest acceptable value.

#### dy
```
field.dy(10)
```
*default = 2*

Vertical point speed. Pass valid number. Accepted range is 0 - 10000. Valid numbers outside that range will be coerced to the nearest acceptable value.

#### settings
```
const setup = {
    dx: 0,
    dy: 0,
    framerate: 10,
    gradient: ['red', 'pink'],
    density: 200,
    radius: 100,
    halflife: 1000,
    transparent: false,
    backgroundColor: '#AAA'
}

field.settings(setup)
```
Allows you to pass an object with multiple settings during runtime. The object takes the same values as the initial setup object (except for parent which will be disregarded) - see instantiation parameters section for valid keys.

---

NOTE:
