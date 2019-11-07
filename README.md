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


### Rendering a path

  * `fill()`, fills the shape.
  * `stroke()` highlights the shape. 
  * All parameters must be set before we call the functions.


```js
context.fillStyle = 'purple'
context.arc(width / 2, height / 2, 200, 0, 2 * Math.PI, false)
context.fill()
```

Basic functions are covered in the [cheatsheet](https://github.com/mattdesl/workshop-generative-art/blob/master/docs/cheat-sheet.md).

