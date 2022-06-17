
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Panel from '..';
import { PageContext } from '../../Contexts/PageContext';

const Join = () => {

  const [code, setCode] = useState("");
  const { setPageName } = useContext(PageContext);
  setPageName("Join to quiz");

  const navigate = useNavigate();

  const inputChange = (value) => {
    if (code.length < 6) {
      setCode(value);
    }
  };

  const startHandler = () => {
    if (code.length === 6) {
      navigate("/play/" + code);
    }
  };

  return <Panel>

    <Wrapper>
      <Header>
        <PageTitle>Join the quiz</PageTitle>
      </Header>

      <Container>
        <JoinCode maxlength="6" type="text" value={code} placeholder="Join Code..." onChange={(ev) => inputChange(ev.target.value)} />

      </Container>

      <Footer>
        <Buttons>
          <Start onClick={startHandler}>Start</Start>
        </Buttons>
      </Footer>
    </Wrapper>
  </Panel>;
};

const Wrapper = styled.div`
  max-width: 700px;
  margin:auto;
  background-color:#FFFFFF;
  box-sizing: border-box;

`;

const Header = styled.div`
  display: flex;
  padding-top:50px;
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
const PageTitle = styled.h2`
margin-top:20px;
margin-bottom:30px;
font-size: 27px;
background-color: #f2f2f2;
display: block;
width: 100%;
padding:25px 50px;
border-left: 3px solid #4157b2;
`;



const Container = styled.div`
  width: 100%;
  padding:50px;
  padding-top: 10px;
  position: relative;
  box-sizing: border-box;
  height: fit-content;
  display: flex;
justify-content: center;
  align-content: center;

  
`;

const JoinCode = styled.input`
padding:12px;
box-sizing: border-box;
font-size:24px;

width:fit-content;
text-align: center;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #e3e2e1;
  padding: 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 50px;
  }
`;

const Buttons = styled.div`
  @media (max-width: 600px) {
      margin-top:10px;
  }
`;

const Start = styled.button`
  Padding:10px 20px;
  background-color: #ffffff;
  font-size:19px;
  margin-left:10px;
  background-color: #2d9da6;
    color: white;
    border: none;
  cursor: pointer;
`;

export default Join;