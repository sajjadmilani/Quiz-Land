import { useEffect, useState } from 'react';
import { BsHouse } from "react-icons/bs";
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Header = ({ number, time, questionNum }) => {

  const initialMinutes = Math.floor(time / 60);
  const initialSeconds = Math.floor(time % 60);

  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [counter, setCounter] = useState(time);

  //Update time after question changed
  useEffect(() => {
    const calcMinutes = Math.floor(time / 60);
    const calcSeconds = Math.floor(time % 60);
    setMinutes(calcMinutes);
    setSeconds(calcSeconds);
    setCounter(time);
  }, [questionNum]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (time !== 0) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
          setCounter(counter - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
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
  }, [counter]);  // eslint-disable-line react-hooks/exhaustive-deps

  return <Wrapper>

    <HomeContainer to="/panel">
      <BsHouse size={30} />
    </HomeContainer>

    {time > 0 && <Timer>{minutes === 0 && seconds === 0
      ? <h1 style={{ color: "#D5546D" }}> 00:00 </h1>
      : <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
    }</Timer>}

    {number !== 0 && <QuestionCount> {number}</QuestionCount>}
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
  text-decoration: none;
  border-radius:10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  
`;

const QuestionCount = styled.div`
  background-color :#312B4F;
  
`;

const Timer = styled.div`
  background-color :#312B4F;
`;

export default Header;