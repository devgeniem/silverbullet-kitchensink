/**
 * Module dependencies
 */
const sails = require('sails');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const ENV = process.env.NODE_ENV || 'production';
const isDevBuild = ENV === 'development' || ENV === 'dev' || ENV === 'testing';
const isProdBuild = ENV === 'production' || ENV === 'staging';

sails.log.info(`${ENV} : Building ${isDevBuild ? 'dev' : isProdBuild ? 'production' : 'unknown'}`);

const extractCSS = new ExtractTextPlugin(
  !isDevBuild ? 'styles/[name]-[hash].bundle.css' : 'styles/[name].bundle.css',
);

/**
 * A basic Webpack config to use with a Sails app.
 *
 * This config is used by the api/hooks/webpack hook which initializes a
 * Webpack compiler in "watch" mode.
 *
 * See https://webpack.js.org/configuration for a full guide to Webpack config.
 *
 */

module.exports.webpack = {

  devtool: 'source-map',

  /* *************************************************************************
  *                                                                          *
  * Create one item in the `entry` dictionary for each page in your app.     *
  *                                                                          *
  ***************************************************************************/
  entry: {
    sailsapp: './assets/js/sailsapp.js',
    reactapp: './react/app.js',
  },

  /* *************************************************************************
  *                                                                          *
  * Output bundled .js files with a `.bundle.js` extension into              *
  * the `.tmp/public/js` directory                                           *
  *                                                                          *
  ***************************************************************************/
  output: {
    filename: !isDevBuild ? 'js/[name]-[hash].bundle.js' : 'js/[name].bundle.js',
    path: path.resolve(__dirname, '..', '.tmp', 'public'),
  },

  /* *************************************************************************
  *                                                                          *
  * Set up a couple of rules for processing .css and .less files. These will *
  * be extracted into their own bundles when they're imported in a           *
  * JavaScript file.                                                         *
  *                                                                          *
  ***************************************************************************/
  module: {
    rules: [
      {
        test: /.js?$/,
        include: [
          path.resolve(__dirname, '..', 'react'),
        ],
        exclude: [
          path.resolve(__dirname, '..', 'api'),
          path.resolve(__dirname, '..', 'assets'),
          path.resolve(__dirname, '..', 'node_modules'),
        ],
        loader: 'babel-loader',
      },
      // Extract css files
      {
        test: /\.css$/,
        loader: extractCSS.extract({
          use: ['css-loader', 'resolve-url-loader'],
        }),
      },
      // Extract scss files
      {
        test: /\.scss$/,
        loader: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                autoprefixer: {
                  add: true,
                  cascade: false,
                },
              },
            },
            { loader: 'resolve-url-loader' },
            {
              loader: 'sass-loader',
              options: {
/*                includePaths: [
                  path.resolve(__dirname, 'src/scss'),
                ],*/
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          name: 'fonts/[hash].[ext]',
          publicPath: '../',
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          name: 'fonts/[hash].[ext]',
          publicPath: '../',
          limit: 10000,
          mimetype: 'application/octet-stream',
        },
      },
      {
        test: /\.svg($|\?)/,
        loader: 'url-loader',
        include: path.resolve(__dirname, '..', 'node_modules'),
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.ico$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.svg$/,
        loaders: ['babel-loader', 'react-svg-loader'],
        exclude: path.resolve(__dirname, '..', 'node_modules'),
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  /* *************************************************************************
  *                                                                          *
  * Set up some plugins to help with Sails development using Webpack.        *
  *                                                                          *
  ***************************************************************************/
  plugins: [

    // This plugin extracts CSS that was imported into .js files, and bundles
    // it into separate .css files.  The filename is based on the name of the
    // .js file that the CSS was imported into.
    extractCSS,

    // Avoid publishing files when compilation fails
    new webpack.NoEmitOnErrorsPlugin(),

    // Adds useful free vars to the bundle.
    // __webpack_hash__ as env var
    new webpack.ExtendedAPIPlugin(),

    // This plugin cleans out your .tmp/public folder before lifting.
    new CleanWebpackPlugin(['public'], {
      root: path.resolve(__dirname, '..', '.tmp'),
      verbose: true,
      dry: false,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV),
        BUILD_TYPE: JSON.stringify(isDevBuild ? 'DEV' : 'PROD'),
      },
    }),

    !isDevBuild ? new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }) : null,
    !isDevBuild ? new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }) : null,
    isDevBuild ? new WebpackNotifierPlugin() : null,

    // This plugin copies the `images` and `fonts` folders into
    // the .tmp/public folder.  You can add any other static asset
    // folders to this list and they'll be copied as well.
    new CopyWebpackPlugin([
      {
        from: './assets/images',
        to: path.resolve(__dirname, '..', '.tmp', 'public', 'images'),
      },
    ]),
  ].filter(plugin => plugin !== null),

  stats: {
    // Nice colored output
    colors: true,
  },

};
