import { useEffect, useState } from "react";
//Icons
import EditIcon from "@mui/icons-material/Edit";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import RectangleIcon from "@mui/icons-material/Rectangle";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import SaveIcon from "@mui/icons-material/Save";
//Store
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
//Tools
import Brush from "../tools/Brush";
import Rectangle from "../tools/Rectangle";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const Toolbar = () => {
  const [color, setColor] = useState("#000000");
  const [selected, setSelected] = useState("brush");
  const createClassName = (tool) => {
    return selected === tool
      ? "toolbar__item toolbar__item_active"
      : "toolbar__item";
  };
  useEffect(() => {
    toolState.tool?.changeColor(color);
  }, [color, selected]);
  return (
    <div className="toolbar">
      <ul className="toolbar__items">
        <li>
          <button
            className={createClassName("brush")}
            onClick={() => {
              toolState.setTool(
                new Brush(
                  canvasState.canvas,
                  canvasState.context,
                  canvasState.socket,
                  canvasState.sessionId
                )
              );
              setSelected("brush");
            }}
          >
            <EditIcon />
          </button>
        </li>
        <li>
          <button
            className={createClassName("rectangle")}
            onClick={() => {
              toolState.setTool(
                new Rectangle(
                  canvasState.canvas,
                  canvasState.context,
                  canvasState.socket,
                  canvasState.sessionId
                )
              );
              setSelected("rectangle");
            }}
          >
            <RectangleIcon />
          </button>
        </li>
        <li>
          <button
            className={createClassName("circle")}
            onClick={() => {
              toolState.setTool(
                new Circle(canvasState.canvas, canvasState.context)
              );
              setSelected("circle");
            }}
          >
            <PanoramaFishEyeIcon />
          </button>
        </li>
        <li>
          <button
            className={createClassName("eraser")}
            onClick={() => {
              toolState.setTool(
                new Eraser(canvasState.canvas, canvasState.context)
              );
              setColor("#faebd7");
              setSelected("eraser");
            }}
          >
            <AutoFixHighIcon />
          </button>
        </li>
        <li>
          <button
            className={createClassName("line")}
            onClick={() => {
              toolState.setTool(
                new Line(canvasState.canvas, canvasState.context)
              );
              setSelected("line");
            }}
          >
            <HorizontalRuleIcon />
          </button>
        </li>
        <li>
          <input
            style={{ cursor: "pointer" }}
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            disabled={selected === "eraser" ? true : false}
          />
        </li>
      </ul>
      <ul className="toolbar__items">
        <li>
          <button className="toolbar__item" onClick={() => canvasState.undo()}>
            <UndoIcon />
          </button>
        </li>
        <li>
          <button className="toolbar__item" onClick={() => canvasState.redo()}>
            <RedoIcon />
          </button>
        </li>
        <li>
          <button className="toolbar__item">
            <SaveIcon />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Toolbar;
