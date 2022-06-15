import { useState } from 'react';
import styled from 'styled-components';


const ResultItem = ({ result }) => {
  const [question, setQuestion] = useState({});

  return <Wrapper>

    <Header>
      <QuizLink></QuizLink>
      <PageTitle>
        <p> {result.name}</p>
      </PageTitle>
    </Header>

    <Container>
      <Detail>
        <Name>Name:</Name>
        <Name>Rank:</Name>
        <Name>Points</Name>
        <Name>Correct Answers:</Name>
        <Name>Incorrect Answers:</Name>
      </Detail>
      {result.players.map((player) => {
        const correctCount = player.answers?.filter((answer) => answer.isCorrect === true).length;
        const incorrectCount = player.answers?.filter((answer) => answer.isCorrect === false && answer.answer !== null).length;
        return <>
          <Detail>
            <Value>{player.name}</Value>
            <Value>{player.rank}</Value>
            <Value>{player.points}</Value>
            <Value>{correctCount}</Value>
            <Value>{incorrectCount}</Value>
          </Detail>

        </>;
      }
      )}
    </Container>

    <Footer>

    </Footer>

  </Wrapper >;
};

const Wrapper = styled.div`
  max-width: 900px;
  margin:auto;

  margin-top:30px;
  background-color:#FFFFFF;
  box-shadow: 1px 1px 5px 1px #cccccc;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  padding-bottom: 0;
  flex-direction: column;
  @media (max-width: 700px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    button{
      margin-top:20px;
    }
  }
`;
const QuizLink = styled.a`
  cursor: pointer;
  color:#4157b2;
  padding-right:30px;
  box-sizing: border-box;
  text-align: right;
`;

const PageTitle = styled.h2`
  margin-top:20px;
  margin-bottom:30px;
  font-size: 27px;
  background-color: #f2f2f2;
  display: block;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding:25px 50px;
  border-left: 3px solid #4157b2;
  box-sizing: border-box;
`;

const Container = styled.table`
  width: 90%;
  text-align: center;
  padding-top: 10px;
  margin:auto;
  margin-bottom:30px;
  box-sizing: border-box;
  height: fit-content;
  align-items: flex-start;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #e3e2e1;
  padding: 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 50px;
  }
`;
const Detail = styled.tr`
  margin-bottom:10px;

  border:1px solid #cccccc;
  width: 100%;
  @media (max-width:700px) {
    width: 100%;
  }
`;
const Name = styled.td`
  margin-right: 10px;
  background-color: #f6f6f6;
  padding:10px
`;
const Value = styled.td`
padding:10px
`;

export default ResultItem;