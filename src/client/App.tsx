import "./App.css";
import { useState, useEffect } from "react";

import SheetEditor from "./app/SheetEditor";
import Greet from "./app/Greet";
import AboutMe from "./app/AboutMe";

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
