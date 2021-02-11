import { useState, useEffect, useCallback, useRef } from 'react';
import { getID } from './utils';

const KEY_TILDE = 192;

export const useConsoleToggle = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      if (event.keyCode !== KEY_TILDE) return;
      event.preventDefault();
      setActive((state) => !state);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return active;
};

const HISTORY_MEMORY_LIMIT = 17;
export const useCommandHistory = () => {
  const [history, setHistory] = useState([]);

  const addItem = useCallback((item) => {
    setHistory((state) => state.concat([{ ...item, id: getID() }]).slice(-HISTORY_MEMORY_LIMIT));
  }, []);

  return [history, addItem];
};

export const useInputHistory = () => {
  const history = useRef({
    list: [],
    index: 0,
  });

  const addItem = (value) => {
    const { list } = history.current;
    history.current.list = list.concat([value]).slice(-HISTORY_MEMORY_LIMIT);
    history.current.index = 0;
  };

  const shiftCursor = (diff = 1) => {
    const { list, index } = history.current;

    let newIndex = index + diff;
    if (newIndex >= list.length) newIndex = 0;
    if (newIndex < 0) newIndex = list.length - 1;
    history.current.index = newIndex;

    return newIndex;
  };

  const getValue = () => {
    const { list, index } = history.current;
    return list[index] || '';
  };

  return [addItem, shiftCursor, getValue];
};
