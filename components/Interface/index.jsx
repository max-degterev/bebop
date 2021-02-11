import { useState } from 'react';

import Stream from '../Stream';
import HUD from '../HUD';
import Controls from '../Controls';
import Console from '../Console';

import { useDelayedSocket } from '../../client/hooks';

const Home = () => {
  const socket = useDelayedSocket();
  const [canControl, setCanControl] = useState(true);

  const handleConsole = (isOpen) => setCanControl(!isOpen);

  return (
    <>
      <Stream />
      <HUD socket={socket} />
      {socket && (
        <>
          <Console socket={socket} onChange={handleConsole} />
          {canControl && <Controls socket={socket} />}
        </>
      )}
    </>
  );
};

export default Home;
