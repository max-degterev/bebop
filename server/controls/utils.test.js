const { assert } = require('chai');
const {
  MAX_TEXT_LENGTH,
  formatTextForOLED,
} = require('./utils');

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

describe('utils', () => {
  it('formatTextForOLED', () => {
    assert.equal(formatTextForOLED(LOREM).length, MAX_TEXT_LENGTH, 'shortened');
    assert.equal(formatTextForOLED('a😁b😱c'), 'abc', 'removed garbage characters');
    assert.equal(formatTextForOLED('😁😱'), '', 'trimmed');
  });
});
