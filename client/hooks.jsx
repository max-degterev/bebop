import { useState, useRef, useEffect } from 'react';
import connectSocket from './socket';

export const useSocket = () => {
  const [connected, setConnected] = useState(false);
  const connection = useRef(null);

  useEffect(() => {
    const updateState = () => {
      const socket = connection.current;
      setConnected(socket.readyState === socket.OPEN);
    };

    const updateSocket = (socket) => {
      connection.current = socket;
      socket.addEventListener('open', updateState);
      socket.addEventListener('error', updateState);
      socket.addEventListener('close', updateState);
    };

    connectSocket(updateSocket);

    return () => {
      const socket = connection.current;
      if (!socket) return;

      socket.removeEventListener('open', updateState);
      socket.removeEventListener('error', updateState);
      socket.removeEventListener('close', updateState);
      socket.destroy();
    };
  }, []);

  return connected ? connection.current : null;
};

const CONNECTION_STABILITY_DELAY = 500;

export const useDelayedSocket = () => {
  const [connected, setConnected] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return setConnected(false);

    const handleDelay = setConnected.bind(null, true);
    const tid = setTimeout(handleDelay, CONNECTION_STABILITY_DELAY);
    return () => clearTimeout(tid);
  }, [socket]);

  return connected ? socket : null;
};
