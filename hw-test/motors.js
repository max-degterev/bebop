const { send } = require('../hardware/buzzer');

const COMMANDS_FPS = 100; // values above 150 are unstable

const state = {
  l: 0,
  r: 0,
  c: 0,
};

let toggle = false;
setInterval(() => {
  const cam = toggle ? 45 : 135;
  const motors = toggle ? 'l' : 'r';

  toggle = !toggle;
  state.c = cam;
  state.l = 0;
  state.r = 0;
  state[motors] = 200;
}, 500);

const controlLoop = () => {
  send(state);
  setTimeout(controlLoop, 1000 / COMMANDS_FPS);
};

controlLoop();
