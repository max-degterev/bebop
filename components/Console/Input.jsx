import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import styled from 'styled-components';

import { useInputHistory } from './hooks';

const KEY_ENTER = 13;
const KEY_UP = 38;
const KEY_DOWN = 40;

const Container = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
`;

const Field = styled.input.attrs({
  autoComplete: 'off',
  autoCorrect: 'off',
  autoCapitalize: 'off',
  spellCheck: 'false',
  type: 'text',
  autoFocus: true,
})`
  width: 100%;
  margin-left: 5px;
  background: transparent;
  border: none;
  outline: none;
  color: inherit;
  cursor: default;
`;

const Input = ({ className, onSubmit }, ref) => {
  const inputRef = useRef(null);
  const [addItem, shiftCursor, getValue] = useInputHistory();

  const handleSubmit = (event) => {
    const { value } = inputRef.current;
    if (!value.length) return;

    event.preventDefault();
    onSubmit(value);
    addItem(value);

    inputRef.current.value = '';
  };

  const handleHistory = (event) => {
    const { current: node } = inputRef;
    if (node.selectionStart !== node.value.length) return;
    event.preventDefault();
    const diff = event.keyCode === KEY_UP ? -1 : 1;
    shiftCursor(diff);
    inputRef.current.value = getValue();
  };

  useEffect(() => {
    const handler = (event) => {
      if (!inputRef.current) return;
      if (event.keyCode === KEY_ENTER) return handleSubmit(event);
      if (event.keyCode === KEY_UP || event.keyCode === KEY_DOWN) return handleHistory(event);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useImperativeHandle(ref, () => ({
    focus: () => { inputRef.current?.focus(); },
  }));

  return (
    <Container className={className}>
      &gt; <Field ref={inputRef} />
    </Container>
  );
};

export default forwardRef(Input);
