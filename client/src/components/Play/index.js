import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import socketClient from "socket.io-client";
import styled from 'styled-components';
import Loading from '../Loading';
import Header from './Header';
import Landing from './Landing';
import Results from './Results';
import Question from './Question';



const Play = () => {

  const socketRef = useRef();
  const [data, setData] = useState();
  const [status, setStatus] = useState("idle");
  const [alert, setAlert] = useState();
  const [action, setAction] = useState("");
  const { joinCode } = useParams();
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [questionNum, setQuestionNum] = useState(0);

  if (!isLoading && !isAuthenticated) {
    localStorage.setItem("redirectURL", "/play/" + joinCode);
    loginWithRedirect();
  }

  useEffect(() => {
    setStatus("loading");
    if (user) {

      socketRef.current = socketClient.connect("/");

      socketRef.current.on("conAcknowledge", (res) => {
        socketRef.current.emit("joinQuiz", { joinCode, user: user.sub });
      });

      socketRef.current.on("nameRequest", (res) => {
        setAlert(null);
        setData(res.data);
        setAction("nameRequest");
        setStatus("idle");
      });

      socketRef.current.on("newQuestion", (res) => {
        setData(res.data);
        setAlert(null);
        setQuestionNum(res.data.questionNum);
        setAction("newQuestion");
        setStatus("idle");
      });

      socketRef.current.on("result", (res) => {
        setData(res.data);
        setAlert(null);
        setAction("result");
        setStatus("idle");
      });

      socketRef.current.on("success", (res) => {
        setAlert({
          text: res.message,
          backgroundColor: "#2D9DA6"
        });
        setStatus("idle");
      });

      socketRef.current.on("fail", (res) => {
        setAlert({
          text: res.message,
          backgroundColor: "#D5546D"
        });
        setStatus("idle");
      });

      socketRef.current.on("wait", (res) => {
        setAlert({
          text: "Wait...",
          backgroundColor: "#EFA929"
        });
        setStatus("idle");
      });

      socketRef.current.on("NotFound", (res) => {
        setAction("NotFound");
        setStatus("idle");
      });
    }

  }, [user]);  // eslint-disable-line react-hooks/exhaustive-deps

  const settingAlert = (alertData) => {
    setAlert(alertData);
  };

  return <Wrapper>
    {status === "loading" && <Loading />}
    {alert && action !== "result" && <AlertContainer><Alert backgroundColor={alert.backgroundColor}>{alert.text}</Alert></AlertContainer>}
    {status === "idle" && <>
      <Header time={data && data.time} number={data?.questionCounter} settingAlert={settingAlert} questionNum={questionNum} />

      {(() => {

        switch (action) {
          case "nameRequest":
            return <Landing data={data} socketRef={socketRef} />;
          case "newQuestion":
            return <Question questionData={data} socketRef={socketRef} joinCode={joinCode} />;
          case "result":
            return <Results data={data} />;
          case "NotFound":
            return <LoadingMessage>Oops! The Quiz not found...</LoadingMessage>;
          default:
            break;
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
export default Play;