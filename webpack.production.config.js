const webpack = require('webpack');
const configuration = require('./webpack.config');

configuration.debug = false;
configuration.noInfo = true;

//Removes duplicate modules
configuration.plugins.push(new webpack.optimize.DedupePlugin());

//
configuration.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
  output: {
    comments: false,
  },
  mangle: true,
}));

//Now React will be built in an optimized manner
configuration.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
}));

module.exports = configuration;
