import styled, { keyframes } from 'styled-components';

const Loading = ({ top }) => {
  return <LoadingContainer topData={top || 0}><Loader />
  </LoadingContainer>;
};

const rotate = keyframes`
  0%,100% {
    left:35px;
  }
  25%{
    transform: scale(0.3);
  }
  50%{
    left:0
  }
  75%{
    transform: scale(1);
  }
`;
const LoadingContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  top: ${p => p.topData}vh;
  `;

const Loader = styled.div`
width: 40px;
position: relative;
height: 40px;
margin: auto;
  &::before, &::after{
  content: '';
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: 50%;
  mix-blend-mode: multiply;
  animation: ${rotate} 1s infinite cubic-bezier(0.77, 0, 0.175, 0);
}
  &::before{
  background-color: #fc3f9e;
}
  &::after{
  background-color: #50e8f3;
  animation-delay: .5s;
}
`;

export default Loading;