const debug = require('debug')('bebop:server:controls:ttl');
const { ttlCommands } = require('./commander');
const { loop } = require('../../utils');

const CODE_IDLE = 1008;
const ERROR = 'Kicked for being idle too long.';

const TTL_UPDATE_RATE = 1000;
const TTL_IDLE = 1000 * 60 * 10; // 10 minutes

const getTTLLoop = (ws) => {
  let time = Date.now();
  let lastFrame = null;

  const startLoop = loop(() => {
    if (Date.now() - time <= TTL_IDLE) return;
    debug('Idle for too long, disconnecting');
    ws.close(CODE_IDLE, ERROR);
  }, TTL_UPDATE_RATE);

  const extendTLL = ({ type }, frame) => {
    if (!ttlCommands.includes(type)) return;
    // ctrl sends the same state in a loop
    if (lastFrame === frame) return;

    time = Date.now();
    lastFrame = frame;
  };

  return { startLoop, extendTLL };
};

module.exports = getTTLLoop;
