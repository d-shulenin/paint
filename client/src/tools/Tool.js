export default class Tool {
  constructor(canvas, context, socket, id) {
    this.canvas = canvas;
    this.context = context;
    this.socket = socket;
    this.id = id;
    this.destroyEvents();
  }
  destroyEvents() {
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
  }
  changeColor(color) {
    this.context.strokeStyle = color;
    this.context.fillStyle = color;
  }
  changeLineWidth(width) {
    this.context.lineWidth = width;
  }
}
