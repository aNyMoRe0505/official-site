const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

module.exports = {
  devtool: !IS_PRODUCTION ? 'source-map' : false,
  entry: [
    path.resolve(__dirname, 'entry.jsx'),
  ],
  output: {
    filename: IS_PRODUCTION ? '[name].[contenthash].js' : '[name].[hash].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/official-site/',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      maxInitialRequests: Infinity,
      minSize: 0,
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'static/index.html'),
    }),
    (!IS_PRODUCTION && new ReactRefreshWebpackPlugin()),
    (IS_PRODUCTION && new webpack.HashedModuleIdsPlugin()),
  ].filter(Boolean),
  mode: NODE_ENV,
  devServer: {
    hot: true,
    publicPath: '/official-site/',
    compress: true,
    port: 6767,
    historyApiFallback: {
      index: '/official-site/index.html',
    },
    host: '0.0.0.0',
    open: true,
    openPage: 'official-site',
  },
  resolve: {
    extensions: [
      '.jsx',
      '.js',
    ],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        'babel-loader',
      ],
      include: [
        __dirname,
      ],
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            disable: !IS_PRODUCTION,
          },
        },
      ],
      include: /static/,
    }],
  },
};
