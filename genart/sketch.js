import canvasSketch from 'canvas-sketch'

const settings = {
  dimensions: [ 2048, 2048 ]
  // untis: 'cm',
  // dimensions: 'A4',
  // orientation: 'landscape',
  // pixelsPerInch: 300
}

const sketch = () => {
  // Local state functions.
  const createGrid = () => {
    const points = []
    const count = 5 // Grid size, meaning 5x5.
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // sets the space (width & height) between 0 and 1.
        // Normalize?
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        points.push([ u, v ])
      }
    }
    return points
  }

  const points = createGrid()
  // Render function.
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    points.forEach(([ u, v ]) => {
      // Project back to the 2048 pixels dimension.
      const x = u * width
      const y = v * height

      context.beginPath()
      context.arc(x, y, 100, 0, Math.PI * 2, false)
      context.strokeStyle = 'black'
      context.lineWidth = 40
      context.stroke()
    })
  }
}

canvasSketch(sketch, settings)
