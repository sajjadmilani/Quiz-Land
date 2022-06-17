
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import 'tippy.js/dist/tippy.css';
import Organizer from '..';
import { PageContext } from '../../Contexts/PageContext';
import Loading from '../../Loading';
import QuestionItem from './QuesionItem';

const Quiz = () => {
  const [quiz, setQuiz] = useState({});
  const [status, setStatus] = useState("idle");
  const { id } = useParams();
  const { setPageName } = useContext(PageContext);
  setPageName("Quiz Detail");
  const navigate = useNavigate();
  useEffect(() => {
    setStatus("loading");
    fetch(`/api/quiz/${id}`)
      .then(res => res.json())
      .then(data => {

        setQuiz(data.data);
        setStatus("idle");
      });
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps


  return <>
    <Organizer>
      {status === "loading" && <Loading />}
      {status === "idle" && <>
        <Wrapper>
          <QuizContainer>
            <Header>
              <QuizLink>{`/${window.location.origin}/join/${quiz.joinCode}`}</QuizLink>
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
              <AddQuestion to={`/panel/question/add/quiz/${id}`}>New Question</AddQuestion>
              <Buttons>
                <Delete>Delete</Delete>
                <Start onClick={() => navigate("/panel/leaderboard/" + quiz.joinCode)}>Start</Start>
              </Buttons>
            </Footer>
          </QuizContainer>
          {quiz.questions?.map((question, index) => {
            return <QuestionItem key={index} id={question.questionId} index={index} />;
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
const QuizContainer = styled.div`
  background-color: #FFFFFF;
  box-shadow: 1px 1px 5px 1px #cccccc;
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