import { useState, useEffect } from 'react';
import Wheels from './Wheels';
import Camera from './Camera';
import Peripherals from './Peripherals';
import Spectators from './Spectators';
import Message from './Message';

const COMMAND_UI_SYNC = 'uisync';

const getDefaultState = () => ({
  left: 0,
  right: 0,
  camera: 90,

  icons: {
    playing: false,
    lights: false,
    horn: false,
  },

  viewers: 1,
  text: '',
});

const UI = ({ socket }) => {
  const [state, setState] = useState(getDefaultState);

  useEffect(() => {
    const handler = ({ type, payload }) => {
      if (type !== COMMAND_UI_SYNC) return;
      setState(payload);
    };
    return socket.receiveJSON(handler);
  }, []);

  const { left, right, camera, icons, viewers, text } = state;

  return (
    <>
      <Peripherals {...icons} />
      <Camera angle={camera} />
      <Wheels {...{ left, right }} />
      <Spectators count={viewers} />
      {text && <Message text={text} />}
    </>
  );
};

export default UI;
