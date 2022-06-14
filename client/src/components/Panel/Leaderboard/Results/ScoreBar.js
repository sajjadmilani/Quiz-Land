import styled from 'styled-components';

const ScoreBar = ({ correct, incorrect }) => {
  return <Wrapper>
    <Correct size={correct || 0} />
    <Incorrect size={incorrect || 0} />
  </Wrapper>;
};
const Wrapper = styled.div`
  width:40%;
  background-color: rgba(255,255,255,0.1);
  height: 30px;
  border-radius: 10px;
  display: flex;
`;

const Correct = styled.div`
background-color: #2D9DA6;
height: 100%;
width: ${props => props.size}%;
border-top-left-radius:10px;
border-bottom-left-radius:10px;
`;
const Incorrect = styled.div`
background-color: #D5546D;
height: 100%;
width: ${props => props.size}%;
`;
export default ScoreBar;