import styled from 'styled-components';
import ConnectionStatus from './ConnectionStatus';
import Performance from './Performance';
import UI from './UI';
import Help from './Help';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const HUD = ({ socket }) => (
  <Container>
    <ConnectionStatus socket={socket} />
    {socket && (
      <>
        <UI socket={socket} />
        <Performance socket={socket} />
        <Help />
      </>
    )}
  </Container>
);

export default HUD;
