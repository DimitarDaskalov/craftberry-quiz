import { Link } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useQuiz } from "../QuizContext";

const Question1 = () => {
  const { answers, saveAnswer } = useQuiz();
  const selected = answers["q1"];

  const options = [
    { label: "a. Straight", value: "straight" },
    { label: "b. Curly", value: "curly" },
    { label: "c. Wavy", value: "wavy" },
    { label: "d. Fine", value: "fine" },
  ];

  const totalQuestions = 5;
  const currentQuestion = 1; 

  return (
    <Wrapper>
      <QuestionWrapper>
        <Question>
          What's your hair type or <br />
          texture?
        </Question>
        <Options>
          {options.map((option) => (
            <Option
              key={option.value}
              onClick={() => saveAnswer("q1", option.value)}
              $active={selected === option.value}
            >
              {option.label}
            </Option>
          ))}
        </Options>
        <ButtonsWrapper>
          <BackButton to={"/"}>Back</BackButton>
          <NextButton to={"/question2"}>Next question ➝</NextButton>
        </ButtonsWrapper>
      </QuestionWrapper>
      <ProgressWrapper>
        <CircularProgressbar
          value={currentQuestion}
          maxValue={totalQuestions}
          text={`${currentQuestion}/${totalQuestions}`}
          styles={buildStyles({
            textSize: "16px",
            pathColor: "#abddf2",
            textColor: "#1c2635",
            trailColor: "#e6f7ff",
          })}
        />
      </ProgressWrapper>
    </Wrapper>
  );
};

export default Question1;

const Wrapper = styled.div`
  height: 100vh;
`;

const QuestionWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Question = styled.div`
  text-align: center;
  font-size: 48px;
  padding-bottom: 30px;
`;

const ProgressWrapper = styled.div`
  width: 101px;
  height: 101px;
  position: absolute;
  top: 352px;
  left: 1227px;
  padding-left: 50px;
`;

const Options = styled.div`
  width: 786px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Option = styled.div`
  width: 189px;
  height: 44px;
  display: flex;
  align-items: center;
  border: 1px solid #5bc1ed;
  border-radius: 8px;
  padding-left: 15px;
  margin: 10px;
  color: ${({ $active }) => ($active ? "#fff" : "#1c2635")};
  background-color: ${({ $active }) => ($active ? "#5bc1ed" : "transparent")};
  transition: 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
`;

const ButtonsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled(Link)`
  padding-right: 20px;
  color: #667587;
  text-decoration: underline;
  transition: 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
`;

const NextButton = styled(Link)`
  width: 150px;
  outline: none;
  border: none;
  border-radius: 6px;
  padding: 12px;
  text-decoration: none;
  text-align: center;
  color: black;
  background-color: #c3edff;
  transition: 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
`;
