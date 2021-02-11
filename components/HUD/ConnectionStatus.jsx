import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { CODE_KICKED } from '../../client/socket';
import Slanted from '../Slanted';

const Container = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 10px;
  display: flex;
  justify-content: center;
`;

const Text = styled(Slanted).attrs({ background: '#f00' })`
  max-width: 300px;
`;

const TEXT_KICKED = 'You were kicked due to inactivity. Refresh browser window to reconnect.';
const TEXT_SPECTATING = 'You are spectating';

const ConnectionStatus = ({ socket }) => {
  const [kicked, setKicked] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const handler = ({ code }) => {
      if (code !== CODE_KICKED) return;
      setKicked(true);
    };

    socket.addEventListener('close', handler);

    return () => {
      socket.removeEventListener('close', handler);
    };
  }, [socket]);

  if (socket) return null;

  return (
    <Container>
      <Text>{kicked ? TEXT_KICKED : TEXT_SPECTATING}</Text>
    </Container>
  );
};

export default ConnectionStatus;
