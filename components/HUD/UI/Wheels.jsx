import styled from 'styled-components';
import { getMotorCapacity } from './utils';

const Container = styled.article`
  margin: 10px;
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 10px;
`;

const Motor = styled.div`
  margin-left: 3px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Value = styled.span`
  position: relative;
  overflow: hidden;
  display: block;

  &::after {
    width: 100%;
    height: 50px;
    display: block;
    content: '';
    position: absolute;
    left: 0;
  };
`;

const Box = styled.span`
  width: 8px;
  height: 50px;
  display: block;
  display: flex;
  flex-direction: column;
  justify-content: ${({ reverse }) => (reverse ? 'flex-start' : 'flex-end')};
  border: 1px solid #fff;
  ${({ reverse }) => (reverse ? 'border-top: none' : 'border-bottom: none')};

  ${Value}::after {
    ${({ reverse }) => (reverse ? 'top: 0' : 'bottom: 0')};
    background: linear-gradient(${({ reverse }) => (reverse ? '180' : '0')}deg, #0f0 0%, #ff0 50%, #f00 100%);
  };
`;


const Capacity = ({ reverse, value }) => (
  <Box reverse={reverse}>
    <Value style={{ height: `${getMotorCapacity(value)}%` }} />
  </Box>
);

const Wheel = ({ children, value }) => (
  <Motor>
    {children}
    <Capacity value={value > 0 && value} />
    <Capacity value={value < 0 && value} reverse />
  </Motor>
);

const Wheels = ({ className, left, right }) => (
  <Container className={className}>
    <Wheel value={left}>L</Wheel>
    <Wheel value={right}>R</Wheel>
  </Container>
);

export default Wheels;
