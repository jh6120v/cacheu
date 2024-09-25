// eslint-disable-next-line @typescript-eslint/no-require-imports
const { resolve } = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: resolve('dist'),
    filename: 'cacheu.min.js',
    library: 'Cacheu',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': resolve('src'),
    },
  },
};
