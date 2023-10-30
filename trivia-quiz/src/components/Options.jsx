import React, { useState } from "react";

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

  const handleAnswer = () => {
    if (correctanswer === selectedOption) {
      setCorrectAnswerCount(correctAnswerCount + 1);
      setColorBtn("correct");
    } else {
      setColorBtn("incorrect");
    }
    setTimeout(() => {
      setColorBtn(null);
    }, 1000);
  };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const getOptionStyle = (option) => {
    if (selectedOption === option) {
      return {
        backgroundColor:
          colorBtn === "correct"
            ? "green"
            : colorBtn === "incorrect"
            ? "red"
            : "",
      };
    }
    return {};
  };

  return (
    <>
      <div style={{ display: "flex", gap: "30px" }}>
        {options.map((item, index) => (
          <div
            key={index}
            className={` Buttons ${getOptionStyle(item)} options`}
            style={getOptionStyle(item)}
          >
            <input
              type="radio"
              value={item}
              name="quizOption"
              checked={selectedOption === item}
              onChange={handleRadioChange}
            />
            {item}
          </div>
        ))}
      </div>
      <button
        style={{ width: "100px", marginRight: "auto", marginLeft: "auto" }}
        className={`Buttons ${colorBtn}`}
        disabled={!selectedOption}
        onClick={() => {
          handleOptionss(mappedQuiz, setCurrentQuestion, setCount);
          handleAnswer();
        }}
      >
        Submit
      </button>
    </>
  );
};

export default Options;
