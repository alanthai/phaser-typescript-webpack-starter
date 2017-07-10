const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
  entry: './src/main.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
  },

  plugins: [
    new HtmlWebpackPlugin({ title: 'Phaser Game' }),
  ],

  resolve: {
    extensions: ['.ts', '.js'],
    alias: { phaser, pixi, p2 },
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },

  devtool: 'inline-source-map', // for dev only

  module: {
    rules: [
      {
        test: /p2\.js$/,
        loader: 'expose-loader?p2',
      },
      {
        test: /pixi\.js$/,
        loader: 'expose-loader?PIXI',
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'tslint-loader',
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
}
