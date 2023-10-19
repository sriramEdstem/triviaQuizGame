import "./App.css";
import { useState } from "react";
import Quizzes from "./components/Quizzes";
import Homepage from "./pages/Homepage";

function App() {
  const [gameStart, setGamestart] = useState(false);

  const startGame = () => {
    setGamestart(true);
  };

  return (
    <div>
      {gameStart ? (
        <Quizzes />
      ) : (
        <>
          <Homepage />
          <button onClick={startGame}>Start Button</button>
        </>
      )}
    </div>
  );
}

export default App;
