import styled from 'styled-components';
import { BsCheck2Circle, BsXCircle, BsAward, BsBullseye, BsPersonCircle } from 'react-icons/bs';


const Result = ({ data }) => {

  return <Wrapper>
    <Header>Report Summary</Header>
    <NameContainer><BsPersonCircle size={40} /> <Name>{data.name}</Name></NameContainer>

    <Stats>
      <Stat>
        <LeftSide>
          <Title>Rank</Title>
          <Value>{data.rank}</Value>
        </LeftSide>
        <Icon><BsAward size={70} color={"#EFA929"} /></Icon>
      </Stat>

      <Stat>
        <LeftSide>
          <Title>Score</Title>
          <Value>{data.score}</Value>
        </LeftSide>
        <Icon><BsBullseye size={70} color={"white"} /></Icon>
      </Stat>

      <Stat>
        <LeftSide>
          <Title>Correct</Title>
          <Value>{data.correctCount}</Value>
        </LeftSide>
        <Icon><BsCheck2Circle size={70} color={"#2D9DA6"} /></Icon>
      </Stat>

      <Stat>
        <LeftSide>
          <Title>Incorrect</Title>
          <Value>{data.incorrectCount}</Value>
        </LeftSide>
        <Icon><BsXCircle size={65} color={"#D5546D"} /></Icon>
      </Stat>
    </Stats>
  </Wrapper>;
};

const Wrapper = styled.div`
  background-color:#312B4F;
  max-width: 500px;
  margin-top:40px;
  padding:30px 40px;
  box-sizing: border-box;
  border-radius: 10px;
`;
const Header = styled.div`
  color:#FFFFFF;
  font-size:20px;
  margin-bottom:20px;
`;
const NameContainer = styled.div`
  padding:12px;
  box-sizing: border-box;
  font-size:18px;
  width: 100%;
  color:#FFFFFF;
  background:#1E193B;
  display: flex;
  align-items: center;
`;
const Name = styled.div`
  margin-left:10px;

`;

const Stats = styled.div`
  margin-top:10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

`;
const Stat = styled.div`
  padding:12px;
  box-sizing: border-box;
  font-size:18px;
  width: 100%;
  color:#FFFFFF;
  background:#1E193B;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
`;
const LeftSide = styled.div`
`;
const Title = styled.div`
`;
const Value = styled.div`
`;
const Icon = styled.div`
  margin-right: -30px;
  opacity: 0.7;
`;

export default Result;