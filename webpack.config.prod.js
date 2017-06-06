const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: path.join(__dirname, 'src', 'app.js'),
  },
  target: 'web',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.[hash].js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      mangle: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
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
