import { useState, useEffect, useRef } from "react";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import { useParams } from "react-router-dom";
import Rectangle from "../tools/Rectangle";

const Canvas = () => {
  const [modal, setModal] = useState(true);
  const params = useParams();
  const canvasRef = useRef();
  const usernameRef = useRef();
  function onMouseDownHandler() {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  }
  function connectHandler(e) {
    e.preventDefault();
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  }
  function drawHandler(message) {
    const figure = message.figure;
    const context = canvasState.context;
    switch (figure.type) {
      case "Brush":
        Brush.draw(context, figure.x, figure.y);
        break;
      case "Rectangle":
        Rectangle.staticDraw(
          context,
          figure.x,
          figure.y,
          figure.width,
          figure.height
        );
        break;
      case "Finish":
        canvasState.context.beginPath();
        break;
    }
  }
  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);
  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket("ws://localhost:5000");
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      toolState.setTool(
        new Brush(canvasState.canvas, canvasState.context, socket, params.id)
      );
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: "connection",
          })
        );
      };
      socket.onmessage = (event) => {
        let message = JSON.parse(event.data);
        switch (message.method) {
          case "connection":
            alert(`Пользователь ${message.username} подключился`);
            break;
          case "draw":
            drawHandler(message);
            break;
        }
      };
    }
  }, [params]);
  return (
    <div className="canvas">
      <div
        className="canvas__modal"
        style={{ display: modal ? "flex" : "none" }}
      >
        <form className="canvas__form">
          <h2>Введите ваше имя</h2>
          <hr />
          <input type="text" ref={usernameRef} placeholder="Имя" />
          <button onClick={connectHandler}>Войти</button>
        </form>
      </div>
      <canvas onMouseDown={onMouseDownHandler} ref={canvasRef} />
    </div>
  );
};

export default Canvas;
