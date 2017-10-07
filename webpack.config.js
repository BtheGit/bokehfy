const webpack = require('webpack');
const path = require('path');
const libraryName = 'bokehfy';
const plugins = [];

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: libraryName + '.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins
}

module.exports = config;