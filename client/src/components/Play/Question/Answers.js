import styled from 'styled-components';

const Answers = ({ joinCode, answersList, socketRef }) => {

  const clickHandler = (value) => {
    socketRef.current.emit("answerQuestion", {
      joinCode: joinCode,
      insertedAnswer: value
    });

  };

  return <Wrapper>
    {answersList?.map((answer, index) => {
      return <AnswerContainer key={index}>
        <Answer value={answer.text} onClick={() => clickHandler(answer.text)}
          placeholder="Type an answer option here" >{answer.text}</Answer>
      </AnswerContainer >;
    })}
  </Wrapper >;
};

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  display: grid;
  height: 50%;
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
  height:50%;
  border-radius:10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin:auto 10px;
  border-left:20px solid;
  @media (max-width: 1000px) {
    width: 100%;
    height: auto;
    margin-top:5px;
  }

  &:nth-of-type(1){
    background-color: #EFA929;
    border-color:  #EFA929;

  }
  &:nth-of-type(2){

    background-color: #2D9DA6;
    border-color:  #2D9DA6;
  }
  &:nth-of-type(3){
    background-color: #D5546D;
    border-color:  #D5546D;

  }
  &:nth-of-type(4){

    background-color: #2D70AE;
    border-color:  #2D70AE;
  }
`;

const Answer = styled.button`
  width:100%;
  padding:10px 20px;
  font-size: 22px;

  height: fit-content;
  cursor: pointer;
  border:none;
  resize: none;
  background: rgba(255,255,255,0.7);
  height:100%;
  min-height: 80px;
  @media (max-width: 1000px) {
    height: auto;

  }
  @media (max-height: 600px) {
    min-height: auto;

  }
  &:disabled{
    background-color: rgba(0,0,0,0.2);
    color:white;
  }
`;
export default Answers;