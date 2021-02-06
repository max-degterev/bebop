import styled from 'styled-components';
import Button from '../Button';

const Container = styled.article`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = ({ className, onClick }) => (
  <Container className={className}>
    <Button onClick={onClick}>Connect to the stream</Button>
  </Container>
);

export default Overlay;
