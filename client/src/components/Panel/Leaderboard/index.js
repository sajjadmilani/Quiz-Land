import { useEffect, useRef, useState } from 'react';
import Panel from '..';
import io from "socket.io-client";
import styled from 'styled-components';
const Leaderboard = () => {
  const socketRef = useRef();
  const [value, setValue] = useState([]);

  useEffect(() => {

    socketRef.current = io.connect("/");
    socketRef.current.on('messageFromServer', (dataFromClient) => {
      console.log(dataFromClient);
    });

    socketRef.current.on('messageToClients', (dataFromClient) => {
      let newValue = [...value, dataFromClient.text];
      newValue.push("test");
      setValue(newValue);
      console.log(dataFromClient.text);
    });
  }, []);


  const clickHandler = () => {
    socketRef.current.emit('newMessageToServer', { text: "hii" });
  };

  return <Wrapper>

    {/* <button onClick={clickHandler} >test</button>
    {value.map((test) => { return <div style={{ fontSize: "40px", marginLeft: "40px", background: "pink" }}>{test}</div>; })} */}
  </Wrapper>;
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin:auto;
  background-color:#1E193B;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  padding:50px;
  padding-bottom: 0;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: 700px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    button{
      margin-top:20px;
    }
  }
`;

const Types = styled.div`
  display: flex;
  gap:5px;
`;
const Type = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-bottom:2px;
    cursor: pointer;
    padding: 0;
    box-sizing: border-box;
    opacity: ${props => props.selected ? "1" : "0.5"};
    border:  solid ${props => props.selected ? "2px #d5546d" : "1px #ccc"};
    
`;

const TypeImage = styled.img`
  width: 100px;
  margin-bottom:10px;
`;

const QuestionContainer = styled.div`
  width: 100%;
  padding:50px;
  position: relative;
  box-sizing: border-box;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

const Loader = styled.div`
  position: absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  background-color: rgba(0,0,0,0.7);
`;

const Question = styled.textarea`
  width: 100%;
  padding:50px;
  font-size: 28px;
  resize: none;
  text-align: center;
  box-sizing: border-box;
  border-radius: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #e3e2e1;
  padding: 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 50px;
  }
`;


const Options = styled.div`
  
`;

const Select = styled.select`
margin-left:5px;
font-size:16px;
padding:10px;
`;

const Point = styled.select`
`;

const Buttons = styled.div`
  @media (max-width: 600px) {
      margin-top:10px;
  }
`;
const Submit = styled.button`
  Padding:10px 20px;
  background-color: #ffffff;
  font-size:19px;
  margin-left:10px;
  background-color: #2d9da6;
    color: white;
    border: none;
  cursor: pointer;
`;

const Cancel = styled.button`
  Padding:10px 20px;
  background-color: #ffffff;
  font-size:19px;
  border:none;
  cursor: pointer;
`;
export default Leaderboard;