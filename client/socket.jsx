import { controls } from 'uni-config';

const RETRY_TIMEOUT = 1000 * 5;
export const CODE_KICKED = 1008;

const connectSocket = (onUpdate) => {
  const socket = new WebSocket(`ws://${window.location.hostname}:${controls.port}`);
  let tid;

  const reconnect = () => {
    socket.destroy();
    connectSocket(onUpdate);
  };

  const handleReconnect = () => {
    clearTimeout(tid);
    tid = setTimeout(reconnect, RETRY_TIMEOUT);
  };

  const handleClose = ({ code }) => {
    clearTimeout(tid);
    if (code === CODE_KICKED) return;
    tid = setTimeout(reconnect, RETRY_TIMEOUT);
  };

  socket.addEventListener('error', handleReconnect);
  socket.addEventListener('close', handleClose);

  socket.sendJSON = (data) => {
    if (socket.readyState !== socket.OPEN) return;
    socket.send(JSON.stringify(data));
  };

  socket.receiveJSON = (callback) => {
    const handler = ({ data }) => {
      try {
        const json = JSON.parse(data);
        if (!json) return;

        callback(json);
      } catch (_e) { /**/ }
    };
    socket.addEventListener('message', handler);
    return () => socket.removeEventListener('message', handler);
  };

  socket.destroy = (...args) => {
    socket.removeEventListener('error', handleReconnect);
    socket.removeEventListener('close', handleClose);
    clearTimeout(tid);
    socket.close(...args);
  };

  onUpdate?.(socket);
};

export default connectSocket;
