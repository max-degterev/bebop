import { useState } from 'react';

import Stream from '../Stream';
import HUD from '../HUD';
import Controls from '../Controls';
import Console from '../Console';

import { useDelayedSocket } from '../../client/hooks';

const Interface = () => {
  const socket = useDelayedSocket();
  const [canControl, setCanControl] = useState(true);
  const [kicked, setKicked] = useState(false);

  const handleConsole = (isOpen) => setCanControl(!isOpen);
  const handleKick = () => setKicked(true);

  return (
    <>
      {!kicked && <Stream />}
      <HUD socket={socket} onKick={handleKick} />
      {socket && (
        <>
          <Console socket={socket} onChange={handleConsole} />
          {canControl && <Controls socket={socket} />}
        </>
      )}
    </>
  );
};

export default Interface;
