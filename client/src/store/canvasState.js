import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas = null;
  context = null;
  undoList = [];
  redoList = [];
  socket = null;
  sessionId = null;
  username = "";
  constructor() {
    makeAutoObservable(this);
  }
  setCanvas(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;
    this.context.strokeStyle = "#000000";
    this.context.fillStyle = "#000000";
  }
  pushToUndo(action) {
    this.undoList.push(action);
  }
  pushToRedo(action) {
    this.redoList.push(action);
  }
  undo() {
    if (this.undoList.length > 0) {
      let lastAction = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = lastAction;
      img.onload = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(
          img,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        );
      };
    }
  }
  redo() {
    if (this.redoList.length > 0) {
      let lastAction = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = lastAction;
      img.onload = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(
          img,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        );
      };
    }
  }
  setUsername(username) {
    this.username = username;
  }
  setSocket(socket) {
    this.socket = socket;
  }
  setSessionId(id) {
    this.sessionId = id;
  }
}

export default new CanvasState();
