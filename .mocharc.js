require('@babel/register');

const noop = () => '';

const styleExtensions = ['.css', '.scss'];
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
const fontExtensions = ['.woff', '.woff2', '.ttf'];

[
  ...styleExtensions,
  ...imageExtensions,
  ...fontExtensions,
].forEach((ext) => { require.extensions[ext] = noop; });

module.exports = {
  globals: 'document',
  'check-leaks': true,
  recursive: true,
  ui: 'bdd',
  reporter: 'nyan',
  timeout: 2000,
};
