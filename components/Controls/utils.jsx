import {
  COMMAND_CAMERA,
  COMMAND_AXIS_X,
  COMMAND_AXIS_Y,
  COMMAND_SPEED,
  COMMAND_HONK,
  COMMAND_LIGHTS,
} from '../../utils/constants';

// Camera
const KEY_ARROW_LEFT = 37;
const KEY_ARROW_RIGHT = 39;
// Movement
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

// Honk
const KEY_H = 72;
// Lights
const KEY_L = 76;
const KEY_F = 70;

export const CAMERA_LEFT = 'CAMERA_LEFT';
export const CAMERA_RIGHT = 'CAMERA_RIGHT';

export const MOVE_FORWARD = 'MOVE_FORWARD';
export const MOVE_BACKWARD = 'MOVE_BACKWARD';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_RIGHT = 'MOVE_RIGHT';

export const HONK = 'HONK';
export const LIGHTS = 'LIGHTS';
export const FLASH = 'FLASH';

export const KEY_MAP = {
  [KEY_ARROW_LEFT]: CAMERA_LEFT,
  [KEY_ARROW_RIGHT]: CAMERA_RIGHT,

  [KEY_W]: MOVE_FORWARD,
  [KEY_A]: MOVE_LEFT,
  [KEY_S]: MOVE_BACKWARD,
  [KEY_D]: MOVE_RIGHT,

  [KEY_H]: HONK,
  [KEY_L]: LIGHTS,

  [KEY_F]: FLASH,
};

const DEFAULT_SPEED = 0.75;
const TURBO_SPEED = 1;

export const getState = () => ({
  [COMMAND_CAMERA]: 0,

  [COMMAND_AXIS_X]: 0,
  [COMMAND_AXIS_Y]: 0,
  [COMMAND_SPEED]: 0,

  [COMMAND_HONK]: 0,
  [COMMAND_LIGHTS]: 0,
});

const isMoving = (state) => (
  state[COMMAND_AXIS_X] !== 0 || state[COMMAND_AXIS_Y] !== 0
);

export const getStateOn = (state, key) => {
  switch (KEY_MAP[key]) {
    case CAMERA_LEFT: {
      state[COMMAND_CAMERA] = -1;
      return state;
    }
    case CAMERA_RIGHT: {
      state[COMMAND_CAMERA] = 1;
      return state;
    }

    case MOVE_FORWARD: {
      state[COMMAND_AXIS_Y] = 1;
      state[COMMAND_SPEED] = DEFAULT_SPEED;
      return state;
    }
    case MOVE_BACKWARD: {
      state[COMMAND_AXIS_Y] = -1;
      state[COMMAND_SPEED] = DEFAULT_SPEED;
      return state;
    }
    case MOVE_LEFT: {
      state[COMMAND_AXIS_X] = -1;
      state[COMMAND_SPEED] = state[COMMAND_AXIS_Y] ? TURBO_SPEED : DEFAULT_SPEED;
      return state;
    }
    case MOVE_RIGHT: {
      state[COMMAND_AXIS_X] = 1;
      state[COMMAND_SPEED] = state[COMMAND_AXIS_Y] ? TURBO_SPEED : DEFAULT_SPEED;
      return state;
    }

    case HONK: {
      state[COMMAND_HONK] = 1;
      return state;
    }

    case FLASH: {
      state[COMMAND_LIGHTS] = 1;
      return state;
    }

    default: {
      return state;
    }
  }
};

export const getStateOff = (state, key) => {
  switch (KEY_MAP[key]) {
    case CAMERA_LEFT:
    case CAMERA_RIGHT: {
      state[COMMAND_CAMERA] = 0;
      return state;
    }

    case MOVE_FORWARD:
    case MOVE_BACKWARD: {
      state[COMMAND_AXIS_Y] = 0;
      state[COMMAND_SPEED] = isMoving(state) ? DEFAULT_SPEED : 0;
      return state;
    }
    case MOVE_LEFT:
    case MOVE_RIGHT: {
      state[COMMAND_AXIS_X] = 0;
      state[COMMAND_SPEED] = isMoving(state) ? DEFAULT_SPEED : 0;
      return state;
    }

    case HONK: {
      state[COMMAND_HONK] = 0;
      return state;
    }

    case LIGHTS: {
      state[COMMAND_LIGHTS] = state[COMMAND_LIGHTS] ? 0 : 1;
      return state;
    }
    case FLASH: {
      state[COMMAND_LIGHTS] = 0;
      return state;
    }

    default: {
      return state;
    }
  }
};
