import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Answers from './Answers';
import Loading from '../../Loading';

const initialAnswers = (type) => {
  switch (type) {
    case "MultiChoice":
      return [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }];
    case "TrueFalse":
      return [{ text: "True", isCorrect: false }, { text: "False", isCorrect: false }];
    default:
      return [{ text: "", isCorrect: true }];
  }
};

const Question = ({ joinCode, questionData, socketRef }) => {

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(initialAnswers(questionData.type));
  const [status, setStatus] = useState("idle");


  useEffect(() => {
    setStatus("loading");
    setQuestion(questionData.question);
    setAnswers(questionData.answers);
    setStatus("idle");
  }, [questionData]);


  return <Wrapper>


    <QuestionContainer>
      {status === "loading" && <Loader><Loading /></Loader>}
      <QuestionBox>{question}</QuestionBox>
      {questionData.type && <Answers answersList={answers} setAnswersList={setAnswers} socketRef={socketRef} type={questionData.type} joinCode={joinCode} />}
    </QuestionContainer>

  </Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  margin:auto;
  background-color:#312B4F;
  box-sizing: border-box;
  display: flex;

`;


const QuestionContainer = styled.div`
  width: 100%;
  padding:50px;
  position: relative;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
`;

const Loader = styled.div`
  position: absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  background-color: rgba(0,0,0,0.7);
`;

const QuestionBox = styled.div`
  width: 100%;
  height:50%;
  color:#FFFFFF;

  font-size: 28px;
  resize: none;
  text-align: center;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Question;