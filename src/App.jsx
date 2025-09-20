import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { QuizProvider } from "./QuizContext";
import HomePage from "./components/HomePage";
import Question1 from "./components/Question1";
import Question2 from "./components/Question2";
import Question3 from "./components/Question3";
import Question4 from "./components/Question4";
import Question5 from "./components/Question5";
import Results from "./components/Results";

function App() {
  return (
    <QuizProvider>
      <AppWrapper>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/question1" element={<Question1 />} />
            <Route path="/question2" element={<Question2 />} />
            <Route path="/question3" element={<Question3 />} />
            <Route path="/question4" element={<Question4 />} />
            <Route path="/question5" element={<Question5 />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </BrowserRouter>
      </AppWrapper>
    </QuizProvider>
  );
}

export default App;

const AppWrapper = styled.div``;
