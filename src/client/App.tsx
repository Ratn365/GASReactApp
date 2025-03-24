import "./App.css";
import { useState, useEffect } from "react";

import SheetEditor from "./components/SheetEditor";
import Greet from "./components/Greet";
import AboutMe from "./components/Aboutme";

declare global {
  interface Window {
    route: string;
  }
}

function App() {
  const [route, setRoute] = useState("");
  useEffect(() => {
    if (window.route) {
      setRoute(window.route);
    }
  }, []);
  return (
    <div className="App">
      <h1>Current Route: {route}</h1>
      {route === "Greet" && <Greet />}
      {route === "AboutMe" && <AboutMe />}
      {route === "Sheet" && <SheetEditor />}


    </div>
  );
}

export default App;
