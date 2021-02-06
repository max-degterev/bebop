import styled from 'styled-components';

const Container = styled.span`
  padding: 15px 30px;
  display: inline-block;
  overflow: hidden;
  position: relative;

  &::before {
    display: block;
    content: '';

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 30px;

    border-right: 1px solid;
    border-top: 1px solid;
  }

  &::after {
    display: block;
    content: '';

    position: absolute;
    top: 27px;
    right: 0;
    bottom: 0;
    left: 0;

    border-left: 1px solid;
    border-bottom: 1px solid;
  }
`;

const Slant = styled.span`
  display: block;
  position: absolute;

  top: 0;
  right: 0;
  bottom: 0;
  left: -25px;
  z-index: 0;

  border: 1px solid;
  transform: skew(-45deg);
  transform-origin: bottom left;
`;

const TransparentSlanted = ({ children, ...props }) => (
  <Container {...props}>
    <Slant />
    {children}
  </Container>
);

export default TransparentSlanted;
