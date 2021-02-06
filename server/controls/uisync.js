const { getState: getEngineState } = require('../engine');
const { getState: getBuzzerState } = require('../../hardware/buzzer');
const { getState: getOLEDState } = require('../../hardware/oled');
const { loop } = require('../../utils');
const {
  STATE_LEFT_WHEELS,
  STATE_RIGHT_WHEELS,
  STATE_CAMERA,
  STATE_LIGHTS,
  STATE_HONK,
} = require('../../utils/constants');

const STATE_SYNC_RATE = 1000 / 30;

const getPayload = () => {
  const { playing } = getBuzzerState();
  const { viewers, text } = getOLEDState();
  const {
    [STATE_LEFT_WHEELS]: left,
    [STATE_RIGHT_WHEELS]: right,
    [STATE_CAMERA]: camera,
    [STATE_LIGHTS]: lights,
    [STATE_HONK]: horn,
  } = getEngineState();

  const icons = {
    playing: Boolean(playing),
    lights: Boolean(lights),
    horn: Boolean(horn),
  };

  return { left, right, camera, icons, viewers, text };
};

const getUpdateLoop = (ws) => loop(() => {
  const response = { type: 'uisync', payload: getPayload() };
  ws.send(JSON.stringify(response));
}, STATE_SYNC_RATE);

module.exports = getUpdateLoop;
