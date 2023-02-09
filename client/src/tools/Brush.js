import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(canvas, context, socket, id) {
    super(canvas, context, socket, id);
    this.name = "brush";
    this.listen();
  }
  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
  }
  mouseUpHandler() {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "Finish",
        },
      })
    );
  }
  mouseDownHandler(e) {
    this.mouseDown = true;
    this.context.beginPath();
    this.context.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      //this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "Brush",
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
          },
        })
      );
    }
  }
  static draw(context, x, y) {
    context.lineTo(x, y);
    context.stroke();
  }
}
