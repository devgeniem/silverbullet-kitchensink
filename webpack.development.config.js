const configuration = require('./webpack.config');
const path = require('path');

configuration.debug = true;
configuration.devtool = 'eval';

module.exports = configuration;
