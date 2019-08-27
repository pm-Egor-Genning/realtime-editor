const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const utils = require('./utils');

const configBase = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'assets': utils.resolve('assets'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      { test: /\.(js|vue)$/, use: 'eslint-loader', enforce: 'pre'},
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.js$/, use: 'babel-loader', include: utils.resolve('src') },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: { limit: 10000, name: utils.assetsPath('img/[name].[hash:7].[ext]') }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: { limit: 10000, name: utils.assetsPath('media/[name].[hash:7].[ext]') }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: { limit: 10000, name: utils.assetsPath('fonts/[name].[hash:7].[ext]') }
        }
      },
    ]
  },
  output: {
    publicPath: '/'
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new CopyWebpackPlugin([{
      context: utils.resolve('static/img'),
      from: '**/*',
      to: utils.resolve('dist/static/img'),
      toType: 'dir'
    }])
  ]
};

module.exports = configBase;
