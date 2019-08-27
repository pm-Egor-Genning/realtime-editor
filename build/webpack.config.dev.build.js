const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const configBase = require('./webpack.config.base');
const utils = require('./utils');

const configDevBuild = {
  mode: 'development',
  devtool: '#eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  output: {
    path: utils.resolve(`./dist/dev`),
  },
  plugins: [
    new FriendlyErrorsPlugin()
  ]
};

module.exports = merge(
  configBase,
  configDevBuild,
);
