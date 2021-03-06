const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:3000',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
    pathinfo: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      inject: true
    }),
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel', 'eslint'], include: path.join(__dirname, 'src'), },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.scss/,
        exclude: /app\.scss/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'sass?sourceMap',
        ]
      },
      {
        test: /app\.scss/,
        loaders: [
          'style?sourceMap',
          'css?',
          'sass?sourceMap',
        ]
      },
      { test: /\.css/, loaders: [ 'style?sourceMap', 'css', ] },
      { test: /\.woff(\?.+?)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?.*?)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?.*?)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?.*?)?$/, loader: "file" },
      { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url-loader?limit=10240' },
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  resolve: {
    root: [
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['', '.js'],
  },
  target: 'electron',
};
