// This is meant to be running on a local Mac
module.exports = {
  serial: '/dev/tty.usbmodem00001',
  audio: false,
  hardware: {
    ledPin: 27,
    buzzerPin: 12,
    oledBus: 1,
  },
  stream: {
    fps: '25',
    videoFormat: 'avfoundation',
    videoResolution: '640x480',
    videoSource: '0',
    audioFormat: 'avfoundation',
    audioSource: ':0',
    port: 8082,
    url: '/stream',
  },
  controls: {
    port: 8055,
  },
  static: {
    port: 80,
  },
};
