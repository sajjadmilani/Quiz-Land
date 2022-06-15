import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'tippy.js/dist/tippy.css';
import Panel from '..';
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';

const AddQuiz = () => {
  const { user } = useAuth0();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [status, setStatus] = useState("idle");

  const navigate = useNavigate();

  useEffect(() => {
    setStatus("loading");
    fetch(`/api/getCategories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data.data);
        setStatus("idle");
      });
  }, []);

  const submitHandler = () => {
    console.log(name, selectedCategory, user);
    fetch("/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: selectedCategory, name, user })
    })
      .then(res => res.json())
      .then(data =>
        navigate(`/panel/quiz/${data.data.id}/edit`)
      );
  };

  return <>
    <Panel>
      {status === "loading" && <Loading />}
      {status === "idle" && <>
        <Wrapper>
          <Header>
            <PageTitle>Create a quiz</PageTitle>
          </Header>

          <Container>
            <Name type="text" value={name} placeholder="Name of quiz..." onChange={(ev) => setName(ev.target.value)} />
            <Title>Choose a category:</Title>
            <Catogories>
              {categories.map((category) => {
                return <Category onClick={() => setSelectedCategory(category.name)} selected={selectedCategory === category.name}>{category.name}</Category>;
              })}
            </Catogories>

          </Container>

          <Footer>
            <Buttons>
              <Submit onClick={submitHandler}>Save</Submit>
            </Buttons>
          </Footer>
        </Wrapper></>}

    </Panel>
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

const Submit = styled.button`
  Padding:10px 20px;
  background-color: #ffffff;
  font-size:19px;
  margin-left:10px;
  background-color: #2d9da6;
    color: white;
    border: none;
  cursor: pointer;
`;

export default AddQuiz;