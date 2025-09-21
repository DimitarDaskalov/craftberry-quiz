import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { QuizProvider } from "./QuizContext";
import HomePage from "./components/HomePage";
import QuestionPage from "./components/QuestionPage";
import Results from "./components/Results";

function App() {
  return (
    <QuizProvider>
      <AppWrapper>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/question/:index" element={<QuestionPage />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </BrowserRouter>
      </AppWrapper>
    </QuizProvider>
  );
}

export default App;

const AppWrapper = styled.div``;
