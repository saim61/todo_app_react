import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-theme">
      <Outlet />
    </div>
  );
}

export default App;
