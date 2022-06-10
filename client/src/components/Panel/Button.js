import styled from 'styled-components';
const Button = ({ title, width, clickHandler }) => {
  return <StyledButton width={width || '100%'} onClick={clickHandler}>{title}</StyledButton>;
};
const StyledButton = styled.button`
    background: #2d9da6;
    margin-top:10px;
    width: ${props => props.width};
    color: white;
    border: none;
    cursor: pointer;
    padding: 12px 14px;
    font-size: 18px;
    border-radius: 6px;
    &:hover{
      background-color: #056c74;
    }
`;
export default Button;