const path = require('path');
const webpack = require('webpack');

module.exports = {
  debug: false,
  //Webpack displays all the files it is bundling
  noInfo: true,
  devtool: 'cheap-module-source-map',
  entry: {
    app: path.join(__dirname, 'src', 'app.js'),
  },
  target: 'web',
  output: {
    path: path.join(__dirname, 'dev'),
    filename: '[name].js',
  },
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.[hash].js'),
    new webpack.optimize.DedupePlugin(),
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
    loaders: [
      {
        test: /.js?$/,
        //exclude: /(node_modules|bower_components)/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          //plugins: ['transform-runtime']
        },
      },
      {
        test: /\.json$/,
        loader: "json"
      },      
    ],
  },
};
