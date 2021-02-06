const rtttl = require('rtttl-parse');
const debug = require('debug')('bebop:music');

const { noop } = require('../utils');

// Music copied from this DB:
// https://github.com/EmilySamantha80/RTS/blob/master/SQL%20Scripts/Create%20RTS%20Database.sql
const musicList = require('./rtttl/music');
const soundsList = require('./rtttl/sounds');

const parse = (string) => {
  // rtttl-parse prints a lot of warnings that we can safely ignore
  const _warn = console.warn;
  console.warn = noop;

  let parsed = null;
  try {
    parsed = rtttl.parse(string);
  } catch (error) {
    debug('Parsing error %O', error);
  }

  console.warn = _warn;
  return parsed;
};

const parseObjectProps = (object) => (
  Object.keys(object).reduce((acc, key) => {
    const tune = parse(object[key]);

    if (!tune) {
      debug('Couldn\'t parse %s', key);
      return acc;
    }

    acc[key] = tune;
    return acc;
  }, {})
);

const music = parseObjectProps(musicList);
const sounds = parseObjectProps(soundsList);

module.exports = {
  parse,
  music,
  sounds,
};
