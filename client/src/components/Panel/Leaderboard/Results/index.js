import { useState } from 'react';
import styled from 'styled-components';
import ScoreBar from './ScoreBar';
import { BsCheck2Circle, BsXCircle, BsAward, BsBullseye, BsPersonCircle } from 'react-icons/bs';
const Result = ({ data, socketRef }) => {
  const [name, setName] = useState("");

  const nextQuestion = () => {
    console.log(data);
    socketRef.current.emit("nextQuestion", {
      joinCode: data.joinCode
    });
  };

  return <Wrapper>
    <Buttons>
      <End>End Game</End>
      <Next onClick={nextQuestion}>Next Question</Next>
    </Buttons>
    <Header>LEADERBOARD</Header>
    <Question>{data.question}</Question>
    <Stats>
      {data.players.map(player => {
        return <Stat>
          <Rank>{player.rank}</Rank>
          <Title><BsPersonCircle size={40} /><span>{player.name}</span> </Title>
          <ScoreBar correct={player.correctCount} incorrect={player.incorrectCount} />
          <Score>{player.score}</Score>
        </Stat>;
      })}

      {/* 
      <Stat>
        <Rank>2</Rank>
        <Title><BsPersonCircle size={40} /><span>Sajjad</span> </Title>
        <ScoreBar percent={40} />
        <Score>3000</Score>
      </Stat>

      <Stat>
        <Rank>3</Rank>
        <Title><BsPersonCircle size={40} /><span>Sajjad</span> </Title>
        <ScoreBar percent={40} />
        <Score>2200</Score>
      </Stat>

      <Stat>
        <Rank>4</Rank>
        <Title><BsPersonCircle size={40} /><span>Sajjad</span> </Title>
        <ScoreBar percent={40} />
        <Score>100</Score>
      </Stat> */}

    </Stats>
  </Wrapper>;
};
const Wrapper = styled.div`
  background-color:#312B4F;
  margin-top:40px;
  padding:50px 50px;
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
  max-width:1000px;

`;
const Question = styled.div`
  background-color: rgba(255,255,255,0.1);
  color:#FFFFFF;
  padding:30px;
  font-size:18px;
  text-align: center;
`;
const Header = styled.div`
  color:#FFFFFF;
  font-size:26px;
  margin-top:20px;
  margin-bottom:40px;
  text-align: center;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between
`;
const Next = styled.button`
  Padding:10px 20px;
  font-size:19px;
  margin-left:10px;
  background-color:#EFA929;
    color:  #FFFFFF;
    border: none;
  cursor: pointer;
`;
const End = styled.button`
  Padding:10px 20px;
  font-size:19px;
  margin-left:10px;
  background-color:#D5546D;
    color: #FFFFFF;
    border: none;
  cursor: pointer;
`;

const Stats = styled.div`
  margin-top:10px;
  gap: 10px;
`;
const Rank = styled.div`
  margin-left: 12px;
  font-size: 10px;
  font-size:24px;
`;
const Stat = styled.div`
  padding:12px;
  box-sizing: border-box;
  font-size:18px;
  margin-top:10px;
  width: 100%;
  color:#FFFFFF;
  background:#1E193B;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
display: flex;
font-size:20px;
align-items: center;
span{
  margin-left:12px;
}
`;

const Score = styled.div`
font-size:24px;
margin-right: 10px;
`;


export default Result;