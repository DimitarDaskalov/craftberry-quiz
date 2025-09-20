import { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});

  const saveAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const resetQuiz = () => {
    setAnswers({}); 
  };

  return (
    <QuizContext.Provider value={{ answers, saveAnswer, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);