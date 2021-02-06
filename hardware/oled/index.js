const debug = require('debug')('bebop:hardware:oled');
const { loop } = require('../../utils');

const oled = require('./bus');
const { clear, render } = require('./render');
const {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,

  font,
  getIPs,
} = require('./utils');

const UPDATE_RATE = 1000;
const TEXT_TTL = 1000 * 30;

const defaultState = {
  text: '',
  timestamp: 0,
  viewers: 0,
  ips: [],
};

const state = {
  current: { ...defaultState },
};

const getState = () => state.current;
const resetState = () => {
  state.current = { ...defaultState };
  debug('Resetting state');
};

const setText = (text) => {
  state.current.text = text;
  state.current.timestamp = Date.now();
  debug('Setting text to "%s"', text);
};

const resetText = () => {
  state.current.text = '';
  state.current.timestamp = 0;
  debug('Resetting text');
};

const setViewers = (viewers) => {
  state.current.viewers = viewers;
  debug('Setting viewers to %d', viewers);
};

const startLoop = loop(() => {
  if (state.current.text && (Date.now() - state.current.timestamp) > TEXT_TTL) resetText();
  state.current.ips = getIPs();
  render(state.current);
}, UPDATE_RATE);

const start = () => {
  debug('Starting OLED');
  oled.turnOnDisplay();
  startLoop();
};

const stop = () => {
  startLoop.cancel();
  oled.turnOffDisplay();
  debug('Stopped OLED');
};

module.exports = {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,

  font,

  getState,
  resetState,

  setText,
  resetText,
  setViewers,

  clear,
  start,
  stop,
};
