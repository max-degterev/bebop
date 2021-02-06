import { useEffect } from 'react';
import { useKeyboardState } from './hooks';

const COMMAND_CONTROL = 'ctrl';
const COMMAND_RATE = 1000 / 60; // 60 FPS

const Keyboard = ({ socket }) => {
  const state = useKeyboardState();

  useEffect(() => {
    let tid;

    const loop = () => {
      socket.sendJSON({ type: COMMAND_CONTROL, payload: state.current });
      tid = setTimeout(loop, COMMAND_RATE);
    };

    loop();

    return () => {
      clearTimeout(tid);
    };
  }, []);

  return null;
};

export default Keyboard;
