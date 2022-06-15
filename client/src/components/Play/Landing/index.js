import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Landing = ({ data, socketRef }) => {
  const [name, setName] = useState("");
  const submitHandler = () => {
    name && socketRef.current.emit("setName", {
      joinCode: data.joinCode,
      name
    });
  };
  return <Wrapper>
    <Header>Quiz Name: {data.name}</Header>
    <NameInput value={name} onChange={(ev) => setName(ev.target.value)} placeholder="Your name..." />
    <Start onClick={submitHandler}>Start</Start>
  </Wrapper>;
};
const Wrapper = styled.div`
  background-color:#312B4F;
  width:450px;

  padding:30px 40px;
  box-sizing: border-box;
  border-radius: 10px;
`;
const Header = styled.div`
  color:#FFFFFF;
  font-size:20px;
  margin-bottom:20px;
`;
const NameInput = styled.input`
padding:12px;
box-sizing: border-box;
font-size:18px;
width: 100%;
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