import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
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
  //{ text: "Wait...", type: "incorrect", backgroundColor: "#EFA929" }
  const [alert, setAlert] = useState();
  const [action, setAction] = useState("");
  const { joinCode } = useParams();
  const { user } = useAuth0();

  useEffect(() => {
    setStatus("loading");
    socketRef.current = io.connect("/");

    socketRef.current.on("conAcknowledge", (res) => {
      console.log(res);
      socketRef.current.emit("setQuiz", { joinCode });
    });

    socketRef.current.on("nameRequest", (res) => {
      setData(res.data);
      console.log(res);
      setAction("nameRequest");
      setStatus("idle");
    });

    socketRef.current.on("wait", (res) => {
      setData(res.data);
      setAlert({
        text: "Wait...",
        type: "incorrect",
        backgroundColor: "#EFA929"
      });
      setStatus("idle");
    });

    socketRef.current.on("newQuestion", (res) => {
      setData(res.data);
      console.log(res);
      setAlert(null);
      setAction("newQuestion");
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
      <Header time={data && data.time} number={"1/2"} settingAlert={settingAlert} />

      {(() => {

        switch (action) {
          case "nameRequest":
            return <Landing data={data} socketRef={socketRef} />;
          case "newQuestion":
            return <Question questionData={data} />;
          default:
            break;
        }

      })()}

      {/* {quiz && <Results quiz={quiz} />} */}

      {/* {quiz && quiz.questions[0] && } */}
      {/* <button onClick={clickHandler} >test</button>
        {value.map((test) => { return <div style={{ fontSize: "40px", marginLeft: "40px", background: "pink" }}>{test}</div>; })} */}
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