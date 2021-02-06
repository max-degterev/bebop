import { useRef, useEffect } from 'react';

import { KEY_MAP, getState, getStateOn, getStateOff } from './utils';

const EVENT_OPTIONS = { passive: false };


export const useKeyboardState = () => {
  const state = useRef(getState());

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!KEY_MAP[event.keyCode]) return;
      event.preventDefault();
      state.current = getStateOn(state.current, event.keyCode);
    };

    const handleKeyUp = (event) => {
      if (!KEY_MAP[event.keyCode]) return;
      state.current = getStateOff(state.current, event.keyCode);
    };

    window.addEventListener('keydown', handleKeyDown, EVENT_OPTIONS);
    window.addEventListener('keyup', handleKeyUp, EVENT_OPTIONS);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, EVENT_OPTIONS);
      window.removeEventListener('keyup', handleKeyUp, EVENT_OPTIONS);
    };
  }, []);

  return state;
};
