import styled from 'styled-components';
import Button from '../Button';
import { Link, useNavigate } from "react-router-dom";

const LeftBar = () => {
  const navigate = useNavigate();

  return <Wrapper>
    <Container>
      <Logo>Quiz Land</Logo>
      <Name>Sajjad Milani</Name>
      <Button title="Create a Quiz" clickHandler={() => navigate("/organizer/add-quiz")} />
    </Container>
    <Nav>
      <NavItem to="/">Quizzes</NavItem>
      <NavItem to="/">Reports</NavItem>
      <NavItem to="/">Settings</NavItem>
      <NavItem to="/">Log out</NavItem>
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
export default LeftBar;