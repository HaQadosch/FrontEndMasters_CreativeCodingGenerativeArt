# FrontEndMasters_CreativeCodingGenerativeArt

  * Course is on [FrontEndMasters](https://frontendmasters.com/courses/canvas-webgl)
  * GithubRepo also [available](https://github.com/mattdesl/workshop-generative-art)

# Let's make art.

## Course Intro, installation

  * [canvas-sketch-cli](https://github.com/mattdesl/canvas-sketch)
  * [canvas-sketch-util](https://github.com/mattdesl/canvas-sketch-util/)
  * [threejs](https://github.com/mrdoob/three.js)

## Installing canvas-sketch-cli

```sh
> npm i canvas-sketch-cli
```

It's not global so we add a script in `package.json`

```json
{
  "scripts": {
    "canvas": "canvas-sketch"
  }
}
```

We create a new folder `genart` from the root folder.

To create a JavaScript file frow a sketch template:
```sh
> cd genart
> npm run canvas -- genart/sketch.js --new --open
```

  - `--new` will create the js file with the canvas-sketch template.
  - `--open` will open a browser.

## Canvas Sketch Introduction

  * [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) doc, keep as a reference.

## Canvas API Basics

Drawing a circle via [CanvasRenderingContext2D.arc()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc)

`context` is the elt where all the drawings will be applied
```js
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
```


Rendering a path

  * `fill()`, fills the shape.
  * `stroke()` highlights the shape. 
  * All parameters must be set before we call the functions.


```js
context.fillStyle = 'purple'
context.arc(width / 2, height / 2, 200, 0, 2 * Math.PI, false)
context.fill()
```

Basic functions are covered in the [cheatsheet](https://github.com/mattdesl/workshop-generative-art/blob/master/docs/cheat-sheet.md).

## Canvas Sketch Application

Selecting the canvas and hitting the save command will trigger a fetch and save the canvas as an image directly in your Downloads folder.

Since we can download the canvas in a png, we can use some presets for the dimensions
```js
const settings = {
  dimensions: [ 2048, 2048 ]
}
```
like:

  * A4, A3
  * letter
  * postcard

The resolution assumed by canvas is `72px` by Default. The import will appear blurry if we print it for example.
We can set the resolution to higher value in the `settings`
```js
const settings = {
  dimensions: 'A4',
  pixelsPerInch: 300
}
```
Choosing the size of the `path` using pixels will make the art size dependant on the resolution/`pixelsPerInch` settings. To avoid this issue we can make them dependant on the size of the screen/`dimensions` settings.
```js
// Pixels
context.arc(width / 2, height / 2, 300, 0, 2 * Math.PI, false)
context.lineWidth = 40
// Screen size
context.arc(width / 2, height / 2, width * 0.2, 0, 2 * Math.PI, false)
context.lineWidth = width * 0.05
```

From pixels to inches.

You can set the `units` in your settings:

  * in -> inches
  * cm -> cm
  * ft -> feet
  * ...

```js
const settings = {
  dimensions: 'A4',
  untis: 'cm',
  pixelsPerInch: 300
}
```
So now `context.lineWidth = 2` means 2 cm and not 2 pixels.

We can also set the `orientation` to either portrait or landscape.
```js
const settings = {
  dimensions: 'A4',
  orientation: 'landscape',
  untis: 'cm',
  pixelsPerInch: 300
}
```

It might be easier to first work in a big square format, all in pixels units and then migrate to a setting fitting the export you want when you are done with your artwork.

## The Grid

The grid is like a theme used as a scaffold to start placing together the different elements of your art.

1. It can be a grid of the same element repeated (unicodes, shapes)
2. and then add some randomness in the size/position/orientation
3. and then some random colors, pallettes
4. increase the number of row/cols
5. add some animation?

A function based randomness like Gaussian is more interresting than the pure `Math.random`. We can have some nice distribution and apply some noise as well to make all this randomisation more artsy.

The workflow is to start very simple and then get more complex by iterations, following our inspiration/curiosity.

# Drawing the Grid

We can normalize the coordinates space by the number of elts in a row/column/whathaveyou:
  * from (x, y) 0 -> 2048 
  * to (u, v) 0 -> 1
  * u = x / nbrOfElts
  * v = y * height

Linear interpolation can become handy in this kind of scenario.

# Linear interpolation

We want to have some margin space and give the genart some breathing room.

  * We'll be using the [util](https://github.com/mattdesl/canvas-sketch-util/) library.
  * In the [math](https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/math.md) module, 
  * let's use the linear interpolation [lerp](https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/math.md#lerp) function

```js
  points.forEach(([ u, v ]) => {
    const x = lerp(min, max, x)
    // min & max: margin space
    // x: cardinal postion, current elt is the Xth elt 
  })
```

