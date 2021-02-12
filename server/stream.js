const { spawn } = require('child_process');
const kill = require('tree-kill');
const { stream, environment, audio } = require('uni-config');
const debug = require('debug')('bebop:server:stream');

const { sleep } = require('../utils');

const FFMPEG_START_DELAY = 1000;

// Video stream on a Pi
// ffmpeg -f v4l2 -framerate 25 -video_size 640x480 -i /dev/video0 -f mpegts -codec:v mpeg1video -s 640x480 -b:v 1000k -bf 0 -muxdelay 0.001 http://localhost:8081/stream

// Audio stream on a Pi
// ffmpeg -f alsa -ac 2 -ar 44100 -guess_layout_max 0 -i hw:1 -f mpegts -codec:a mp2 -b:a 128k -muxdelay 0.001 http://localhost:8081/stream

// Video stream on a Mac
// ffmpeg -f avfoundation -pix_fmt yuv420p -framerate 30 -video_size 640x480 -i 0 -f mpegts -codec:v mpeg1video -s 640x480 -b:v 1000k -bf 0 http://localhost:8081/stream

const proxyUrl = `http://127.0.0.1:${stream.port}${stream.url}`;

const developmentFix = environment !== 'development' ? [] : [
  '-pix_fmt',
  'yuv420p',
];

const productionFix = environment === 'development' ? [] : [
  '-ar',
  '44100',
];

const videoOptions = [
  '-f',
  stream.videoFormat,
  ...developmentFix,
  '-framerate',
  stream.fps,
  '-video_size',
  stream.videoResolution,
  '-i',
  stream.videoSource,
  '-f',
  'mpegts',
  '-codec:v',
  'mpeg1video',
  '-s',
  '640x480',
  '-b:v',
  '1000k',
  '-bf',
  '0',
  '-muxdelay',
  '0.001',
  proxyUrl,
].filter(Boolean);

const audioOptions = [
  '-f',
  stream.audioFormat,
  '-ac',
  '2',
  ...productionFix,
  '-guess_layout_max',
  '0',
  '-i',
  stream.audioSource,
  '-f',
  'mpegts',
  '-codec:a',
  'mp2',
  '-b:a',
  '128k',
  '-muxdelay',
  '0.001',
  proxyUrl,
].filter(Boolean);

const startFFMPEG = (options) => {
  debug('Spawning: "ffmpeg %s"', options.join(' '));
  const child = spawn('ffmpeg', options, { shell: true, stdio: 'ignore' });

  child.on('error', (error) => {
    debug('Failed to start ffmpeg: %O', error);
  });

  child.on('close', (code) => {
    // FFMPEG exits with 255 on SIGTERM
    if (!code || code === 255) return;
    debug('ffmpeg process "ffmpeg %s" exited with code: %d', options.join(' '), code);
  });

  return () => {
    debug('Killing: "ffmpeg %s"', options.join(' '));
    kill(child.pid, (error) => {
      if (error) debug('Failed to kill stream: %s', error);
    });
  };
};

const startStream = async() => {
  const killVideo = startFFMPEG(videoOptions);

  let killAudio;
  if (audio) {
    debug('Waiting %dms for the video stream to start', FFMPEG_START_DELAY);
    await sleep(FFMPEG_START_DELAY);
    killAudio = startFFMPEG(audioOptions);
  }

  console.log('Spawned FFMPEG streams');

  return () => {
    killVideo();
    if (killAudio) killAudio();
    console.log('Killed FFMPEG streams');
  };
};

module.exports = startStream;
