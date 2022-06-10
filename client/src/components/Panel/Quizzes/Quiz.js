import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import 'tippy.js/dist/tippy.css';
import Organizer from '..';
import Loading from '../../Loading';

const Quiz = () => {
  const { user } = useAuth0();
  const [quiz, setQuiz] = useState({});
  const [status, setStatus] = useState("idle");
  const { id } = useParams();

  useEffect(() => {
    setStatus("loading");
    fetch(`/api/quiz/${id}`)
      .then(res => res.json())
      .then(data => {
        setQuiz(data.data);
        console.log(data.data);
        setStatus("idle");
      });
  }, []);


  return <>
    <Organizer>
      {status === "loading" && <Loading />}
      {status === "idle" && <>
        <Wrapper>
          <Header>
            <QuizLink>http://localhost:3000/join/{quiz.joinCode}</QuizLink>
            <PageTitle>
              <p>{quiz.name}</p>
              <JoinCode>{quiz.joinCode}</JoinCode>
            </PageTitle>
          </Header>

          <Container>
            <p>Category: {quiz.category}</p>
            stats will be here...
          </Container>

          <Footer>
            <AddQuestion to={`/organizer/question/add/quiz/${id}`}>New Question</AddQuestion>
            <Buttons>
              <Delete>Delete</Delete>
              <Start>Start</Start>
            </Buttons>
          </Footer>
        </Wrapper></>}

    </Organizer>
  </>;
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
const QuizLink = styled.a`
cursor: pointer;

color:#4157b2;
padding-right:30px;
box-sizing: border-box;
text-align: right;
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

const Name = styled.input`
padding:12px;
box-sizing: border-box;
font-size:18px;
width: 100%;
`;

const Catogories = styled.div`
  display: flex;
  flex-wrap:wrap;
  gap:10px;
`;

const Category = styled.button`
  background-color:${props => props.selected ? "#2d9da6" : "#f2f2f2"};
  color:${props => props.selected ? "#ffffff" : "#000000"};
  border:none;
  font-size: 18px;
  padding:10px;
  border-radius: 5px;;
  &:hover{
    background-color:  #2d9da6;
    color: #FFFFFF;
    cursor: pointer;
  }
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
  @media (max-width: 600px) {
      margin-top:10px;
  }
`;
const AddQuestion = styled(Link)`
  padding:10px 20px;
  font-size:19px;
  margin-left:10px;
  background-color: #EFA929;
  text-decoration: none;
    color: white;
    border: none;
  cursor: pointer;
`;
const Delete = styled.button`
  padding:10px 20px;
  font-size:19px;
  margin-left:10px;
  background-color: #d5546d;
    color: white;
    border: none;
  cursor: pointer;
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

export default Quiz;