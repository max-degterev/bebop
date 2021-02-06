const debug = require('debug')('bebop:hardware:oled:render');
const { version } = require('../../package');
const oled = require('./bus');
const {
  SCREEN_HEIGHT,
  font,
  getImage,
  cloneObject,
  isSameObject,
  getSplashContent,
} = require('./utils');


const LINE_HEIGHT = 10;

const mascotImage = getImage();
const state = {
  current: {},
};

const setState = (newState) => {
  state.current = cloneObject(newState);
  debug('Caching rendered state %O', state.current);
};

const clear = () => {
  debug('Clearing display');
  oled.clearDisplay();
};

const renderSplash = () => {
  const lines = getSplashContent(state.current);
  debug('Rendering splash: %O %O', state.current, lines);

  oled.drawRGBAImage(mascotImage, 0, 0);

  oled.setCursor(1, SCREEN_HEIGHT - font.height);
  oled.writeString(font, 1, `bebop v${version}`, 1, true);

  lines.forEach((text, index) => {
    oled.setCursor(1, (LINE_HEIGHT * index) + 1);
    oled.writeString(font, 1, text, 1, true);
  });
};

const renderText = (text) => {
  debug('Rendering text "%s"', text);
  oled.setCursor(1, 1);
  oled.writeString(font, 1, text, 1, true);
};

const render = (newState) => {
  if (isSameObject(newState, state.current)) return;
  setState(newState);

  clear();
  if (state.current.text) return renderText(state.current.text);
  renderSplash();
};

module.exports = {
  clear,
  render,
};
