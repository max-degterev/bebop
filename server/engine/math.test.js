const { assert } = require('chai');
const {
  convertDiamond,
  convertSimple,
} = require('./math');


describe('math', () => {
  it('convertDiamond', () => {
    const values = [
      { x: 1, y: 1, left: 1, right: 0 },
      { x: 1, y: 0, left: 1, right: -1 },
      { x: 1, y: -1, left: -1, right: 0 },
      { x: 0, y: -1, left: -1, right: -1 },
      { x: -1, y: -1, left: -0, right: -1 },
      { x: -1, y: 0, left: -1, right: 1 },
      { x: -1, y: 1, left: 0, right: 1 },

      { x: .5, y: .5, left: 1, right: 0 },
      { x: .25, y: .5, left: .75, right: .25 },
    ];

    values.forEach(({ x, y, ...result }) => {
      assert.deepEqual(convertDiamond(x, y), result, `case x${x}, y${y}`);
    });
  });

  it('convertSimple', () => {
    const values = [
      { x: 1, y: 1, left: 1, right: 0 },
      { x: 1, y: 0, left: 1, right: -1 },
      { x: 1, y: -1, left: -1, right: -0 },
      { x: 0, y: -1, left: -1, right: -1 },
      { x: -1, y: -1, left: -0, right: -1 },
      { x: -1, y: 0, left: -1, right: 1 },
      { x: -1, y: 1, left: 0, right: 1 },

      { x: .5, y: .5, left: .5, right: .25 },
      { x: .25, y: .5, left: .5, right: .375 },
    ];

    values.forEach(({ x, y, ...result }) => {
      assert.deepEqual(convertSimple(x, y), result, `case x${x}, y${y}`);
    });
  });
});
