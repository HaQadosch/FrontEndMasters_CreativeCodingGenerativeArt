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

# Adding Randomness

To add more interesting artifact, you can include some randomness.
Like working with more circles (1600) and randomly remove some of them.

`Math.random` has some feature that you might not want:
  * 0 < `Math.random` < 1, you might want bigger spread.
  * Too random, you might want some control over that randomness.

The [random](https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/random.md) utility library has some useful pseudo random functions.

## Fix randomness
`.setSeed()` sets the randomness so that `.value()` will always generate the same series.
```js
random.setSeed(uid) // uid: Number | String
random.value()
```

The uid could be the actual date, and you generate the _art of the day_ following the series of random number based on the uid for today.

You can then share the seed (the uid) to make sure the same art is generated using the same series of random values.

# Radius & Organic Randomness

## Workflow

1. Customize the setting: dimensions, margin, background, ...
2. Generate the data structure, grid size, circle radius, ...
3. Display the structure into the canvas

We want to play with the radius for each circle.
So now each circle need to handle:
  * it's u,v position
  * it's radius size

Setting the randow size of the circle with the width allow to get pretty mutch the same art even when you change the resolution.
```js
random = random.value() * 0.01
radius = random * width
```

`random.value()` is using a uniform distribution and the art keeps its grid structure very apparent.
`random.gaussian()` can genarate a more organic feel to the art.

Keep in mind that  `-3.5 < gaussian() < 3.5` and generating negative numbers can be a pbm when you're dealing with size for example.

You can:
  * `Math.abs(random.gaussian())`
  * `Math.max(0, random.gaussian())`
  * `0.01 + (random.gaussian() * 0.01)`

# Color Palette

We use `palettes` from `nice-color-palettes`
It's an array of palette, each palette with 5 color hexes.

Now, each of our circles will also handle it's filler color.

`random.pick(elts)` selects a elt at random from the elts given.

```js
import palettes from 'nice-color-palettes'
const palette = random.pick(palettes)
const color = random.pick(palette)
```

5 colors per palette might be a bit too much, so you can slice the array of hexes to restrain the choice of colors (or destructure the palette).

```js
const [c1, c2, c3, c4, c5] = random.pick(palettes)
const color = random.pick([c2, c3, c4])
```

Or you can also randomise the number of colors used in the palette.
`random.floor(inclusiveMin, exclusiveMax)`

And after that, you can also shuffle the palette before slicing it, because the last color would be very seldomly be selected.

# Noise

`noise` gives a random number based on the coordinates of the elt.
The same coordinates return the same value between -1 and 1.
Each neighbour elt has a value close to the elt, so you end up with wavy generated art

```js
// values in the -1 .. 1 range
const v = noise2D(x, y)

// map to 0..1 range
const n = v * 0.5 + 0.5

// turn into a percentage
const L = Math.floor(n * 100)

// get color value
const hsl = `hsl(0, 0%, ${L}%)`
```

You can apply a frequency to the noise signal. You zoom ou, zoom in into the picture.
```js
const frequency = 5.0
const v = noise(x * frequency, y * frequency)
```

# Drawing with Text Characters

```js
context.fillStyle = color
context.font = '100px "Fira Code"'
context.fillText('A', x, y)
```

## Rotation

Canvas is state based, which means everytime you apply a rotation, the canvas will keep that rotation in place. If you apply a rotation again, it will add up to the previous state of the rotation.

You can cancel the rotation by applying the opposite rotation every time you're finished with an elt.
Or you can save the states of the transformations, apply all transformations for every elt and then restore the states.

```js
context.save()
// transformation of the elt, or all the elts.
context.restore()
```

All the rotations are centered in the top left point.
To rotate at point of elt, we can `translate` the canvas to the coordinates of the elt, apply the transformations at the origin `rotate(); fillText('', 0, 0)` and then `restore`.

