import Quizzes from "../components/Quizzes";
import { useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [gameStart, setGamestart] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const baseURL =
    "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple";

  const startGame = () => {
    setGamestart(true);
    axios
      .get(baseURL)
      .then((response) => {
        setQuiz(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <>
      <div>
        {gameStart ? (
          <Quizzes quiz={quiz} />
        ) : (
          <>
            <h1>Animal Quiz Game to test your knowledge</h1>

            <button onClick={startGame}>Start Quiz</button>
          </>
        )}
      </div>
    </>
  );
};

export default Homepage;
