const { setText, setViewers, start, stop } = require('../hardware/oled');
const { onClose, sleep } = require('../utils');

const run = async() => {
  start();

  await sleep(10000);
  setViewers(12);

  await sleep(10000);
  setText('Hello there, this is a sample text');

  await sleep(5000);
  setText('And this is a new text');

  await sleep(60000);
};

run();
onClose(stop);
