import { useEffect } from 'react';
import Command from './Command';

import { useCommandHistory } from './hooks';

const COMMAND_CONSOLE_RECEIVE = 'console<';

const History = ({ socket }) => {
  const [history, addItem] = useCommandHistory();

  useEffect(() => {
    const handler = ({ type, payload }) => {
      if (type !== COMMAND_CONSOLE_RECEIVE) return;
      addItem(payload);
    };

    return socket.receiveJSON(handler);
  }, []);

  return history.map((item) => <Command key={item.id} item={item} />);
};

export default History;
