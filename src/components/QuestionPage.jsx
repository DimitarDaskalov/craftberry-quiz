import questions from "../data.js";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useQuiz } from "../QuizContext.js";

const orderedIds = [
  "hairType",
  "washFrequency",
  "hairGoals",
  "concerns",
  "hairColor",
];

const QuestionPage = () => {
  const { index } = useParams();
  const { answers, saveAnswer } = useQuiz();

  const qIndex = Number(index);
  const totalQuestions = orderedIds.length;

  const id = orderedIds[qIndex];
  const { currentQuestion, name, options } = questions[id];

  const selected = answers[id];
  const prevPath = qIndex === 0 ? "/" : `/question/${qIndex - 1}`;
  const nextPath =
    qIndex === totalQuestions - 1 ? "/results" : `/question/${qIndex + 1}`;
  const nextDisabled = selected == null;

  return (
    <Wrapper>
      <QuestionWrapper>
        <QuestionName>{name}</QuestionName>

        <ContentRow>
          <Options>
            {options.map((option) => (
              <Option
                key={option.value}
                onClick={() => saveAnswer(id, option.value)}
                $active={selected === option.value}
              >
                {option.label}
              </Option>
            ))}
          </Options>

          <ProgressWrapper>
            <CircularProgressbar
              value={currentQuestion ?? qIndex + 1}
              maxValue={totalQuestions}
              text={`${currentQuestion ?? qIndex + 1}/${totalQuestions}`}
              styles={buildStyles({
                textSize: "16px",
                pathColor: "#abddf2",
                textColor: "#1c2635",
                trailColor: "#e6f7ff",
              })}
            />
          </ProgressWrapper>
        </ContentRow>

        <ButtonsWrapper>
          <BackButton to={prevPath}>
            {qIndex === 0 ? "Back" : "← Previous"}
          </BackButton>
          <NextButton
            to={nextPath}
            aria-disabled={nextDisabled}
            $disabled={nextDisabled}
            onClick={(e) => nextDisabled && e.preventDefault()}
          >
            {qIndex === totalQuestions - 1 ? "Finish →" : "Next question →"}
          </NextButton>
        </ButtonsWrapper>
      </QuestionWrapper>
    </Wrapper>
  );
};

export default QuestionPage;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const QuestionWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const QuestionName = styled.div`
  text-align: center;
  font-size: 48px;
  padding-bottom: 30px;
`;

const ContentRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  width: 100%;
`;

const Options = styled.div`
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const ProgressWrapper = styled.div`
  width: 101px;
  height: 101px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Option = styled.div`
  width: 180px;
  height: 44px;
  display: flex;
  align-items: center;
  border: 1px solid #5bc1ed;
  border-radius: 8px;
  padding-left: 15px;
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
  justify-content: center;
  gap: 16px;
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
  border-radius: 6px;
  padding: 12px;
  text-decoration: none;
  text-align: center;
  color: black;
  background-color: #c3edff;
  transition: 0.2s ease-in-out;
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  &:hover {
    transform: scale(1.03);
  }
`;
