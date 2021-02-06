const RATE_60_FPS = 1000 / 60;

const noop = () => {};

const loop = (callback, rate = RATE_60_FPS) => {
  let id;

  const recurring = async() => {
    await callback();
    id = setTimeout(recurring, rate);
  };

  const stopLoop = () => clearTimeout(id);

  const startLoop = () => {
    recurring();
    return stopLoop;
  };

  startLoop.cancel = stopLoop;

  return startLoop;
};

const sleep = (time = 0) => new Promise((resolve) => setTimeout(resolve, time));

const onClose = (fn) => {
  let handled = false;
  const callback = () => {
    if (handled) return;
    handled = true;
    fn();
  };

  const handleControl = (signal) => {
    console.log(`Received ${signal}`);
    callback();
    process.exit(0);
  };

  const handleError = (error) => {
    console.error('UncaughtException: ', error);
    callback();
    process.exit(1);
  };

  process.on('SIGINT', handleControl);
  process.on('SIGTERM', handleControl);
  process.on('uncaughtException', handleError);
  process.on('exit', callback);
};

module.exports = {
  noop,
  loop,
  sleep,
  onClose,
};
