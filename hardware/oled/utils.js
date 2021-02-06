const fs = require('fs');
const { networkInterfaces } = require('os');
const { PNG } = require('pngjs');
const font = require('oled-font-5x7');

const debug = require('debug')('bebop:hardware:oled:utils');

const SCREEN_WIDTH = 128;
const SCREEN_HEIGHT = 64;

const getImage = () => {
  debug('Loading image %s', `${__dirname}/image.png`);
  const image = fs.readFileSync(`${__dirname}/image.png`);
  return PNG.sync.read(image);
};

const getIPs = () => {
  const interfaces = networkInterfaces();
  return Object.keys(interfaces)
    .reduce((acc, key) => {
      interfaces[key].forEach((net) => {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family !== 'IPv4' || net.internal) return;
        acc.push(net.address);
      });
      return acc;
    }, []);
};

const cloneObject = (object) => JSON.parse(JSON.stringify(object));
const isSameObject = (objectA, objectB) => (
  JSON.stringify(objectA) === JSON.stringify(objectB)
);

const getSplashContent = (state) => {
  if (!state.ips.length) return ['Waiting for network'];
  return [
    ...state.ips,
    `Online: ${state.viewers}`,
  ];
};

module.exports = {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  font,
  getImage,
  getIPs,
  cloneObject,
  isSameObject,
  getSplashContent,
};
