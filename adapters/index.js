const { environment } = require('uni-config');
const { noop } = require('../utils');

const MockGpio = function() {};
MockGpio.prototype = {
  getPwmRange: noop,
  pwmWrite: noop,
  hardwarePwmWrite: noop,
};

const mockI2C = {
  openSync: noop,
};
const MockConnection = function() {};
MockConnection.prototype = {
  turnOnDisplay: noop,
  turnOffDisplay: noop,
  clearDisplay: noop,
  drawRGBAImage: noop,
  setCursor: noop,
  writeString: noop,
};

const MockSerial = function() {};
MockSerial.prototype = {
  on: noop,
  write: noop,
  pipe: () => ({ on: noop }),
};

const adapter = {};
if (environment === 'development') {
  adapter.Gpio = MockGpio;
  adapter.i2cBus = mockI2C;
  adapter.I2C_Connection = MockConnection;
  adapter.SerialPort = MockSerial;
} else {
  adapter.Gpio = require('pigpio').Gpio;
  adapter.i2cBus = require('i2c-bus');
  adapter.I2C_Connection = require('oled-i2c-bus');
  adapter.SerialPort = require('serialport');
}

module.exports = adapter;
