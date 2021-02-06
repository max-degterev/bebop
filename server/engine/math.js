const clamp = require('lodash/clamp');

// Calculating x, y controller input into motor output is a little tedious.
// The general topic is called Odometry of controlling 2D differential motors.
//
// Both of these functions originally had a flaw where the reverse controls were inverted.
// I have fixed them as well as was possible.
// You can find original implementations here:
//
// The simple smoothed controller method:
// https://www.impulseadventure.com/elec/robot-differential-steering.html
//
// The diamond coordinates method:
// https://electronics.stackexchange.com/a/293108
// https://github.com/declanshanaghy/JabberBot/raw/master/Docs/Using%20Diamond%20Coordinates%20to%20Power%20a%20Differential%20Drive.pdf

const convertDiamond = (x, y) => {
  // convert to polar
  const rad = Math.hypot(x, y);
  // rotate by -45 degrees
  const tan = Math.atan2(y, x) - (Math.PI * .25);

  // back to cartesian
  const cos = Math.cos(tan);
  const sin = Math.sin(tan);
  const mirror = y >= 0;
  const scale = Math.sqrt(2);

  const rawL = rad * (mirror ? cos : sin);
  const rawR = rad * (mirror ? sin : cos);

  const left = clamp((rawL * scale).toFixed(4), -1, 1);
  const right = clamp((rawR * scale).toFixed(4), -1, 1);

  return { left, right };
};

const PIVOT_THRESHOLD = .25;

const convertSimple = (x, y) => {
  // Raw values out of scale
  const rawL = ((x >= 0) ? 1 : (1 + x)) * y;
  const rawR = ((x >= 0) ? (1 - x) : 1) * y;

  // Pivot smoothing
  const scale = (Math.abs(y) > PIVOT_THRESHOLD) ? 0 : (1 - (Math.abs(y) / PIVOT_THRESHOLD));

  // Calculate values -1..1 for L/R motors
  const left = ((1 - scale) * rawL) + (scale * x);
  const right = ((1 - scale) * rawR) + (scale * -x);

  return { left, right };
};

module.exports = {
  convertDiamond,
  convertSimple,
};
