import styled from 'styled-components';

const Footer = () => {

  return <Wrapper>
    <Container>
      <Logo>[ Quiz Land ]</Logo>

    </Container>
  </Wrapper>;
};

const Wrapper = styled.div`
  background:#4157B2;
  height: 60px;
  padding: 0 20px;

  min-height: 200px;
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

const Logo = styled.div`
  font-size: 22px;


`;
export default Footer;