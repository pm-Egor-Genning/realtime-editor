const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const utils = require('./utils');
const configBase = require('./webpack.config.base');

const configProdBuild = {
  mode: 'production',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.min.js'
    }
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: 'warning'
  },
  output: {
    path: utils.resolve(`./dist/prod`),
  },
  plugins: [
    new UglifyJsWebpackPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }),
    new MiniCssExtractPlugin({ filename: 'main.css' }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ]
};

module.exports = merge(
  configBase,
  configProdBuild,
);
