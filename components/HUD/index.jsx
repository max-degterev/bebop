import styled from 'styled-components';
import PlayOverlay from './PlayOverlay';
import ConnectionUnavailable from './ConnectionUnavailable';
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

const HUD = ({ className, started, socket, onStart }) => {
  const isPlayVisible = !started;
  const isErrorVisible = started && !socket;
  const isConnected = started && socket;

  return (
    <Container className={className}>
      {isPlayVisible && <PlayOverlay onClick={onStart} />}
      {isErrorVisible && <ConnectionUnavailable />}
      {isConnected && (
        <>
          <UI socket={socket} />
          <Performance socket={socket} />
          <Help />
        </>
      )}
    </Container>
  );
};

export default HUD;
