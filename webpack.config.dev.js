const path = require('path');

module.exports = {
  debug: true,
  //Webpack displays all the files it is bundling
  noInfo: true,
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
