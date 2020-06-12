const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: NODE_ENV !== 'production' ? 'source-map' : false,
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, 'entry.jsx'),
  ],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/official-site/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'static/index.html'),
    }),
  ],
  mode: NODE_ENV === 'production' ? 'production' : 'development',
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
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
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
            disable: NODE_ENV !== 'production',
          },
        },
      ],
      include: /static/,
    }],
  },
};
