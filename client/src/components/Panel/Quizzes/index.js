import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import 'tippy.js/dist/tippy.css';
import Organizer from '..';
import Loading from '../../Loading';

const Quizzes = () => {
  const { user, isAuthenticated } = useAuth0();
  const [quizzes, setQuizzes] = useState([]);
  const [status, setStatus] = useState("idle");
  console.log(quizzes);

  useEffect(() => {
    setStatus("loading");
    if (user) {
      fetch(`/api/quizzes/${user.sub}`)
        .then(res => res.json())
        .then(data => {
          setQuizzes(data.data);
          setStatus("idle");
        });
    }
  }, [user]);


  return <>
    <Organizer>
      {status === "loading" && <Loading />}
      {status === "idle" && <>
        <Wrapper>
          {quizzes?.map((quiz) => {
            return <Quiz>
              <Container>
                <Title>{quiz.name}</Title>
              </Container>
              <Footer>
                <Buttons>
                  <Edit to={`/organizer/quiz/${quiz._id}/edit`}>Edit</Edit>
                </Buttons>
              </Footer>
            </Quiz>;
          })}
        </Wrapper></>}

    </Organizer>
  </>;
};

const Wrapper = styled.div`
  max-width: 900px;
  margin:auto;

  box-sizing: border-box;
`;
const Quiz = styled.div`
margin-top:20px;
background-color:#FFFFFF;
`;

const JoinCode = styled.span`
  padding:10px 20px;
  background-color: #ffffff;
  border:1px dashed #cccccc;
  letter-spacing: 10px;
  font-size:19px;
  margin-left:10px;
  cursor: pointer;
`;
const Title = styled.h2`
margin-top:20px;
margin-bottom:10px;
font-size: 22px;
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
  align-content: center;
  align-items: flex-start;
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

const Edit = styled(Link)`
  padding:10px 20px;
  display: block;
  text-decoration: none;
  font-size:19px;
  margin-left:10px;
  background-color: #EFA929;
    color: white;
    border: none;
  cursor: pointer;
`;


export default Quizzes;