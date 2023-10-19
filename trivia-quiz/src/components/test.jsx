import { useEffect, useState } from "react";
import axios from "axios";

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
  const [shuffledOptions, setShuffledOptions] = useState([]);

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

  useEffect(() => {
    const mappedData = quiz.map((quizItem) => {
      const options = [quizItem.correct_answer, ...quizItem.incorrect_answers];
      const shuffled = shuffleArray(options);
      return {
        question: quizItem.question,
        shuffledOptions: shuffled,
      };
    });
    setShuffledOptions(mappedData);
  }, [quiz]);

  if (quiz.length === 0) return null;

  return <></>;
};

export default Quizzes;
