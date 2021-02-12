const config = require('uni-config');
const debug = require('debug')('bebop:hardware:oled:bus');
const { i2cBus, I2C_Connection } = require('../../adapters');

const bus = i2cBus.openSync(config.hardware.oledBus);

const SIZE_X = 128;
const SIZE_Y = 64;

const options = {
  width: SIZE_X,
  height: SIZE_Y,
  address: 0x3C,
};

const oled = new I2C_Connection(bus, options);
debug('Created I2C connection');
module.exports = oled;
