import path from 'path';

export default {
  reactStrictMode: true,
  // webpack(config, options) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ['@svgr/webpack'],
  //   });

  //   config.resolve.alias['@components'] = path.join(__dirname, 'src/components');
  //   config.resolve.alias['@styles'] = path.join(__dirname, 'src/styles');

  //   return config;
  // },

  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'src/styles')],
  //   prependData: `@import "mixins.scss"; @import "placeholders.scss"; @import "constants.scss";`,
  // },
};