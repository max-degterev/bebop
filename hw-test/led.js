const { blink, clear } = require('../hardware/led');
const { onClose } = require('../utils');

blink(1, 1000 * 10);
onClose(clear);
