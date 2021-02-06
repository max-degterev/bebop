import styled from 'styled-components';

const SLANT_SIZE = 25;

const Container = styled.span`
  padding: 15px 30px 15px 0;
  display: inline-block;
  position: relative;
  background: ${({ background }) => (background || '#000')};
  color: #fff;

  &::before {
    width: 0;
    height: 0;

    display: block;
    content: '';

    position: absolute;
    top: 0;
    left: -${SLANT_SIZE}px;

    border: 0 solid transparent;
    border-right-width: 0px;
    border-left-width: ${SLANT_SIZE}px;
    border-bottom: ${SLANT_SIZE}px solid ${({ background }) => (background || '#000')};
  }

  &::after {
    width: ${SLANT_SIZE}px;
    height: calc(100% - ${SLANT_SIZE}px);

    display: block;
    content: '';

    position: absolute;
    top: ${SLANT_SIZE}px;
    left: -${SLANT_SIZE}px;

    background: ${({ background }) => (background || '#000')};
  }
`;

const Slanted = ({ children, ...props }) => (
  <Container {...props}>
    {children}
  </Container>
);

export default Slanted;
