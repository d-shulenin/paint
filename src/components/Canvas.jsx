import { useEffect, useRef } from "react"
import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import Brush from "../tools/Brush"

const Canvas = () => {
  const canvasRef = useRef()
  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    toolState.setTool(new Brush(canvasState.canvas, canvasState.context))
  }, [])
  return (
    <div className="canvas">
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Canvas
