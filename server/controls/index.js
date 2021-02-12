const { Server } = require('ws');
const { controls } = require('uni-config');
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
  socket.on('connection', (ws, req) => {
    if (isActive) return ws.close(CODE_TRY_LATER, ERROR);
    const { remoteAddress } = req.socket;

    console.log(`Controlling client "${remoteAddress}" connected`);
    isActive = true;

    const uiLoop = getUILoop(ws);
    const { startLoop: ttlLoop, extendTTL } = getTTLLoop(ws);

    startEngine();
    uiLoop();
    ttlLoop();

    ws.on('close', () => {
      isActive = false;

      uiLoop.cancel();
      ttlLoop.cancel();
      cleanup();
      stopEngine();

      console.log(`Controlling client "${remoteAddress}" disconnected`);
    });

    ws.on('message', (data) => {
      try {
        const json = JSON.parse(data);
        if (!json) return;

        // Our client only sends JSON, don't extend timer for bots
        extendTTL(json, data);

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
