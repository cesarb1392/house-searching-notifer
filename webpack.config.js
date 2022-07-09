const path = require('path');
const nodeExternals = require('webpack-node-externals');

const { NODE_ENV = 'development' } = process.env;

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
          },
        },
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'out'),
          ],
        ],

      },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts'],
    alias: {
      src: path.resolve(__dirname, "src/"),
    }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'out'),
  },
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../node_modules'),
    }),
  ]
};
