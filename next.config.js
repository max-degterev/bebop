const UniConfigPlugin = require('uni-config/plugin');
const imagesConfig = require('next-images');

const getConfig = (config) => config;

module.exports = {
  ...imagesConfig({
    exclude: /\.svg$/,
    webpack(config) {
      config.plugins.push(new UniConfigPlugin({ getConfig }));

      config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ['@svgr/webpack', 'url-loader'],
      });

      return config;
    },
  }),
  poweredByHeader: false,
  devIndicators: {
    autoPrerender: false,
  },
};
