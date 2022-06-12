import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Answers from './Answers';
import Loading from '../../../Loading';
import { useNavigate } from 'react-router-dom';

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

const Question = ({ questionData }) => {
  console.log(questionData);
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("MultiChoice");
  const [answers, setAnswers] = useState(initialAnswers(type));
  const [status, setStatus] = useState("idle");
  const [time, setTime] = useState(20);
  const [point, setPoint] = useState(1);
  const [difficulty, setDifficulty] = useState("easy");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/question/${questionData.questionId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data.data.question);
        setQuestion(data.data.question);
        setAnswers(data.data.answers);
      });
  }, []);

  const submitHandler = () => {

  };
  return <Wrapper>


    <QuestionContainer>
      {status === "loading" && <Loader><Loading /></Loader>}
      <QuestionBox>{question}</QuestionBox>
      {type === "MultiChoice" && <Answers answersList={answers} setAnswersList={setAnswers} type={type} />}
      {type === "TrueFalse" && <Answers answersList={answers} setAnswersList={setAnswers} type={type} />}
      {type === "FillBlank" && <Answers answersList={answers} setAnswersList={setAnswers} type={type} />}
      {type === "Question" && <Answers answersList={answers} setAnswersList={setAnswers} type={type} />}
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
  @media (max-width:900px) {
    width:auto ;
  }
`;

const Header = styled.div`
  display: flex;
  padding:50px;
  padding-bottom: 0;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: 700px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    button{
      margin-top:20px;
    }
  }
`;

const Types = styled.div`
  display: flex;
  gap:5px;
`;
const Type = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-bottom:2px;
    cursor: pointer;
    padding: 0;
    box-sizing: border-box;
    opacity: ${props => props.selected ? "1" : "0.5"};
    border:  solid ${props => props.selected ? "2px #d5546d" : "1px #ccc"};
    
`;

const TypeImage = styled.img`
  width: 100px;
  margin-bottom:10px;
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

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #696387;
  padding: 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 50px;
  }
`;


const Options = styled.div`
  
`;

const Select = styled.select`
margin-left:5px;
font-size:16px;
padding:10px;
`;

const Point = styled.select`
`;

const Buttons = styled.div`
  @media (max-width: 600px) {
      margin-top:10px;
  }
`;
const Submit = styled.button`
  Padding:10px 20px;
  font-size:19px;
  margin-left:10px;
  background-color:#EFA929;
    color: white;
    border: none;
  cursor: pointer;
`;

export default Question;