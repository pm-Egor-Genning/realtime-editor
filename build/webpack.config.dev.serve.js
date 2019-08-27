const merge = require('webpack-merge');
const configServe = require('./webpack.config.serve');
const configDevBuild = require('./webpack.config.dev.build');

const configDevServe = {
  mode: 'development',
};

module.exports = merge(
  configDevBuild,
  configServe,
  configDevServe,
);
