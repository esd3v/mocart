const { merge } = require('webpack-merge');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: '4000',
      openAnalyzer: false,
    }),
  ],
  devServer: {
    hot: false,
    port: 3000,
    host: '0.0.0.0',
    static: {
      publicPath: '/',
    }
  },
  devtool: 'source-map',
});
