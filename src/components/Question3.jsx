import { Link } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useQuiz } from "../QuizContext";

const Question3 = () => {
  const { answers, saveAnswer } = useQuiz();

  const selected = answers["q3"];
  const options = [
  { label: "a. Anti-breakage", value: "anti-breakage" },
  { label: "b. Hydration", value: "hydration" },
  { label: "c. Soothing dry scalp", value: "soothing dry scalp" },
  { label: "d. Repairs appearance of damaged hair", value: "repair damaged hair" },
  { label: "e. Volume", value: "volume" },
  { label: "f. Curl and coil enhancing", value: "curl enhancing" },
];


  const totalQuestions = 5;
  const currentQuestion = 3;

  return (
    <Wrapper>
      <QuestionWrapper>
        <Question>
          What benefit do you look <br />
          for in your hair products?
        </Question>
        <Options>
          {options.map((option) => (
            <Option
              key={options.value}
              onClick={() => saveAnswer("q3", option.value)}
              $active={selected === option.value}
            >
              {option.label}
            </Option>
          ))}
        </Options>
        <ButtonsWrapper>
          <BackButton to={"/question2"}>Back</BackButton>
          <NextButton to={"/question4"}>Next question ➝</NextButton>
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

export default Question3;

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
  top: 290px;
  right: 250px;
  padding-left: 50px;
`;

const Options = styled.div`
  width: 985px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Option = styled.div`
  min-width: 189px;
  height: 44px;
  display: flex;
  align-items: center;
  border: 1px solid #5bc1ed;
  border-radius: 8px;
  padding-left: 10px;
  padding-right: 10px;
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
