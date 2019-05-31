const path = require('path');
const webpack = require('webpack');
const WebappWebpackPlugin = require('webapp-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIR_SRC = path.resolve(__dirname, './src');
const DIR_BUILD = path.resolve(__dirname, './dist');
const DIR_ASSETS = path.resolve(DIR_SRC, 'assets');
const DIR_IMAGES = path.resolve(DIR_ASSETS, 'images');
const DIR_ICONS = path.resolve(DIR_ASSETS, 'icons');
const DIR_ICONS_COLORED = path.resolve(DIR_ICONS, 'colored');

module.exports = {
  context: DIR_SRC,
  entry: 'index.js',
  target: 'web',
  output: {
    path: DIR_BUILD,
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: [
      '.js',
      '.svg',
      '.scss',
    ],
    modules: [
      DIR_SRC,
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        sideEffects: false,
      },
      {
        test: /\.(pug)$/,
        use: [
          'pug-loader',
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/',
            },
          }
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: '65-85',
                speed: 2,
              },
              mozjpeg: {
                progressive: true,
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(svg)$/,
        exclude: [
          DIR_ICONS_COLORED,
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: '/assets/',
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeTitle: true},
                {cleanupEnableBackground: true},
                {cleanupAttrs: true},
                {removeEmptyAttrs: true},
                {removeDimensions: true},
                {removeStyleElement: true},
                {removeAttrs: {attrs: ['fill', 'stroke']}},
              ],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        include: [
          DIR_ICONS_COLORED,
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: '/assets/',
            },
          },
        ]
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin({
      format: '[:bar]',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.pug',
      title: 'Mocart',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[hash].css',
      chunkFilename: 'vendor.[hash].css',
    }),
    new SpriteLoaderPlugin(),
    new WebappWebpackPlugin({
      logo: `${DIR_IMAGES}/favicon.png`,
      background: '#fff',
      appName: 'Mocart'
    }),
  ],
};
