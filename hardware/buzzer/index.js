const debug = require('debug')('bebop:hardware:buzzer');
const { Gpio } = require('../../adapters');
const { sleep } = require('../../utils');

const GPIO_BUZZER = 12;
const MAX_VOLUME = 950000;

const BEEP_FREQUENCY = 800;
const BEEP_VOLUME = .9;
const BEEP_DURATION = 150;

const HONK_FREQUENCY = 360;
const HONK_VOLUME = 1;

const MUSIC_FREQUENCY_MULTIPLIER = 1;

const gpio = new Gpio(GPIO_BUZZER, { mode: Gpio.OUTPUT });

const defaultState = {
  interrupt: false,
  playing: false,
};

const state = {
  current: { ...defaultState },
};

const getState = () => state.current;
const resetState = () => {
  state.current = { ...defaultState };
  debug('Resetting play state');
};

const set = (tone = 0, volume = 0) => {
  const frequency = Math.floor(tone);
  const dutyCycle = Math.floor(volume * MAX_VOLUME);
  debug('Setting buzzer to frequency %d at %d', frequency, dutyCycle);
  gpio.hardwarePwmWrite(frequency, dutyCycle);
};

const clear = () => set();

const beep = async(duration = BEEP_DURATION) => {
  set(BEEP_FREQUENCY, BEEP_VOLUME);
  await sleep(duration);
  clear();
};

const honk = () => {
  set(HONK_FREQUENCY, HONK_VOLUME);
};

const play = async(music, volume = .5) => {
  if (state.current.playing) return debug('Already playing');
  state.current.playing = true;

  debug('Playing %s', music.name);
  clear();

  for (const tune of music.melody) {
    if (state.current.interrupt) return resetState();
    const { frequency, duration } = tune;

    set(frequency * MUSIC_FREQUENCY_MULTIPLIER, volume);
    await sleep(duration);

    // Clearing before playing next sound makes it feel more "authentic"
    clear();
  }

  state.current.playing = false;
};

const stop = () => {
  state.current.interrupt = true;
  debug('Stopped playback');
};

module.exports = {
  getState,
  resetState,
  set,
  clear,
  beep,
  honk,
  play,
  stop,
};
