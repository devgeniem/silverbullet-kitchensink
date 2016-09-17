/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */

require('babel-core/register')();
var babelify = require('babelify');
var browserify = require('browserify-middleware');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var reactApp = React.createFactory(require('../src/app.js'));
var addResView = require('sails/lib/hooks/views/res.view');
var Iso = require('iso').default;

function reactView(req, res, next) {
  var viewData;
  var iso;
  var state = (req.session && req.session.state) ? req.session.state : {};
  var reactHtml = ReactDOMServer.renderToString(reactApp({ req: req, state: state }));
  //TODO some smarter way to find if there react route?
  iso = new Iso();
  iso.add(reactHtml, state);
  viewData = {
    title: 'Silverbullet',
    reactHtml: iso.render(),
  };
  if (!res.view) {
    if (!req.options) req.options = {}; // add options to req otherwise addResView fails
    addResView(req, res, () => {
      res.view('react', viewData);
    });
  } else {
    res.view('react', viewData);
  }
}

module.exports.http = {


  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/


  middleware: {

    reactView: reactView,

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP request. (the Sails *
    * router is invoked by the "router" middleware below.)                     *
    *                                                                          *
    ***************************************************************************/

    order: [
      'cookieParser',
      'session',
      'myRequestLogger',
      'router',
      'www',
      'favicon',
      'reactView',  //run reactView last
      '404',
      '500',
    ],
    //   'startRequestTimer',
    //   'cookieParser',
    //   'session',
    //   'myRequestLogger',
    //   'bodyParser',
    //   'handleBodyParserError',
    //   'compress',
    //   'methodOverride',
    //   'poweredBy',
    //   '$custom',
    //   'router',
    //   'www',
    //   'favicon',
    //   '404',
    //   '500'
    // ],

    /****************************************************************************
    *                                                                           *
    * Example custom middleware; logs each request to the console.              *
    *                                                                           *
    ****************************************************************************/

    myRequestLogger: function (req, res, next) {
      console.log('Requested :: ', req.method, req.url);
      return next();
    },


    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests. By    *
    * default as of v0.10, Sails uses                                          *
    * [skipper](http://github.com/balderdashy/skipper). See                    *
    * http://www.senchalabs.org/connect/multipart.html for other options.      *
    *                                                                          *
    * Note that Sails uses an internal instance of Skipper by default; to      *
    * override it and specify more options, make sure to "npm install skipper" *
    * in your project first.  You can also specify a different body parser or  *
    * a custom function with req, res and next parameters (just like any other *
    * middleware function).                                                    *
    *                                                                          *
    ***************************************************************************/

    // bodyParser: require('skipper')({strict: true})

  },


  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
