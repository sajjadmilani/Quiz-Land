import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import 'tippy.js/dist/tippy.css';
import Organizer from '..';
import Loading from '../../Loading';

const Settings = () => {
  const { user } = useAuth0();
  const [profile, setProfile] = useState({});
  const [status, setStatus] = useState("idle");


  useEffect(() => {
    setStatus("loading");
    if (user) {
      fetch(`/api/user/${user.sub}`)
        .then(res => res.json())
        .then(data => {
          setProfile(data.data);
          setStatus("idle");
        });
    }
  }, [user]);

  return <Organizer>
    {status === "loading" && <Loading />}
    {status === "idle" && <>
      <Wrapper>
        <Header>
          <PageTitle>
            Profile
          </PageTitle>
        </Header>

        <Container>
          <InputGroup>
            <Label>Name:</Label>
            <Input value={profile.given_name} />
          </InputGroup>

          <InputGroup>
            <Label>LastName:</Label>
            <Input value={profile.family_name} />
          </InputGroup>

          <InputGroup>
            <Label>Email:</Label>
            <Input value={profile.email} />
          </InputGroup>
        </Container>

        <Footer>

          <Buttons>
            <Start>Save</Start>
          </Buttons>

        </Footer>
      </Wrapper></>}
  </Organizer>;
};



const Wrapper = styled.div`
  max-width: 900px;
  margin:auto;
  background-color:#FFFFFF;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  padding-top:50px;
  padding-bottom: 0;
  flex-direction: column;
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
  display: flex;
  justify-content: space-between;
  padding:25px 50px;
  border-left: 3px solid #4157b2;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  padding:50px;
  padding-top: 10px;
  position: relative;
  box-sizing: border-box;
  height: fit-content;
  display: flex;
  flex-direction: column;

`;
const Label = styled.label`
padding:12px;
box-sizing: border-box;
font-size:18px;

`;
const Input = styled.input`
padding:12px;
box-sizing: border-box;
font-size:18px;
width: 100%;
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

const Buttons = styled.div`
display: flex;
justify-content: flex-end;
  @media (max-width: 600px) {
      margin-top:10px;
  }
`;

const Start = styled.button`
  padding:10px 20px;
  font-size:19px;
  margin-left:10px;
  background-color: #2d9da6;
    color: white;
    border: none;
  cursor: pointer;
`;

const InputGroup = styled.div`
  width: 100%;
  margin-top:20px;
`;
export default Settings;