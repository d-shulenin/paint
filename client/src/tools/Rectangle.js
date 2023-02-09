import Tool from "./Tool";

export default class Rectangle extends Tool {
  constructor(canvas, context, socket, id) {
    super(canvas, context, socket, id);
    this.name = "rectangle";
    this.listen();
  }
  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
  }
  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "Rectangle",
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
        },
      })
    );
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
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currX = e.pageX - e.target.offsetLeft;
      let currY = e.pageY - e.target.offsetTop;
      this.width = currX - this.startX;
      this.height = currY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }
  draw(x, y, width, height) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.rect(x, y, width, height);
      this.context.fill();
      this.context.stroke();
    };
  }
  static staticDraw(context, x, y, width, height) {
    context.beginPath();
    context.rect(x, y, width, height);
    context.fill();
    context.stroke();
  }
}
