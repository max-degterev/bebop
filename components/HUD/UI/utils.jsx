import clamp from 'lodash/clamp';

const MAX_MOTOR_VALUE = 255;
const MAX_CAMERA_ANGLE = 180;

export const valueToPercent = (value = 0, maxValue = 1) => (
  Math.floor((Math.abs(value) / maxValue) * 100)
);

export const percentToPixel = (percent = 0, maxValue = 1) => Math.floor((percent * maxValue) / 100);

export const getMotorCapacity = (value) => valueToPercent(value, MAX_MOTOR_VALUE);

export const getCameraOffset = (angle) => {
  const value = clamp(MAX_CAMERA_ANGLE - angle, 0, MAX_CAMERA_ANGLE);
  return valueToPercent(value, MAX_CAMERA_ANGLE);
};
