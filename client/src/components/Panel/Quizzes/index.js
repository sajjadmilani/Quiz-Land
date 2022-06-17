import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import 'tippy.js/dist/tippy.css';
import Organizer from '..';
import Loading from '../../Loading';

const Quizzes = () => {
  const { user } = useAuth0();
  const [quizzes, setQuizzes] = useState([]);
  const [status, setStatus] = useState("idle");

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
  }, [user]);   // eslint-disable-line react-hooks/exhaustive-deps


  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };


  return <>
    <Organizer>
      {status === "loading" && <Loading />}
      {status === "idle" && <>
        <Wrapper>
          {quizzes?.map((quiz) => {
            return <Quiz key={quiz._id}>
              <Container>
                <Title>{quiz.name}</Title>

                <Detail>
                  <Name>Category:</Name>
                  <Value>{quiz.category}</Value>
                </Detail>

                <Detail>
                  <Name>Questions Count:</Name>
                  <Value>{quiz.questions.length}</Value>
                </Detail>

                <Detail>
                  <Name>Created Date:</Name>
                  <Value>{new Date(quiz.createDate).toLocaleDateString('en-us', options)}</Value>
                </Detail>

              </Container>
              <Footer>
                <Buttons>
                  <Edit to={`/panel/quiz/${quiz._id}/edit`}>Edit</Edit>
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


const Title = styled.h2`
margin-top:20px;
margin-bottom:20px;
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
const Detail = styled.div`
  margin-bottom:10px;
  display: flex;
  align-items: center;
  border:1px solid #cccccc;
  width: 50%;
  @media (max-width:700px) {
    width: 100%;
  }
`;
const Name = styled.div`
  margin-right: 10px;
  background-color: #f6f6f6;
  padding:10px
`;
const Value = styled.div`
padding:10px
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