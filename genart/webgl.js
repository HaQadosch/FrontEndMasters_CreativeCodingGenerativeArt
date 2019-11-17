// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three')

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls')

const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const eases = require('eases')
const BezierEasing = require('bezier-easing')

const palettes = require('nice-color-palettes')
const palette = random.pick(palettes)

const settings = {
  dimensions: [521, 521],
  fps: 24,
  duration: 4,
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  attributes: { antialias: true }
}

const THREE = global.THREE

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  })

  // WebGL background color
  renderer.setClearColor('hsl(0, 0%, 95%)', 1)

  // Setup a camera
  const camera = new THREE.OrthographicCamera()

  // Setup your scene
  const scene = new THREE.Scene()

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  for (let i = 0; i < 40; i++) {
    const material = new THREE.MeshStandardMaterial({
      color: random.pick(palette)
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    )
    mesh.scale.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    )
    mesh.scale.multiplyScalar(0.3)
    scene.add(mesh)
  }

  scene.add(new THREE.AmbientLight('hsl(0, 0%, 25%)'))

  const light = new THREE.DirectionalLight('white', 1)
  light.position.set(2, 2, 4)
  scene.add(light)

  const easeFn = BezierEasing(0.17, 0.67, 0.83, 0.67)

  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(viewportWidth, viewportHeight, false)

      const aspect = viewportWidth / viewportHeight
      const zoom = 2.0

      camera.left = -zoom * aspect
      camera.right = zoom * aspect
      camera.top = zoom
      camera.bottom = -zoom

      camera.near = -100
      camera.far = 100

      camera.position.set(zoom, zoom, zoom)
      camera.lookAt(new THREE.Vector3())

      camera.updateProjectionMatrix()
    },
    // Update & render your scene here
    render ({ playhead }) {
      const sin = Math.sin(playhead * Math.PI)
      scene.rotation.y = easeFn(sin)
      renderer.render(scene, camera)
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload () {
      renderer.dispose()
    }
  }
}

canvasSketch(sketch, settings)
