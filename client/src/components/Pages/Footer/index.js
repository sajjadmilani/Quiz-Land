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

const Logo = styled.div`
  font-size: 22px;


`;
export default Footer;