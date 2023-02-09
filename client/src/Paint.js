import Toolbar from "./components/Toolbar";
import Settings from "./components/Settings";
import Canvas from "./components/Canvas";

const Paint = () => {
  return (
    <div className="paint">
      <Toolbar />
      <Settings />
      <Canvas />
    </div>
  );
};

export default Paint;
