const { SerialPort } = require('../../adapters');
const config = require('uni-config');
const debug = require('debug')('bebop:hardware:serial');
// const Readline = require('@serialport/parser-readline');

const port = new SerialPort(config.serial, {
  baudRate: 115200,
});

// const parser = port.pipe(new Readline({ delimiter: '\r\n' }));
// parser.on('data', debug);

port.on('error', (error) => {
  debug('Error opening serial port: %s', error.message);
});

const sendAsPromised = (json) => {
  const string = JSON.stringify(json);

  const executor = (resolve, reject) => {
    port.write(string, (error) => {
      if (!error) return resolve(json);
      reject(error);
      debug('Error on write: %s', error.message);
    });
  };

  return new Promise(executor);
};

const send = (json) => port.write(JSON.stringify(json));

module.exports = {
  sendAsPromised,
  send,
};
