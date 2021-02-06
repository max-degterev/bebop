const { environment } = require('uni-config');
const { exec } = require('child_process');
const escapeStringRegexp = require('escape-string-regexp');
const debug = require('debug')('bebop:server:controls:utils');

const {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,

  font,
} = require('../../hardware/oled');

const execShutdown = () => {
  debug('Executing scheduled shutdown');
  if (environment === 'development') return process.exit(0);

  exec('sudo shutdown now', (error) => {
    if (error) debug('Couldn\'t shut down: %s', error);
    process.exit(0);
  });
};

let shutdownTid;
const shutdown = (delay) => {
  debug('Shutdown will happen in %dms', delay);
  clearTimeout(shutdownTid);
  shutdownTid = setTimeout(execShutdown, delay);
};

// (screen width / (char width + 1)) * (screen height / char height + 1)
const MAX_TEXT_LENGTH = Math.floor(
  (SCREEN_WIDTH / (font.width + 1)) * (SCREEN_HEIGHT / (font.height + 1)),
);
const CHARS_SEQUENCE = escapeStringRegexp(font.lookup.join(''));
const formatTextForOLED = (string) => {
  const regex = new RegExp(`[^${CHARS_SEQUENCE}]+`, 'g');
  let text = string.replace(regex, '').trim();

  if (text.length > MAX_TEXT_LENGTH) text = `${text.slice(0, MAX_TEXT_LENGTH - 3)}...`;
  return text;
};

module.exports = {
  MAX_TEXT_LENGTH,
  shutdown,
  formatTextForOLED,
};
