import styled from 'styled-components';
import Slanted from '../Slanted';

const Container = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 10px;
  display: flex;
  justify-content: center;
`;

const ConnectionUnavailable = ({ className }) => (
  <Container className={className}>
    <Slanted background="#f00">Spectator mode</Slanted>
  </Container>
);

export default ConnectionUnavailable;
