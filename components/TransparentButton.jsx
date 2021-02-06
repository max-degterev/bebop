import styled, { keyframes } from 'styled-components';
import TransparentSlanted from './TransparentSlanted';

const colorchange = keyframes`
  0% {
    color: #fff;
  }
  20% {
    color: cyan;
  }
  40% {
    color: magenta;
  }
  60%  {
    color: yellow;
  }
  80%  {
    color: cyan;
  }
  100% {
    color: #fff;
  }
`;

const Container = styled(TransparentSlanted)`
  cursor: pointer;
  &:hover {
    animation: ${colorchange} 2s linear infinite;
  }
`;

const Button = ({ children, ...props }) => (
  <Container {...props}>
    {children}
  </Container>
);

export default Button;
