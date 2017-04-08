const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    app: path.join(__dirname, 'src', 'app.js'),
  },
  target: 'web',
  output: {
    path: path.join(__dirname, 'dev'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /.js?$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
