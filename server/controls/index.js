const { Server } = require('ws');
const { controls } = require('uni-config');
const debug = require('debug')('bebop:server:controls');
const { commander, cleanup } = require('./commander');
const getUILoop = require('./uisync');
const getTTLLoop = require('./ttl');
const { start: startEngine, stop: stopEngine } = require('../engine');

const CODE_TRY_LATER = 1013;
const ERROR = 'Already being controlled, try again later.';

const listen = () => {
  const socket = new Server({
    port: controls.port,
    perMessageDeflate: false,
  });

  let isActive = false;
  socket.on('connection', (ws) => {
    if (isActive) return ws.close(CODE_TRY_LATER, ERROR);

    debug('Controlling client connected');
    isActive = true;

    const uiLoop = getUILoop(ws);
    const { startLoop: startTTLLoop, extendTLL } = getTTLLoop(ws);

    startEngine();
    uiLoop();
    startTTLLoop();

    ws.on('close', () => {
      isActive = false;

      uiLoop.cancel();
      startTTLLoop.cancel();
      cleanup();
      stopEngine();

      debug('Controlling client disconnected');
    });

    ws.on('message', (data) => {
      try {
        const json = JSON.parse(data);
        if (!json) return;

        // Our client only sends JSON, don't extend timer for bots
        extendTLL(json, data);

        const response = commander(json);
        if (!response) return;

        ws.send(JSON.stringify(response));
      } catch (_e) { /* do nothing */ }
    });
  });

  console.log(`Controls WebSocket listening on ws://localhost:${controls.port}`);
  return socket;
};

module.exports = listen;
