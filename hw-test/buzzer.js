const { clear, play } = require('../hardware/buzzer');
const { music } = require('../music');
const { onClose } = require('../utils');

play(music.cucaracha);
onClose(clear);
