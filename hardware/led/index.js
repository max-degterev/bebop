// VF=2.0V IF=20mA
const config = require('uni-config');
const debug = require('debug')('bebop:hardware:status-led');
const { sleep } = require('../../utils');
const { Gpio } = require('../../adapters');

const gpio = new Gpio(config.hardware.ledPin, { mode: Gpio.OUTPUT });
const maxBrightness = gpio.getPwmRange();

const set = (brightness = 0) => {
  const dutyCycle = Math.floor(brightness * maxBrightness);
  debug('Setting LED to %d%', brightness * 100);
  gpio.pwmWrite(dutyCycle);
};

const clear = () => set(0);

const blink = async(brightness = 1, duration) => {
  set(brightness);
  await sleep(duration);
  clear();
};

const light = () => set(1);

module.exports = {
  blink,
  clear,
  light,
};
