const config = require('uni-config');
const express = require('express');
const debug = require('debug')('bebop:server:static');

const port = parseInt(process.env.PORT, 10) || config.static.port || 3000;

const executor = (resolve, reject) => {
  const app = express();

  app.use(express.static(`${__dirname}/../out`));
  app.disable('x-powered-by');
  app.listen(port, (error) => {
    if (error) {
      debug('Error starting static server: %O', error);
      return reject(error);
    }

    console.log(`Serving static at http://localhost:${port}`);
    resolve();
  });
};

const startServer = () => new Promise(executor);

module.exports = startServer;
