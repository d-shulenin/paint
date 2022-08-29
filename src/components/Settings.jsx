import { useState, useEffect } from "react"
import toolState from "../store/toolState"

const Settings = () => {
  const [width, setWidth] = useState(5)
  useEffect(() => {
    toolState.tool?.changeLineWidth(width)
    console.log(width)
  }, [width])
  return (
    <div className="settings">
      <input
        className="settings__width"
        type="range"
        value={width}
        onChange={e => setWidth(e.target.value)}
        min={toolState.tool?.name === "eraser" ? 5 : 0}
        max={toolState.tool?.name === "eraser" ? 30 : 10}
      />
    </div>
  )
}

export default Settings
