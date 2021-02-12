const debug = require('debug')('bebop:server:commander');
const { update, reset } = require('../engine');
const { DEFAULT_RESPONSE, konsole, cleanup: konsoleCleanup } = require('./konsole');

const REGEX_COMMAND = /^([\w]+)(?:(.*))?$/;

const cleanup = () => {
  konsoleCleanup();
  reset();
};

const handleConsole = (string) => {
  const match = string.match(REGEX_COMMAND);
  if (!match) return DEFAULT_RESPONSE;

  const [kommand, args = ''] = match.slice(1);
  if (!kommand) return DEFAULT_RESPONSE;

  return konsole(kommand.trim(), args.trim());
};

// Sending these commands signals that the user is connected
const heartbeatCommands = [
  'ping',
];

// Sending these commands signals that the user is not AFK
const activityCommands = [
  'ctrl',
  '>console',
];

const commander = ({ type, payload }) => {
  if (!type || !payload) return;

  switch (type) {
    case 'ping': {
      return { type: 'pong', payload };
    }
    case 'ctrl': {
      update(payload || {});
      break;
    }
    case '>console': {
      const response = handleConsole(payload);
      debug('Console command "%s" responded with "%s"', payload, response);
      return { type: 'console<', payload: { response, command: payload } };
    }
    default: {
      break;
    }
  }
};

module.exports = { commander, cleanup, heartbeatCommands, activityCommands };
