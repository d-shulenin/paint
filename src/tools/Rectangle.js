import Tool from "./Tool"

export default class Rectangle extends Tool {
  constructor(canvas, context) {
    super(canvas, context)
    this.name = "rectangle"
    this.listen()
  }
  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
  }
  mouseUpHandler() {
    this.mouseDown = false
  }
  mouseDownHandler(e) {
    this.mouseDown = true
    this.context.beginPath()
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = this.canvas.toDataURL()
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currX = e.pageX - e.target.offsetLeft
      let currY = e.pageY - e.target.offsetTop
      let width = currX - this.startX
      let height = currY - this.startY
      this.draw(this.startX, this.startY, width, height)
    }
  }
  draw(x, y, width, height) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.context.beginPath()
      this.context.rect(x, y, width, height)
      this.context.fill()
      this.context.stroke()
    }
  }
}
