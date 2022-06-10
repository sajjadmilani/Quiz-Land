import { useState } from 'react';
import styled from 'styled-components';
import Answers from './Answers';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Loading from "../../Loading";
import Organizer from '..';
import Button from '../Button';

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
  const [type, setType] = useState("MultiChoice");
  const [answers, setAnswers] = useState(initialAnswers(type));
  const [status, setStatus] = useState("idle");
  const [time, setTime] = useState("20 seconds");
  const [point, setPoint] = useState(1);
  const [difficulty, setDifficulty] = useState("easy");
  const randomHandler = () => {
    if (type === "") { return; }
    setStatus("loading");
    fetch(`/api/getRandom/${type}?difficulty=${difficulty}`)
      .then(res => res.json())
      .then(data => {
        setQuestion(data.data.question);
        setAnswers(data.data.answers);
        setStatus("idle");
      });
  };

  const typeChangeHandler = (type) => {
    setType(type);
    setAnswers(initialAnswers(type));
    setQuestion("");

  };

  return <Organizer>
    <Wrapper>
      <Header>
        <Types>
          <Type selected={type === "MultiChoice"} onClick={() => typeChangeHandler("MultiChoice")}>
            <TypeImage src="/images/types/multi-choice.png" />
            <span>Multiple choice</span>
          </Type>
          <Type selected={type === "TrueFalse"} onClick={() => typeChangeHandler("TrueFalse")}>
            <TypeImage src="/images/types/true-false.png" />
            <span>True False</span>
          </Type>

          <Type selected={type === "Question"} onClick={() => typeChangeHandler("Question")}>
            <TypeImage src="/images/types/question.png" />
            <span>Simple Question</span>
          </Type>

          <Type selected={type === "FillBlank"} onClick={() => typeChangeHandler("FillBlank")}>
            <TypeImage src="/images/types/fill-blank.png" />
            <span>Fill in the Blank</span>
          </Type>

        </Types>

        {type !== "FillBlank" && <Button clickHandler={randomHandler} title="Get a Random" width="200" />}
      </Header>

      <QuestionContainer>
        {status === "loading" && <Loader><Loading /></Loader>}
        <Question onChange={(ev) => setQuestion(ev.target.value)} placeholder="Type your questions here..." value={question}></Question>
        {type === "MultiChoice" && <Answers answersList={answers} setAnswersList={setAnswers} type={type} />}
        {type === "TrueFalse" && <Answers answersList={answers} setAnswersList={setAnswers} type={type} />}
        {type === "FillBlank" && <Answers answersList={answers} setAnswersList={setAnswers} type={type} />}
        {type === "Question" && <Answers answersList={answers} setAnswersList={setAnswers} type={type} />}
      </QuestionContainer>

      <Footer>
        <Options>
          <Tippy
            content="Choose difficulty of question"
            animation="fade"
            theme="translucent"
            arrow={true}
            delay={150}
          >
            <Select onChange={(ev) => setDifficulty(ev.target.value)}>
              <option value="easy" selected>Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
          </Tippy>
          <Tippy
            content="Time Limit"
            animation="fade"
            theme="translucent"
            arrow={true}
            delay={150}
          >
            <Select onChange={(ev) => setTime(ev.target.value)}>
              <option value="5 seconds">5 seconds</option>
              <option value="10 seconds">10 seconds</option>
              <option value="20 seconds" selected>20 seconds</option>
              <option value="30 seconds">30 seconds</option>
              <option value="45 seconds">45 seconds</option>
              <option value="1 minute">1 minute</option>
              <option value="21 minute">2 minutes</option>
              <option value="3 minute">3 minutes</option>
              <option value="5 minute">5 minutes</option>
            </Select>
          </Tippy>
          <Tippy
            content="Choose how to calculate points"
            animation="fade"
            theme="translucent"
            arrow={true}
            delay={150}
          >
            <Select onChange={(ev) => setPoint(ev.target.value)}>
              <option value="1" selected>Standard</option>
              <option value="2">Doubled Points</option>
              <option value="0">No Points</option>
            </Select>
          </Tippy>
        </Options>
        <Buttons>
          <Cancel>Cancel</Cancel>
          <Submit>Save</Submit>
        </Buttons>
      </Footer>
    </Wrapper>
  </Organizer>;
};

const Wrapper = styled.div`
  max-width: 1280px;
  margin:auto;
  background-color:#FFFFFF;
  box-sizing: border-box;
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
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

const Loader = styled.div`
  position: absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  background-color: rgba(0,0,0,0.7);
`;

const Question = styled.textarea`
  width: 100%;
  padding:50px;
  font-size: 28px;
  resize: none;
  text-align: center;
  box-sizing: border-box;
  border-radius: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #e3e2e1;
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
  background-color: #ffffff;
  font-size:19px;
  margin-left:10px;
  background-color: #2d9da6;
    color: white;
    border: none;
  cursor: pointer;
`;

const Cancel = styled.button`
  Padding:10px 20px;
  background-color: #ffffff;
  font-size:19px;
  border:none;
  cursor: pointer;
`;
export default AddQuestion;