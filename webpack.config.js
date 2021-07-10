const { resolve } = require('path');

module.exports = {
  mode: 'production',
  entry: [
    './src/index.js'
  ],
  output: {
    path: resolve('dist'),
    filename: 'cache.min.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
};
