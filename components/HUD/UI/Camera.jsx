import styled from 'styled-components';

import { getCameraOffset, percentToPixel } from './utils';

const ZONE_WIDTH = 300;

const Container = styled.article`
  margin-top: 10px;
  display: flex;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  font-size: 10px;
`;

const Zone = styled.span`
  width: ${ZONE_WIDTH}px;
  height: 5px;
  display: block;
  position: relative;
  background: #fff;

  &::before {
    width: 0;
    height: 0;

    content: '';

    position: absolute;
    top: 0;
    left: -5px;

    border: 0 solid transparent;
    border-right-width: 0px;
    border-left-width: 5px;
    border-top: 5px solid #fff;
  }

  &::after {
    width: 0;
    height: 0;

    content: '';

    position: absolute;
    top: 0;
    right: -5px;

    border: 0 solid transparent;
    border-left-width: 0px;
    border-right-width: 5px;
    border-top: 5px solid #fff;
  }
`;

const Viewport = styled.span`
  width: 0;
  height: 0;

  position: absolute;
  top: 100%;
  left: -5px;

  border: 0 solid transparent;
  border-left-width: 5px;
  border-right-width: 5px;
  border-bottom: 5px solid #fff;
`;

const Camera = ({ className, angle }) => {
  const position = percentToPixel(getCameraOffset(angle), ZONE_WIDTH);
  const style = { transform: `translateX(${position}px)` };

  return (
    <Container className={className}>
      <Zone />
      <Viewport style={style} />
    </Container>
  );
};

export default Camera;
