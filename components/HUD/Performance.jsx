import { useState, useEffect } from 'react';
import styled from 'styled-components';

const COMMAND_PING = 'ping';
const COMMAND_PONG = 'pong';
const PING_CHECK_FREQUENCY = 1000 / 2;

const getColor = (value) => {
  if (value < 20) return '#0f0';
  if (value < 75) return '#ff0';
  if (value >= 75) return '#f00';
};

const Container = styled.article`
  margin: 10px;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 12px;
`;

const Performance = ({ className, socket }) => {
  const [latency, setLatency] = useState(0);

  useEffect(() => {
    let tid;

    const handler = ({ type, payload }) => {
      if (type !== COMMAND_PONG) return;
      const value = Date.now() - payload;
      setLatency(value);
    };

    const loop = () => {
      socket.sendJSON({ type: COMMAND_PING, payload: Date.now() });
      tid = setTimeout(loop, PING_CHECK_FREQUENCY);
    };

    const stopListening = socket.receiveJSON(handler);
    loop();

    return () => {
      clearTimeout(tid);
      stopListening();
    };
  }, []);

  const style = { color: getColor(latency) };

  return (
    <Container className={className}>
      Delay: <span style={style}>{latency}ms</span>
    </Container>
  );
};

export default Performance;
