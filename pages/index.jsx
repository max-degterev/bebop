import { useState } from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Stream from '../components/Stream';
import HUD from '../components/HUD';
import Controls from '../components/Controls';
import Console from '../components/Console';

import { useDelayedSocket } from '../client/hooks';

const BoxedLayout = styled(Layout)`
  min-height: auto;
  max-width: 133vh;
  margin: 0 auto;
`;

const Container = styled.div`
  height: 0;
  padding-top: 75%;
  position: relative;
  overflow: hidden;
`;

const Screen = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const Home = () => {
  const [started, setStarted] = useState(false);
  const [canControl, setCanControl] = useState(true);
  const socket = useDelayedSocket();

  const handleStart = () => setStarted(true);
  const handleConsoleChange = (isOpen) => setCanControl(!isOpen);

  return (
    <BoxedLayout>
      <Container>
        <Screen>
          <Stream started={started} />
          <HUD started={started} socket={socket} onStart={handleStart} />
          <Console started={started} socket={socket} onChange={handleConsoleChange} />
          {canControl && <Controls started={started} socket={socket} />}
        </Screen>
      </Container>
    </BoxedLayout>
  );
};

export default Home;
