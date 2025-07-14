import './index.css'
import Experience from '@class/Experience'
import { useEffect, useRef } from 'react'

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      new Experience(canvasRef.current)
    }
  }, [])

  return (
    <div className="experience">
      <canvas className="experience-canvas" ref={canvasRef}></canvas>
    </div>
  )
}

export default Canvas
