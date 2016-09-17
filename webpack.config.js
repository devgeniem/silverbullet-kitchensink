const webpack = require('webpack');
const path = require('path');

const PATHS = {
  //Output directory of the built files.
  build: path.join(__dirname, '.tmp', 'public'),
  //Name of the main chunk file.
  fileName: '[name].js',
  //Location of the webpack entry point file.
  app: path.join(__dirname, 'src', 'app.js'),
  root: __dirname,
};

module.exports = {
  debug: false,
  //Webpack displays all the files it is bundling
  noInfo: true,
  devtool: 'cheap-module-source-map',
  entry: {
    app: PATHS.app,
  },
  target: 'web',
  output: {
    path: PATHS.build,
    filename: PATHS.fileName,
  },
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.[hash].js'),
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
    ],
  },
};
