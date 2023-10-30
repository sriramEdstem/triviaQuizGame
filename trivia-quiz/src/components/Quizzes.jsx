import React, { useEffect, useState } from "react";
import Question from "./Question";
import Options from "./Options";

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Quizzes = ({ quiz }) => {
  const [mappedQuiz, setMappedQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [count, setCount] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

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

  const handleOptions = () => {
    if (count < 9) {
      setTimeout(() => {
        setCount(count + 1);
        setCurrentQuestion(mappedQuiz[count + 1]);
      }, 1000);
    } else {
      setQuizComplete(true);
    }
  };

  const handlePlayAgain = () => {
    setCount(0);
    setCorrectAnswerCount(0);
    setQuizComplete(false);
    setCurrentQuestion(mappedQuiz[0]);
  };

  if (quizComplete) {
    return (
      <div>
        <h1>Complete</h1>
        <h2>Your score is {correctAnswerCount}/10</h2>
        <div>
          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      {currentQuestion && (
        <>
          <Question count={count} currentQuestion={currentQuestion.question} />
          <Options
            options={currentQuestion.options}
            correctanswer={currentQuestion.correctAnswer}
            handleOptions={handleOptions}
            mappedQuiz={mappedQuiz}
            setCurrentQuestion={setCurrentQuestion}
            setCount={setCount}
            correctAnswerCount={correctAnswerCount}
            setCorrectAnswerCount={setCorrectAnswerCount}
          />
        </>
      )}
    </div>
  );
};

export default Quizzes;
