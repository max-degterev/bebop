import { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { version } from '../../package';

import Input from './Input';
import History from './History';

import { useConsoleToggle } from './hooks';

const COMMAND_CONSOLE_SEND = '>console';

const Container = styled.div`
  width: 100%;
  height: 75%;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;

  transform: translateY(${({ active }) => (active ? '0' : '-100%')});
  backdrop-filter: blur(3px);
  background-color: rgba(50, 50, 50, .7);
  transition: transform 100ms ease;

  font: normal 16px/1.4 monospace;
  color: #0f0;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &::after {
    content: 'bebop v${version}';
    margin: 2px 5px;
    position: absolute;
    top: 0;
    right: 0;
    color: rgba(0, 0, 0, .5);
    font: 300 12px/1 Roboto, sans-serif;
  }
`;

const Console = ({ className, socket, onChange }) => {
  const ref = useRef(null);
  const active = useConsoleToggle();
  useEffect(() => { onChange(active); }, [active]);

  const handleClick = () => ref.current.focus();
  const handleSubmit = (payload) => socket.sendJSON({ payload, type: COMMAND_CONSOLE_SEND });

  return (
    <Container className={className} active={active} onClick={handleClick}>
      <History socket={socket} />
      {active && <Input onSubmit={handleSubmit} ref={ref} />}
    </Container>
  );
};

export default Console;
