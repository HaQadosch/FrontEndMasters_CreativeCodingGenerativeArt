import canvasSketch from 'canvas-sketch'
import { lerp } from 'canvas-sketch-util/math'
import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'

const settings = {
  dimensions: [ 2048, 2048 ]
}

const sketch = () => {
  // Local state functions.
  const randomMax = random.rangeFloor(2, palettes[0].length + 1)
  const palette = random.shuffle(random.pick(palettes)).slice(0, randomMax)

  const createGrid = () => {
    const points = []
    const count = 40 // Grid size, meaning 5x5.
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // sets the space (width & height) between 0 and 1.
        // Normalize?
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        const radius = (0.5 + 0.5 * random.noise2D(u, v)) * 0.015
        points.push({
          color: random.pick(palette),
          position: [ u, v ],
          radius
        })
      }
    }
    return points
  }

  // random.setSeed(10112019)
  const points = createGrid().filter(() => random.value() > 0.5)
  const margin = 400

  // Render function.
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    points.forEach(({ position: [ u, v ], radius, color }) => {
      // Project back to the 2048 pixels dimension.
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      context.arc(x, y, radius * width, 0, Math.PI * 2, false)
      context.fillStyle = color
      context.fill()
    })
  }
}

canvasSketch(sketch, settings)
