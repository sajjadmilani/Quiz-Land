import styled from 'styled-components';
import Pages from '.';

const Home = () => {
  return <Pages>
    <Top>
      <Container>
        <LeftSide>
          <Title>Best realtime Quiz Platform </Title>
          <Desc>Create free  quizzes and interactive realtime to have fun with your friends.</Desc>
        </LeftSide>
        <RightSide><Banner src={window.origin + "/images/quiz-slide.jpg"} /></RightSide>
      </Container >
    </Top>
    <Middle>
      <Container>
        <div>
          <Friends>

            <Banner src={window.origin + "/images/school.png"} />
            <SubTitle>With friends </SubTitle>
          </Friends>
        </div>
        <div>
          <School>

            <Banner src={window.origin + "/images/friends.png"} />
            <SubTitle>At school </SubTitle>
          </School>
        </div>
      </Container>
    </Middle>
  </Pages>;
};
const Top = styled.div`
display: flex;
flex-wrap: wrap;
padding-bottom: 40px;
justify-content: center;
align-items: center;`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  `;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color:#2673AB;
  font-size: 50px;
  max-width: 350px;
  font-weight: bold;
  text-align: left;
  display: flex;
`;

const Desc = styled.p`
  color:#2673AB;
  font-size: 22px;
  max-width: 350px;
  margin-top:20px;
  text-align: left;
  display: flex;

`;
const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:30px;

`;
const Banner = styled.img`
  width: 80%;
  max-width:680px;
`;
const Middle = styled.div`
  padding:30px 0;
  width: 100%;
  background-color: #F2f2f2f2;

`;

const Friends = styled.div`
  background-color: #FFFAF2;
  padding:40px 20px;
  margin: 10px 10px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 20px;
  img{
    width:500px;
  }
`;
const School = styled.div`
  background-color: #EDE6F6;
  padding:40px 20px;
  margin: 01px 10px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 20px;
  img{
    width:500px;
  }
`;
const SubTitle = styled.div`
    font-size: 32px;
    font-weight: bold;
`;
export default Home;