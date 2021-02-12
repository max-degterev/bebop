const debug = require('debug')('bebop:server:controls:ttl');
const { heartbeatCommands, activityCommands } = require('./commander');
const { loop } = require('../../utils');

const CODE_IDLE = 1008;
const ERROR = 'Kicked for being idle too long.';

const UPDATE_RATE = 1000;

const TTL_HEARTBEAT = 1000 * 10; // 10 seconds
const TTL_AFK = 1000 * 60 * 10; // 10 minutes


const getTTLLoop = (ws) => {
  let lastHeartbeat = Date.now();
  let lastActivity = Date.now();
  let lastFrame = null;

  const startLoop = loop(() => {
    const isDead = Date.now() - lastHeartbeat > TTL_HEARTBEAT;
    const isAFK = Date.now() - lastActivity > TTL_AFK;
    if (!isDead && !isAFK) return;
    debug('Idle for too long, dead: %o, afk: %o, disconnecting', isDead, isAFK);
    ws.close(CODE_IDLE, ERROR);
  }, UPDATE_RATE);

  const extendTTL = ({ type }, frame) => {
    if (heartbeatCommands.includes(type)) {
      lastHeartbeat = Date.now();
      return;
    }

    // ctrl sends the same state in a loop
    if (!activityCommands.includes(type) || lastFrame === frame) return;
    lastActivity = Date.now();
    lastFrame = frame;
  };

  return { startLoop, extendTTL };
};

module.exports = getTTLLoop;
