import Keyboard from './Keyboard';

const Controls = ({ started, socket }) => {
  if (!started || !socket) return null;
  return <Keyboard socket={socket} />;
};

export default Controls;
