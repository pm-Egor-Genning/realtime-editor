const merge = require('webpack-merge');
const configProdBuild = require('./webpack.config.prod.build');
const configServe = require('./webpack.config.serve');

const configProdServe = {
  mode: 'production',
  output: {
    filename: '[name].[hash].js',
  },
};

module.exports = merge(
  configProdBuild,
  configServe,
  configProdServe
);
