const webpackCommon = require('./webpack.common');

module.exports = {
  ...webpackCommon,
  devtool: 'inline-source-map',
  mode: 'production',
}