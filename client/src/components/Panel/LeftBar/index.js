import styled from 'styled-components';
import Button from '../Button';
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

const LeftBar = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated, user } = useAuth0();

  return <Wrapper>
    <Container>
      <Logo>Quiz Land</Logo>
      <Name>{isAuthenticated && user.name ? user.name : ""}</Name>
      <Button title="Create a Quiz" clickHandler={() => navigate("/panel/quiz/add")} />
    </Container>
    <Nav>
      <NavItem to="/panel/quizzes">Quizzes</NavItem>
      <NavItem to="/panel/results">Results</NavItem>
      <NavItem to="/panel/settings">Settings</NavItem>
      <LogOut onClick={() => logout()}>Log out</LogOut>
    </Nav>
  </Wrapper>;
};

const Wrapper = styled.div`
  background:white;
    width: 200px;
    box-sizing: border-box;
    height: 100vh;
`;

const Container = styled.div`
  padding:0 12px;
`;

const Logo = styled.span`
  font-weight: bold;
  color:#4157b2;
  font-size:24px;
  margin:0 12px;
  border-bottom:1px solid #4157b2;
  height: 60px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Name = styled.div`
  margin:20px 12px;
  text-align: center;
  background-color: #f2f2f2;
  padding:10px;
`;

const Nav = styled.ul`
margin-top:10px;

`;
const NavItem = styled(Link)`
width: 100%;
box-sizing: border-box;
color:black;
padding: 12px 20px;
display: block;
text-decoration: none;
&:hover{
  background: #f2f2f2;
  border-right:3px solid #4157b2;
}
`;
const LogOut = styled.button`
width: 100%;
box-sizing: border-box;
color:black;
padding: 12px 20px;
display: block;
text-decoration: none;
text-align: left;
cursor: pointer;
border: none;
font-size: 18px;
&:hover{
  background: #f2f2f2;
  border-right:3px solid #4157b2;
}
`;

export default LeftBar;