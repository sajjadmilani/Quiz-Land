import styled from 'styled-components';

const Answers = ({ answersList, setAnswersList, type }) => {

  const changeHandler = (index, value) => {
    console.log(answersList[index], index, value);
    setAnswersList(
      ...answersList,
      answersList[index] = { text: "test" }
    );
  };

  return <Wrapper>
    {answersList?.map((answer, index) => {
      return <AnswerContainer>
        {answersList.length > 1 && <Correct type="radio" name="answer" defaultChecked={answer.isCorrect} />}
        <Answer value={answer.text} onChange={(ev) => changeHandler(index, ev.target.value)} ></Answer>
      </AnswerContainer >;
    })}
  </Wrapper >;
};
const Wrapper = styled.div`
text-align: center;
width: 100%;
height: auto;
div{
  padding:20px;
  border:1px solid #ccc;
}
`;
const AnswerContainer = styled.div`
  border-radius:10px;
  display: flex;
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
const Answer = styled.textarea`
  width:100%;
  padding:10px 20px;
  font-size: 22px;
  background:rgba(255,255,255,0.5)
`;
export default Answers;