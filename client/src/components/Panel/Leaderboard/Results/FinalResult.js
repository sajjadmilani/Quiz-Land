import { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import styled from 'styled-components';

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
};

function getAnimationSettings(angle, originX) {
  return {
    particleCount: 5,
    angle,
    spread: 80,
    origin: { x: originX },
    colors: ["#fc3f9e", "#FFFFFF", "#FFBF67"]
  };
}

const FinalResult = ({ winnerName }) => {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 16));
    }
  }, [nextTickAnimation, intervalId]);


  useEffect(() => {
    startAnimation();
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);
  return <>
    <Wrapper>

      <GoldenCup src={window.origin + "/images/golder-cup.png"}></GoldenCup>
      <Winner><Title>Winner</Title> <span>{winnerName}</span></Winner>
    </Wrapper>
    <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} resize={true} />
  </>;
};
const Wrapper = styled.div`
margin-top:10vh;
display: flex;
flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const GoldenCup = styled.img`
max-width: 400px;
`;
const Winner = styled.div`
display: flex;
width:100%;
max-width: 250px;
font-size:28px;
background-color: #FDAB3B;
border:3px solid #F0752C;
border-radius: 20px;
align-items: center;
overflow: hidden;

span{
  padding:10px 30px;
}
`;
const Title = styled.div`
font-size: 20px;
background-color:#F0752C;
color:#FFFFFF;
height: 100%;
display: flex;
align-items: center;
padding:10px 15px;
`;
export default FinalResult;