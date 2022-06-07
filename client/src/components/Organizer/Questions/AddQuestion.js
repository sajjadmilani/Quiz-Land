import { useState } from 'react';
import styled from 'styled-components';
import Answers from './Answers';

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

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("");
  const [answers, setAnswers] = useState(initialAnswers(type));

  const randomHandler = () => {
    if (type === "") { return; }
    fetch(`/api/getRandom/${type}`)
      .then(res => res.json())
      .then(data => {
        setQuestion(data.data.question);
        setAnswers(data.data.answers);
      });
  };

  return <Wrapper>
    <Type onChange={(ev) => {
      setType(ev.target.value);
      setAnswers(initialAnswers(ev.target.value));
      setQuestion("");
    }
    }>
      <option value="">Select a question type:</option>
      <option value="MultiChoice">Multi Choice</option>
      <option value="TrueFalse">True False</option>
      <option value="FillBlank">Fill in the blank</option>
      <option value="Question">Question</option>
    </Type>
    <RandomButton onClick={randomHandler}>Random Question</RandomButton>
    <QuestionContainer>
      <Question onChange={(ev) => setQuestion(ev.target.value)} placeholder="asdasd" value={question}></Question>
    </QuestionContainer>
    {type === "MultiChoice" && <Answers answersList={answers} setAnswersList="setAnswers" type={type} />}
    {type === "TrueFalse" && <Answers answersList={answers} setAnswersList="setAnswers" />}
    {type === "FillBlank" && <Answers answersList={answers} setAnswersList="setAnswers" />}
    {type === "Question" && <Answers answersList={answers} setAnswersList="setAnswers" />}
  </Wrapper>;
};

const Wrapper = styled.div`
  max-width: 1280px;
  margin:auto;
  background-color: lightcyan;
  box-sizing: border-box;
  padding:50px;
`;
const Type = styled.select`
  font-size: 24px;
`;
const RandomButton = styled.button`
  
`;
const QuestionContainer = styled.div`
  width: 100%;
  padding:10px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;
const Question = styled.textarea`
  width: 100%;
  padding:50px;
  font-size: 28px;
  text-align: center;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 10px;
`;
export default AddQuestion;