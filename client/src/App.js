import { Routes, Route, Navigate } from "react-router-dom";
import Paint from "./Paint";
import { v4 as uuidv4 } from "uuid";

function App() {
  return (
    <Routes>
      <Route path="/:id" element={<Paint />} />
      <Route path="/" element={<Navigate to={`f${uuidv4()}`} />} />
    </Routes>
  );
}

export default App;
