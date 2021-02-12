const { Server, OPEN } = require('ws');
const { createServer } = require('http');
const { parse } = require('url');
const { stream } = require('uni-config');
const debug = require('debug')('bebop:server:proxy');
const { setViewers } = require('../hardware/oled');
const startStream = require('./stream');

const executor = (resolve, reject) => {
  const sockets = [];
  const state = {
    stopStream: null,
  };

  // HTTP Server to accept incomming MPEG-TS Stream from ffmpeg
  const server = createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname !== stream.url) {
      debug('Stream attempted at wrong URL');
      res.end();
    }

    res.setTimeout(0);
    console.log('FFMPEG source connected, streaming');

    req.on('data', (data) => {
      sockets.forEach((ws) => {
        if (ws.readyState === OPEN) ws.send(data);
      });
    });
  });

  const socket = new Server({
    server,
    perMessageDeflate: false,
  });

  socket.on('connection', async(ws, req) => {
    sockets.push(ws);
    const { remoteAddress } = req.socket;

    console.log(`Viewer "${remoteAddress}" connected, active: ${sockets.length}`);
    setViewers(sockets.length);
    if (!state.stopStream) state.stopStream = await startStream();

    ws.on('close', () => {
      const index = sockets.indexOf(ws);
      if (index > -1) sockets.splice(index, 1);

      const viewers = sockets.length;
      console.log(`Viewer "${remoteAddress}" disconnected, active: ${viewers}`);
      setViewers(viewers);

      if (!viewers && state.stopStream) {
        state.stopStream();
        state.stopStream = null;
      }
    });
  });

  // Keep the socket open for streaming
  server.headersTimeout = 0;
  server.listen(stream.port, (error) => {
    if (error) {
      debug('Error starting http server: %O', error);
      return reject(error);
    }

    console.log(`Incoming MPEG-TS proxy open on http://localhost:${stream.port}${stream.url}`);
    console.log(`Outgoing WebSocket stream open on ws://localhost:${stream.port}`);

    resolve({ server, socket });
  });
};

const startListening = () => new Promise(executor);

module.exports = startListening;
