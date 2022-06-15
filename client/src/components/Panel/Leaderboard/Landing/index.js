import { useState } from 'react';
import styled from 'styled-components';
import { BsFiles, BsPersonCircle } from 'react-icons/bs';
import Loading from '../../../Loading';
const copyToClipboard = (value) => {
  navigator.clipboard.writeText(value);
};

const Landing = ({ data, participants, socketRef }) => {
  const [name, setName] = useState("");
  const quizLink = window.location.origin + `/play/${data.joinCode}`;
  const startHandler = () => {
    socketRef.current.emit("startQuiz", {
      joinCode: data.joinCode
    });
  };
  return <Wrapper>
    <Detail>
      <Header>Quiz: {data.name}</Header>
      <Title>1. Use any device to open</Title>
      <PlayWay disabled><a href={quizLink}>{quizLink}</a>
        <Copy onClick={() => copyToClipboard(quizLink)}><BsFiles size={20} /></Copy>
      </PlayWay>

      <Title>2. Enter join code</Title>
      <PlayWay disabled><span>{data.joinCode}</span>
        <Copy onClick={() => copyToClipboard(data.joinCode)}><BsFiles size={20} /></Copy>
      </PlayWay>

      <Start onClick={startHandler}>Start</Start>
    </Detail>
    <Participants>
      <List>
        {participants?.map((participant) => {
          return <Participant><BsPersonCircle /> {participant}</Participant>;
        })}
      </List>
      <Loading />
    </Participants >
  </Wrapper>;
};
const Wrapper = styled.div`
  margin-top:40px;
display: flex;
justify-content: center;
margin-top:50px;
flex-wrap: wrap;
`;

const Detail = styled.div`
  background-color:#312B4F;
  width:450px;

  padding:30px 40px;
  box-sizing: border-box;
  border-radius: 10px;
  border-radius: 30px;
`;
const Participants = styled.div`
  background-color:#312B4F;
  width:450px;
  display: flex;
  padding:20px;
  box-sizing: border-box;
  flex-direction: column;
  border-radius: 30px;
`;
const Participant = styled.div`
padding:10px 20px;;
background-color: #FFFFFF;
margin-top: 10px;
border-radius: 10px;
height: fit-content;
margin-left:10px;
vertical-align: middle;

`;
const List = styled.div`
display: flex;
flex-wrap: wrap;
`;
const Header = styled.div`
  color:#FFFFFF;
  font-size:20px;
  margin-bottom:20px;
`;
const Title = styled.div`
padding:12px;
box-sizing: border-box;
font-size:18px;
margin-top:15px;
color:#FFFFFF;
width: 100%;
`;
const Copy = styled.button`
padding:12px;
box-sizing: border-box;
font-size:18px;
cursor: pointer;
border-radius: 10px;
border:none;
width: 50px;
background-color: #e9e9e9;
&:hover{
  background-color: #d9d9d9;
}
`;

const PlayWay = styled.div`
padding:5px;
box-sizing: border-box;
font-size:26px;
padding-left:20px;
background-color:#FFFFFF;
border-radius: 10px;
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
a{
  overflow: hidden;
  font-size: 18px;
  text-decoration: none;
  width: calc(100% - 50px);
}
span{
  overflow: hidden;
  width: calc(100% - 50px);
}

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
export default Landing;