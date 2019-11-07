import canvasSketch from 'canvas-sketch'

const settings = {
  dimensions: [ 2048, 2048 ]
  // untis: 'cm',
  // dimensions: 'A4',
  // orientation: 'landscape',
  // pixelsPerInch: 300
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'orange'
    context.fillRect(0, 0, width, height)

    // Rendering a circle is rendering a path.
    context.beginPath()
    context.fillStyle = 'purple'
    context.arc(width / 2, height / 2, width * 0.2, 0, 2 * Math.PI, false)
    context.fill()

    context.lineWidth = width * 0.05
    context.strokeStyle = 'green'
    context.stroke()
  }
}

canvasSketch(sketch, settings)
