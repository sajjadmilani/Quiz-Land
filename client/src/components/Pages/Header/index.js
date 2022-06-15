import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  return <Wrapper>
    <Container>
      <Logo>[ Quiz Land ]</Logo>
      {!isAuthenticated ?
        <Button onClick={() => loginWithRedirect()}>Sign In / Sing Up</Button> : <div>
          <StyledLink to="/panel/quizzes">Control Panel</StyledLink>
          <Button onClick={() => logout()}>Sign Out</Button>
        </div>
      }
    </Container>
  </Wrapper>;
};

const Wrapper = styled.div`
  background:#4157B2;
  height: 60px;
  padding: 0 20px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  color:white;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: auto;
  display: flex;
  justify-content:space-between;
  align-items: center;
  `;

const Button = styled.button`
  background-color: rgba(255,255,255,0.5);
  padding: 10px;
  color:#4157B2;
  font-size: 16px;
  font-weight:bold;
  border: none;
  cursor: pointer;
`;
const StyledLink = styled(Link)`
  background-color: rgba(255,255,255,0.5);
  padding: 10px;
  color:#4157B2;
  margin-right:10px;
  font-size: 16px;
  text-decoration:none;
  font-weight:bold;
  border: none;
  cursor: pointer;
`;
const Logo = styled.div`
  font-size: 22px;


`;
export default Header;