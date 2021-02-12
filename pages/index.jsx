import { useState } from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Interface from '../components/Interface';
import PlayOverlay from '../components/PlayOverlay';

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
  const handleStart = setStarted.bind(null, true);

  return (
    <BoxedLayout>
      <Container>
        <Screen>
          {started && <Interface />}
          {!started && <PlayOverlay onClick={handleStart} />}
        </Screen>
      </Container>
    </BoxedLayout>
  );
};

export default Home;
