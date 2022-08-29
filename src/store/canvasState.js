import { makeAutoObservable } from "mobx"

class CanvasState {
  canvas = null
  context = null
  constructor() {
    makeAutoObservable(this)
  }
  setCanvas(canvas) {
    this.canvas = canvas
    this.context = canvas.getContext("2d")
    this.context.canvas.width = window.innerWidth
    this.context.canvas.height = window.innerHeight
    this.context.strokeStyle = "#000000"
    this.context.fillStyle = "#000000"
  }
}

export default new CanvasState()
