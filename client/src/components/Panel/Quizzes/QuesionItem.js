import { useEffect, useState } from 'react';
import styled from 'styled-components';


const QuestionItem = ({ id }) => {
  const [question, setQuestion] = useState({});
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    setStatus("loading");
    fetch(`/api/question/${id}`)
      .then(res => res.json())
      .then(data => {
        setQuestion(data.data);
        setStatus("idle");
      });
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps
  return <Wrapper>

    <Header>
      <QuizLink></QuizLink>
      <PageTitle>
        <p> {question.question}</p>
      </PageTitle>
    </Header>

    {status === "idle" && <Container><Answers>
      {question.answers && question.answers.map((answer) => {
        return <AnswerContainer><CorrectAnswer correct={answer.isCorrect} /><Answer>{answer.text}</Answer></AnswerContainer>;
      })}
    </Answers>
    </Container>}

    <Footer>

      <Buttons>

        <Edit>Edit</Edit>
      </Buttons>
    </Footer>

  </Wrapper >;
};

const Wrapper = styled.div`
  max-width: 900px;
  margin:auto;
  margin-top:30px;
  background-color:#FFFFFF;
  box-shadow: 1px 1px 5px 1px #cccccc;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  padding-bottom: 0;
  flex-direction: column;
  @media (max-width: 700px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    button{
      margin-top:20px;
    }
  }
`;
const QuizLink = styled.a`
  cursor: pointer;
  color:#4157b2;
  padding-right:30px;
  box-sizing: border-box;
  text-align: right;
`;

const PageTitle = styled.h2`
  margin-top:20px;
  margin-bottom:30px;
  font-size: 27px;
  background-color: #f2f2f2;
  display: block;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding:25px 50px;
  border-left: 3px solid #4157b2;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  padding:50px;
  padding-top: 10px;
  position: relative;
  box-sizing: border-box;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: flex-start;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #e3e2e1;
  padding: 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 50px;
  }
`;
const Answers = styled.div`
  display: flex;
  flex-wrap: wrap;
 width: 100%;
`;
const AnswerContainer = styled.div`
 display: flex;
 margin-top:10px;
`;

const CorrectAnswer = styled.div`
  display: block;
  width:20px;
  height: 20px;
  background-color:${props => props.correct ? "#2d9da6" : "#d5546d"};
  border-radius: 50%;
  margin-left:30px;
`;
const Answer = styled.div`
  display: block;
  margin-left:10px;
`;

const Buttons = styled.div`
  @media (max-width: 600px) {
      margin-top:10px;
  }
`;

const Edit = styled.button`
  padding:10px 20px;
  font-size:19px;
  margin-left:10px;
  background-color: #EFA929;
    color: white;
    border: none;
  cursor: pointer;
`;

export default QuestionItem;