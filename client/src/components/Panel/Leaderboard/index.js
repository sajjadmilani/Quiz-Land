import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import styled from 'styled-components';
import Loading from '../../Loading';
import Header from './Header';
import Landing from './Landing';
import Results from './Results';
import FinalResult from './Results/FinalResult';

const Leaderboard = () => {

  const socketRef = useRef();
  const [data, setData] = useState();
  const [status, setStatus] = useState("idle");
  const [alert, setAlert] = useState();
  const [participants, setParticipants] = useState([]);
  const [action, setAction] = useState("");
  const { joinCode } = useParams();


  useEffect(() => {
    setStatus("loading");
    socketRef.current = io.connect("/");

    socketRef.current.on("conAcknowledge", (res) => {
      console.log(res);
      socketRef.current.emit("organizerJoinQuiz", { joinCode });
    });

    socketRef.current.on("addParticipant", (res) => {
      setParticipants(res.data);
      setAction("addParticipant");
      setStatus("idle");
    });

    socketRef.current.on("waitForJoin", (res) => {
      setData(res.data);
      setAction("waitForJoin");
      setStatus("idle");
    });

    socketRef.current.on("updateLeaderBoard", (res) => {
      setData(res.data);
      setAction("updateLeaderBoard");
      setStatus("idle");
    });

    socketRef.current.on("finalResult", (res) => {
      setData(res.data);
      console.log(res.data);
      setAction("finalResult");
      setStatus("idle");
    });

    socketRef.current.on("fail", (res) => {
      setStatus("fail");
    });
  }, []);

  const settingAlert = (alertData) => {
    setAlert(alertData);
    setInterval(() => {
      setAlert(null);
    }, 3000);
  };

  return <Wrapper>
    {status === "loading" && <Loading />}
    {alert && <AlertContainer><Alert backgroundColor={alert.backgroundColor}>{alert.text}</Alert></AlertContainer>}
    {status === "fail" && <LoadingMessage>Oops! The Quiz not found...</LoadingMessage>}
    {status === "idle" && <>

      <Header time={data?.time} number={data?.questionCounter || 0} settingAlert={settingAlert} questionNum={data?.questionNum} />

      {(() => {

        switch (action) {

          case "finalResult": {
            return <FinalResult winnerName={data.name} />;
          }
          case "waitForJoin":
          case "addParticipant": {
            return <Landing data={data} participants={participants} socketRef={socketRef} />;
          }
          case "updateLeaderBoard": {
            if (data && data.players) {
              return <Results data={data} socketRef={socketRef} />;
            }
          }


        }
      })()}

    </>}
  </Wrapper>;
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  justify-content:flex-start;
  align-items: center;
  flex-direction: column;
  margin:auto;
  background-color:#1E193B;
  box-sizing: border-box;
`;
const AlertContainer = styled.div`
  background-color: rgba(0,0,0,0.7);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
`;

const Alert = styled.div`
  background-color: ${props => props.backgroundColor};
  width:100%;
  text-align: center;
  color:#FFFFFF;

  padding:50px 40px;
  font-size:26px;
  box-sizing: border-box;

`;

const LoadingMessage = styled.div`
  background-color:#312B4F;
  width:450px;
  color:#FFFFFF;
  padding:30px 40px;
  font-size:20px;
  box-sizing: border-box;
  border-radius: 10px;
`;
export default Leaderboard;