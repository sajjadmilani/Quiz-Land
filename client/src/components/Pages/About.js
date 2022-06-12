import { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
const About = () => {
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

      // newValue.push(dataFromClient.text);
      setValue(newValue);
      console.log(dataFromClient.text);
    });
  }, []);
  const clickHandler = () => {
    socketRef.current.emit('newMessageToServer', { text: "hii" });
  };
  console.log(value);
  return <><button onClick={clickHandler} >test</button>
    {value.map((test) => { return <div style={{ fontSize: "40px", marginLeft: "40px", background: "pink" }}>{test}</div>; })}
  </>;
};

export default About;