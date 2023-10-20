const Question = ({ currentQuestion, count }) => {
  return (
    <>
      <h3>{count + 1 + ". " + currentQuestion}</h3>
    </>
  );
};

export default Question;
