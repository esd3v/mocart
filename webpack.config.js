const path = require('path');
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        loader: '@webdiscus/pug-loader',
        options: {
          method: 'render'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: { quietDeps: true },
            }
          }
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset',
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
                'removeTitle',
                'cleanupEnableBackground',
                'cleanupAttrs',
                'removeEmptyAttrs',
                'removeDimensions',
                'removeStyleElement',
                {
                  name: "removeAttrs",
                  params: {
                    attrs: "(fill|stroke)"
                  }
                }
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
    // Don't use pug-plugin since it has problems with favicon generator
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'components/index/index.pug',
      title: 'Mocart',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[hash].css',
      chunkFilename: 'vendor.[hash].css',
    }),
    new SpriteLoaderPlugin(),
    new FaviconsWebpackPlugin({
      logo: `${DIR_IMAGES}/favicon.png`,
      background: '#fff',
      appName: 'Mocart'
    }),
  ],
};
