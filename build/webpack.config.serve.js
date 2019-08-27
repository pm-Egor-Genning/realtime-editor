const { HotModuleReplacementPlugin } = require('webpack');

const HOST = 'localhost';
const PORT = 8080;

const configServe = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    hot: true,
    host: HOST,
    port: PORT,
    clientLogLevel: 'warning',
    compress: true,
    open: true,
    overlay: { warnings: false, errors: true },
    watchOptions: {
      poll: true,
      ignored: ['node_modules']
    }
  },
  plugins: [
    new HotModuleReplacementPlugin()
  ]
};

module.exports = configServe;
