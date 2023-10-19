import { useEffect, useState } from "react";
import axios from "axios";
import Question from "./Question";
import Options from "./Options";

const baseURL =
  "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple";

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Quizzes = () => {
  const [quiz, setQuiz] = useState([]);
  const [mappedQuiz, setMappedQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [count, setCount] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  const handleOptions = (mappedQuiz, setCurrentQuestion, setCount) => {
    setTimeout(() => {
      setCount(count + 1);
      setCurrentQuestion(mappedQuiz[count + 1]);
    }, 1000);

    return;
  };

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setQuiz(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  function refreshPage() {
    window.location.reload(false);
  }
  useEffect(() => {
    const mappedData = quiz.map((quizItem) => {
      const options = [quizItem.correct_answer, ...quizItem.incorrect_answers];
      const shuffledOptions = shuffleArray(options);
      return {
        question: quizItem.question,
        correctAnswer: quizItem.correct_answer,
        options: shuffledOptions,
      };
    });
    setMappedQuiz(mappedData);
    setCurrentQuestion(mappedData[count]);
  }, [quiz]);
  if (count <= 9) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {currentQuestion && (
          <>
            <Question currentQuestion={currentQuestion.question}></Question>
            <Options
              options={currentQuestion.options}
              correctanswer={currentQuestion.correctAnswer}
              handleOptions={handleOptions}
              mappedQuiz={mappedQuiz}
              setCurrentQuestion={setCurrentQuestion}
              setCount={setCount}
              correctAnswerCount={correctAnswerCount}
              setCorrectAnswerCount={setCorrectAnswerCount}
            ></Options>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Complete</h1>
        <h2>your score is {correctAnswerCount}/10</h2>
        <div>
          <button onClick={refreshPage}>Play Again?</button>
        </div>
      </div>
    );
  }
};

export default Quizzes;
