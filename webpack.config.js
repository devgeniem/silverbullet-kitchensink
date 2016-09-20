
var configuration = require('./webpack.config.dev');

if (process.env.NODE_ENV === 'production') {
  configuration = require('./webpack.config.prod');
}

module.exports = configuration;
