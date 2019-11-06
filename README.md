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


