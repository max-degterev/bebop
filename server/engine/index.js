const clamp = require('lodash/clamp');
const debug = require('debug')('bebop:server:engine');
const { blink, clear: clearLED, light } = require('../../hardware/led');
const { clear: clearBuzzer, beep, honk } = require('../../hardware/buzzer');
const { send } = require('../../hardware/serial');
const { loop } = require('../../utils');
const { convertSimple } = require('./math');

const {
  STATE_LEFT_WHEELS,
  STATE_RIGHT_WHEELS,
  STATE_CAMERA,
  STATE_LIGHTS,
  STATE_HONK,

  COMMAND_CAMERA,
  COMMAND_AXIS_X,
  COMMAND_AXIS_Y,
  COMMAND_SPEED,
  COMMAND_HONK,
  COMMAND_LIGHTS,
} = require('../../utils/constants');

const LOGIC_FPS = 100; // Values above 150 make serial unstable and need a separate sync loop
const MAX_SPEED = 255;
const MAX_ANGLE = 180;
const CAMERA_STEP = 2;
const CONTROLLER_TIMEOUT = 800; // motors time out after 100

const defaultState = {
  [STATE_LEFT_WHEELS]: 0,
  [STATE_RIGHT_WHEELS]: 0,
  [STATE_CAMERA]: 90,
  [STATE_LIGHTS]: 0,
  [STATE_HONK]: 0,
  timestamp: 0,
  pristine: true,
};

const state = {
  current: { ...defaultState },
  previous: { ...defaultState },
};

const getSerialState = (value) => ({
  [STATE_LEFT_WHEELS]: value[STATE_LEFT_WHEELS],
  [STATE_RIGHT_WHEELS]: value[STATE_RIGHT_WHEELS],
  [STATE_CAMERA]: value[STATE_CAMERA],
});

const getState = () => state.current;

const resetState = () => {
  state.current = { ...defaultState };
  state.previous = { ...defaultState };
  debug('Reset state');
};

const setDefaultState = () => {
  state.previous = { ...state.current };
  state.current = { ...defaultState };
  debug('Set state to default');
};

const reset = () => {
  clearBuzzer();
  clearLED();

  resetState();
  send(getSerialState(state.current));

  debug('Engine reset');
};

const startLoop = loop(() => {
  if (state.current.pristine) return; // Don't send updates of pristine state

  if (Date.now() - state.current.timestamp > CONTROLLER_TIMEOUT) setDefaultState();

  send(getSerialState(state.current));

  if (state.previous[STATE_LIGHTS] !== state.current[STATE_LIGHTS]) {
    const fn = state.current[STATE_LIGHTS] ? light : clearLED;
    fn();
  }

  if (state.previous[STATE_HONK] !== state.current[STATE_HONK]) {
    const fn = state.current[STATE_HONK] ? honk : clearBuzzer;
    fn();
  }

  state.previous = { ...state.current };
}, 1000 / LOGIC_FPS);

const update = (command) => {
  // Movement
  const speed = command[COMMAND_SPEED];
  const motors = convertSimple(command[COMMAND_AXIS_X], command[COMMAND_AXIS_Y]);

  const left = clamp(Math.round(motors.left * speed * MAX_SPEED), -MAX_SPEED, MAX_SPEED);
  const right = clamp(Math.round(motors.right * speed * MAX_SPEED), -MAX_SPEED, MAX_SPEED);

  state.current[STATE_LEFT_WHEELS] = left;
  state.current[STATE_RIGHT_WHEELS] = right;

  // Camera
  const cameraShift = command[COMMAND_CAMERA] * CAMERA_STEP;
  // Servo angle is inverted, 180 is left, 0 is right
  const angle = clamp(Math.round(state.current[STATE_CAMERA] - cameraShift), 0, MAX_ANGLE);
  state.current[STATE_CAMERA] = angle;

  // Buzzer
  state.current[STATE_HONK] = command[COMMAND_HONK];

  // Lights
  state.current[STATE_LIGHTS] = command[COMMAND_LIGHTS];

  // Time of update for controller timeouts
  state.current.timestamp = Date.now();
  state.current.pristine = false;
};

const start = () => {
  blink();
  beep();
  startLoop();
  debug('Engine started');
};

const stop = () => {
  startLoop.cancel();
  debug('Engine stopped');
};

module.exports = {
  resetState,
  getState,
  reset,
  update,
  start,
  stop,
};
