import canvasSketch from 'canvas-sketch'
import { lerp, inverseLerp } from 'canvas-sketch-util/math'
import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'

const settings = {
  dimensions: [ 2048, 2048 ]
}

const sketch = () => {
  // Local state functions.
  const gridSize = 6
  const drawTrapezoide = (ctx, lerpx, lerpy) => ([u1, v1], [u2, v2], color) => {
    const region = new window.Path2D()
    ctx.beginPath()
    const x1 = lerpx(u1)
    const y1 = lerpy(v1)
    const x2 = lerpx(u2)
    const y2 = lerpy(v2)
    const bottom = lerpy(gridSize - 1)
    region.moveTo(x1, bottom)
    region.lineTo(x1, y1)
    region.lineTo(x2, y2)
    region.lineTo(x2, bottom)
    region.closePath()

    ctx.fillStyle = color
    ctx.fill(region)
  }

  const createGrid = () => {
    const points = []
    const count = gridSize
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // sets the space (width & height) between 0 and 1.
        // Normalize?
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        const radius = 5

        points.push({
          color: 'black',
          position: [ u, v ],
          radius
        })
      }
    }
    return points
  }

  // random.setSeed(10112019)
  const points = createGrid()
  const margin = 400

  // Render function.
  return ({ context, width, height }) => {
    const lerpWidth = x => lerp(margin, width - margin, x)
    const lerpHeight = y => lerp(margin, height - margin, y)
    console.log({ start: margin, end: width - margin, lerpHeight })
    const drawTrap = drawTrapezoide(
      context,
      x => lerpWidth(x / (gridSize - 1)),
      y => lerpHeight(y / (gridSize - 1))
    )

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    points.forEach(({ position: [ u, v ], radius, color }) => {
      // Project back to the 2048 pixels dimension.
      const x = lerpWidth(u)
      const y = lerpHeight(v)
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2, false)
      context.fillStyle = color
      context.fill()
    })

    const sixes = [0, 1, 2, 3, 4, 5]
    const _1 = random.shuffle(sixes)
    const _2 = random.shuffle(sixes)
    const _3 = random.shuffle(sixes)
    const _4 = random.shuffle(sixes)
    drawTrap(_1, _2, 'blue')
    drawTrap(_3, _4, 'green')
  }
}

canvasSketch(sketch, settings)
