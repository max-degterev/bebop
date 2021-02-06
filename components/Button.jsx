import styled, { keyframes } from 'styled-components';
import Slanted from './Slanted';

const backgroundColor = keyframes`
  0% {
    background: #fff;
  }
  20% {
    background: cyan;
  }
  40% {
    background: magenta;
  }
  60%  {
    background: yellow;
  }
  80%  {
    background: cyan;
  }
  100% {
    background: #fff;
  }
`;


const borderColor = keyframes`
  0% {
    border-bottom-color: #fff;
  }
  20% {
    border-bottom-color: cyan;
  }
  40% {
    border-bottom-color: magenta;
  }
  60%  {
    border-bottom-color: yellow;
  }
  80%  {
    border-bottom-color: cyan;
  }
  100% {
    border-bottom-color: #fff;
  }
`;

const Container = styled(Slanted)`
  cursor: pointer;
  color: #000;

  &:hover {
    animation: ${backgroundColor} 2s linear infinite;

    &::before {
      animation: ${borderColor} 2s linear infinite;
    }

    &::after {
      animation: ${backgroundColor} 2s linear infinite;
    }
  }
`;

const Button = ({ children, ...props }) => (
  <Container {...props} background="#fff">
    {children}
  </Container>
);

export default Button;
