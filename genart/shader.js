const canvasSketch = require('canvas-sketch')
const createShader = require('canvas-sketch-util/shader')
const glsl = require('glslify')

// Setup our sketch
const settings = {
  context: 'webgl',
  animate: true
}

// Your glsl code
const frag = glsl/* glsl */`
  precision highp float;

  uniform float time;
  uniform float aspectRatio;
  varying vec2 vUv;

  void main () {
    vec3 colorA = vec3(1.0, 1.0, 0.0);
    vec3 colorB = vec3(0.0, 1.0, 1.0);

    vec2 center = vUv - 0.5;
    center.x *= aspectRatio;
    float dist = length(center);

    vec3 color = mix(colorA, colorB, vUv.x);
    float opacity = dist > 0.25 ? 0.0 : 1.0 ;
    gl_FragColor = vec4(color, opacity);
  }
`

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
  // Create the shader and return it
  return createShader({
    // Pass along WebGL context
    gl,
    // Specify fragment and/or vertex shader strings
    frag,
    // Specify additional uniforms to pass down to the shaders
    uniforms: {
      // Expose props from canvas-sketch
      time: ({ time }) => time,
      aspectRatio: ({ width, height }) => width / height
    }
  })
}

canvasSketch(sketch, settings)
