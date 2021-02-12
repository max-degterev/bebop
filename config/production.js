// This is meant to be running on a Pi
module.exports = {
  serial: '/dev/ttyACM0',
  stream: {
    videoFormat: 'v4l2',
    videoSource: '/dev/video0',
    audioFormat: 'alsa',
    audioSource: 'hw:1',
  },
  static: {
    port: 80,
  },
};
