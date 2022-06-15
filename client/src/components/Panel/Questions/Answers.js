import styled from 'styled-components';

const Answers = ({ answersList, setAnswersList, type }) => {

  //Update Answer text
  const changeHandler = (index, value) => {
    const newAnswersList = [...answersList];
    newAnswersList[index] = { ...newAnswersList[index], text: value };
    setAnswersList(newAnswersList);
  };

  //Select Correction answer
  const selectHandler = (position) => {
    const newAnswersList = [...answersList];
    newAnswersList.forEach((answer, index) => {
      const isCorrect = index === position ? true : false;
      newAnswersList[index] = { ...newAnswersList[index], isCorrect };
    });
    setAnswersList(newAnswersList);
  };

  return <Wrapper>
    {answersList?.map((answer, index) => {
      return <AnswerContainer>

        {answersList.length > 1 && <CorrectContainer>
          <Correct type="radio" name="answer" onChange={() => selectHandler(index)} id={index} checked={answer.isCorrect} /><label for={index}>Correct answer</label>
        </CorrectContainer>}

        <Answer value={answer.text} onChange={(ev) => changeHandler(index, ev.target.value)} placeholder="Type an answer option here" disabled={type === "TrueFalse"}></Answer>
      </AnswerContainer >;
    })}
  </Wrapper >;
};

const Wrapper = styled.div`
text-align: center;
width: 100%;
display: grid;
height: auto;
gap:5px;
margin-top:10px;
grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
@media (max-width: 1000px) {
  height: fit-content;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
    width: 100%
}
`;
const AnswerContainer = styled.div`
  border-radius:10px;
  box-sizing: border-box;
  display: flex;
  height: fit-content;
  flex-direction: column;
  height:200px;
  @media (max-width: 1000px) {
    width: 100%;
    height: auto;
  }

  &:nth-of-type(1){
    background-color: #2D70AE;
  }
  &:nth-of-type(2){
    background-color: #2D9DA6;
  }
  &:nth-of-type(3){
    background-color: #EFA929;
  }
  &:nth-of-type(4){
    background-color: #D5546D;
  }
`;
const Correct = styled.input`
  height: 30px;
  width: 30px;
  margin: 0;
  &:checked {
    span {
      background: var(--color-alabama-crimson);
      color: #fff;
      font-weight: 700;
    }
  }
`;
const CorrectContainer = styled.div`
    display: flex;
    border: none;
    padding: 10px;
    align-items: center;
    justify-content: flex-start;
    label{
      margin-left:10px;
      color:white;
      font-size:18px;
      width: 100%;
      text-align: left;
    }
`;

const Answer = styled.textarea`
  width:100%;
  padding:10px 20px;
  font-size: 22px;
  height: fit-content;
  border:none;
  box-sizing: border-box;
  resize: none;
  background: rgba(255,255,255,0.7);
  height:200px;
  @media (max-width: 1000px) {
    height: auto;
  }
  &:disabled{
    background-color: rgba(0,0,0,0.2);
    color:white;
  }
`;
export default Answers;