import { useState } from 'react';
import styled from 'styled-components';
import { BsCheck2Circle, BsXCircle, BsAward, BsBullseye, BsPersonCircle } from 'react-icons/bs';
const Result = ({ resultData }) => {
  const [name, setName] = useState("");
  return <Wrapper>
    <Header>Report Summary</Header>
    <NameContainer><BsPersonCircle size={40} /> <Name>Sajjad</Name></NameContainer>

    <Stats>

      <Stat>
        <LeftSide>
          <Title>Rank</Title>
          <Value>1/1</Value>
        </LeftSide>
        <Icon><BsAward size={70} color={"#EFA929"} /></Icon>
      </Stat>

      <Stat>
        <LeftSide>
          <Title>Score</Title>
          <Value>0</Value>
        </LeftSide>
        <Icon><BsBullseye size={70} color={"white"} /></Icon>
      </Stat>

      <Stat>
        <LeftSide>
          <Title>Correct</Title>
          <Value>0</Value>
        </LeftSide>
        <Icon><BsCheck2Circle size={70} color={"#2D9DA6"} /></Icon>
      </Stat>

      <Stat>
        <LeftSide>
          <Title>Incorrect</Title>
          <Value>0</Value>
        </LeftSide>
        <Icon><BsXCircle size={65} color={"#D5546D"} /></Icon>
      </Stat>
    </Stats>
  </Wrapper>;
};
const Wrapper = styled.div`
  background-color:#312B4F;
  width:500px;
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
`;
const Start = styled.button`
  background-color: #00C985;
  color:#FFFFFF;
  width: 100%;
  font-size:18px;
  margin-top:20px;
  border:none;
  border-bottom: 5px solid green;
  border-radius: 10px;
  padding:12px;
  cursor: pointer;

  &:hover{
    margin-top:25px;
    border-bottom: 0px solid green;

  }
`;
export default Result;