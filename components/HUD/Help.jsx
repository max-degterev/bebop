import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { BsQuestionOctagonFill as QuestionIcon } from 'react-icons/bs';
import Slanted from '../Slanted';

const ICON_SIZE = 30;

const colorchange = keyframes`
  0% {
    color: #fff;
  }
  20% {
    color: cyan;
  }
  40% {
    color: magenta;
  }
  60%  {
    color: yellow;
  }
  80%  {
    color: cyan;
  }
  100% {
    color: #fff;
  }
`;

const Icon = styled(QuestionIcon)`
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
  cursor: pointer;
  &:hover {
    animation: ${colorchange} 2s linear infinite;
  }
`;

const Container = styled.article`
  margin: 5px 15px;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const Backdrop = styled(Slanted)`
  width: 200px;
  position: absolute;
  left: ${ICON_SIZE * 2}px;
  bottom: 100%;
`;

const List = styled.dl`
  display: flex;
  flex-wrap: wrap;
`;

const Term = styled.dt`
  width: 40%;
  font-weight: bold;
  text-align: center;
`;

const Definition = styled.dd`
  width: 60%;
  margin-left: auto;
  padding-left: 5px;
`;


const Panel = () => (
  <Backdrop>
    <List>
      <Term>WASD</Term>
      <Definition>movement</Definition>

      <Term>H</Term>
      <Definition>horn</Definition>

      <Term>L</Term>
      <Definition>headlights</Definition>

      <Term>F</Term>
      <Definition>flash</Definition>

      <Term>&larr;&rarr;</Term>
      <Definition>camera</Definition>
    </List>
  </Backdrop>
);

const Help = ({ className }) => {
  const [active, setActive] = useState(false);
  const handleClick = () => setActive((state) => !state);

  return (
    <Container className={className}>
      <Icon onClick={handleClick} />
      {active && <Panel />}
    </Container>
  );
};

export default Help;
