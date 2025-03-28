import { useState } from "react";
import { getGreeting } from "../api/greetManager";

function Greet() {
  const [greet, setGreet] = useState("");

  const handleButtonClick = async () => {
    const response = await getGreeting();
    setGreet(response.message);
  };

  return (
    <>
       
      <button type="button" onClick={handleButtonClick}>
        Click Me
      </button>
      <p>{greet}</p>
    </>
  );
};

export default Greet;