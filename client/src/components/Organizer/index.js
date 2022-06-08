import styled from 'styled-components';
import Header from "./Header";
import LeftBar from './LeftBar';
const Organizer = ({ children }) => {
  return <>
    <Container>
      <LeftBar />

      <Wrapper>
        <Header />
        {children}
      </Wrapper>
    </Container>
  </>;
};
const Container = styled.div`
display: flex;
background-color: #f2f2f2;
`;
const Wrapper = styled.div`
width: 100%;
height: 100vh;
    overflow: auto;
`;
export default Organizer;