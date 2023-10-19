import { useState } from "react";

const Options = ({
  options,
  correctanswer,
  handleOptions,
  mappedQuiz,
  setCurrentQuestion,
  setCount,
  setCorrectAnswerCount,
  correctAnswerCount,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [colorBtn, setColorBtn] = useState(null);

  const handleOptionss = (mappedQuiz, setCurrentQuestion, setCount) => {
    handleOptions(mappedQuiz, setCurrentQuestion, setCount);
  };

  const handleAnswer = (selectedOption) => {
    if (correctanswer === selectedOption) {
      setCorrectAnswerCount(correctAnswerCount + 1);
      setTimeout(() => {
        setColorBtn(null);
      }, 1000);
      setColorBtn("correct");
    } else {
      setTimeout(() => {
        setColorBtn(null);
      }, 1000);
      setColorBtn("incorrect");
    }
    console.log(selectedOption);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "30px" }}>
        {options.map((item, index) => (
          <div key={index}>
            <input
              type="radio"
              value={item}
              name="quizOption"
              checked={null}
              onChange={(e) => {
                setSelectedOption(e.target.value);
              }}
            />

            {item}
          </div>
        ))}
      </div>
      <button
        className={`Buttons${colorBtn}`}
        disabled={!selectedOption}
        onClick={(e) => {
          handleOptionss(mappedQuiz, setCurrentQuestion, setCount);
          handleAnswer(selectedOption);
        }}
      >
        Submit
      </button>
    </>
  );
};

export default Options;
