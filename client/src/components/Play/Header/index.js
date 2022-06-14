import { useEffect, useState } from 'react';
import { BsHouse } from "react-icons/bs";
import { Link } from 'react-router-dom';


import styled from 'styled-components';

const Header = ({ number, time, settingAlert, questionNum }) => {

  const initialMinutes = Math.floor(time / 60);
  const initialSeconds = Math.floor(time % 60);

  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [counter, setCounter] = useState(time);

  useEffect(() => {
    const calcMinutes = Math.floor(time / 60);
    const calcSeconds = Math.floor(time % 60);
    setMinutes(calcMinutes);
    setSeconds(calcSeconds);
    setCounter(time);

  }, [questionNum]);

  useEffect(() => {
    console.log(initialMinutes, initialSeconds);
    let myInterval = setInterval(() => {
      console.log(seconds);
      if (time !== 0) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
          setCounter(counter - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);

            settingAlert({ text: "TIME OUT", type: "incorrect", backgroundColor: "#D5546D" });
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [counter]);

  return <Wrapper>

    <HomeContainer to="/">
      <BsHouse size={30} />
    </HomeContainer>


    {time > 0 && <Timer>{minutes === 0 && seconds === 0
      ? <h1> 00:00 </h1>
      : <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
    }</Timer>}

    <QuestionCount>{number}</QuestionCount>
  </Wrapper>;
};

const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  padding:0 50px;
  font-size: 18px;
  color:#FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  div{
    padding:10px 20px;
    border-radius: 10%;
  }
`;

const HomeContainer = styled(Link)`
  background-color :#312B4F;
  border-radius: 10;
  padding:5px 10px;
  color:#FFFFFF;
  border:none;
  border-radius:10px;
  cursor: pointer;
  
`;

const QuestionCount = styled.div`
  background-color :#312B4F;
  
`;

const Timer = styled.div`
  background-color :#312B4F;
`;

export default Header;