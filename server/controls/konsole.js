const { play, stop: stopPlaying } = require('../../hardware/buzzer');
const { setText, resetText } = require('../../hardware/oled');
const { parse, music } = require('../../music');
const { shutdown, formatTextForOLED, MAX_TEXT_LENGTH } = require('./utils');

const DEFAULT_RESPONSE = 'command not recognized';
const DEFAULT_ARGUMENTS = 'command is missing arguments';
const DEFAULT_INVALID = 'argument is invalid';

const cleanup = () => {
  resetText();
  stopPlaying();
};

const POLITE_MANUAL = [
  'help|list|man please - this manual',
  `say <text up to ${MAX_TEXT_LENGTH} chars> - send text to the OLED`,
  'clear - clear OLED',
  'music <optional partial name of the song> - list available RTTTL songs',
  'play <name of the song> - play RTTTL song on the buzzer',
  'stop - stop music playback',
  'rtttl <sequence> - play a custom RTTTL sequence on the buzzer',
  'shutdown <delay in ms> - shut down after a delay, 0 for immediately',
];

const PLAYLIST = Object.keys(music);

const konsole = (type, payload) => {
  switch (type) {
    case 'help':
    case 'list':
    case 'man': {
      if (payload !== 'please') return 'say the magic word!';
      return POLITE_MANUAL.join(', ');
    }
    case 'say': {
      if (!payload.length) return DEFAULT_ARGUMENTS;
      const text = formatTextForOLED(payload);

      if (!text) return DEFAULT_INVALID;
      setText(text);

      return `sending '${text}' to OLED`;
    }
    case 'clear': {
      resetText();
      return 'cleared text';
    }
    case 'music': {
      if (!payload) return PLAYLIST.join(', ');
      return PLAYLIST.filter((key) => key.includes(payload)).join(', ') || 'No matching songs found';
    }
    case 'play': {
      if (!payload.length) return DEFAULT_ARGUMENTS;
      if (!music[payload]) return DEFAULT_INVALID;
      play(music[payload]);
      return `attempting to play ${payload}`;
    }
    case 'stop': {
      stopPlaying();
      return 'stopped playback';
    }
    case 'rtttl': {
      if (!payload.length) return DEFAULT_ARGUMENTS;
      const tune = parse(payload);
      if (!tune) return DEFAULT_INVALID;

      play(tune);
      return `attempting to play ${payload}`;
    }
    case 'shutdown': {
      if (!payload.length) return DEFAULT_ARGUMENTS;
      const time = parseInt(payload, 10) || 0;
      shutdown(time);
      if (!time) return 'shutting down now';
      return `scheduling shutdown in ${time}ms`;
    }
    default: {
      return DEFAULT_RESPONSE;
    }
  }
};

module.exports = {
  DEFAULT_RESPONSE,
  DEFAULT_ARGUMENTS,
  DEFAULT_INVALID,
  konsole,
  cleanup,
};
