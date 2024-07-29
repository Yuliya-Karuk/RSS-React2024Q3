import path from 'path';

const stylesPath = path.resolve('styles');

export default {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  sassOptions: {
    includePaths: [stylesPath],
    prependData: `@import "mixins.scss"; @import "placeholders.scss"; @import "constants.scss";`,
  },
};