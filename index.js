const { start: startOLED, stop: stopOLED } = require('./hardware/oled');
const { play: playMusic, clear: clearBuzzer, stop: stopPlaying } = require('./hardware/buzzer');
const { light: lightOn, clear: lightOff } = require('./hardware/led');
const { stop: stopEngine } = require('./server/engine');
const { sounds } = require('./music');
const startProxy = require('./server/proxy');
const startControls = require('./server/controls');
const serveStatic = require('./server/static');
const { onClose, sleep } = require('./utils');

const BOOT_DELAY = 1000;

const greeting = async() => {
  lightOn();
  await playMusic(sounds.start);
  lightOff();
};

const stopCar = () => {
  stopOLED();
  stopPlaying();
  stopEngine({ silent: true });
  clearBuzzer();
  lightOff();

  console.log('Car shutdown complete');
};

const startCar = async() => {
  startOLED();
  await startProxy();
  startControls();
  await serveStatic();

  // Waiting for the modules to boot up avoids music hanging up
  await sleep(BOOT_DELAY);
  await greeting();

  console.log('Car is operational');
};

onClose(stopCar);
startCar();
