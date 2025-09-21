import styled from "styled-components";
import BackgroundHome from "../assets/BackgroundHome.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Wrapper>
      <TextAndButtonContainer>
        <Heading>
          Build a self care routine <br />
          suitable for you
        </Heading>
        <Paragraph>
          Take our test to get a personalised self care <br />
          routine based on your needs.
        </Paragraph>
        <Button to="/question/0">Start the quiz</Button>
      </TextAndButtonContainer>
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  height: 70vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${BackgroundHome});
  background-position: center;
  background-size: cover;
`;

const TextAndButtonContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Heading = styled.div`
  color: white;
  font-size: 48px;
  padding-bottom: 10px;
`;

const Paragraph = styled.div`
  color: white;
  padding-bottom: 20px;
`;

const Button = styled(Link)`
  width: 150px;
  outline: none;
  border: none;
  border-radius: 6px;
  padding: 12px;
  text-decoration: none;
  color: black;
  background-color: #c3edff;
  transition: 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.04);
  }
`;
