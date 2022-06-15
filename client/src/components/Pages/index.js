import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const Pages = ({ children }) => {
  return <Wrapper>
    <Header />
    <Container>{children}</Container>
    <Footer />
  </Wrapper>;
};

const Wrapper = styled.div`

`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;

`;
export default Pages;