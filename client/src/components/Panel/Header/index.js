import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const navigate = useNavigate();
  return <Wrapper>
    <JoinCode onClick={() => navigate("/panel/quiz/join")}>Enter Code</JoinCode>
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
  justify-content: flex-end;
`;

const JoinCode = styled.button`
  background-color: rgba(255,255,255,0.5);
  padding: 10px;
  color:#4157B2;
  font-size: 16px;
  font-weight:bold;
  border: none;
  cursor: pointer;
`;
export default Header;