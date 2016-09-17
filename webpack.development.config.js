const configuration = require('./webpack.config');
const path = require('path');

configuration.debug = true;
configuration.devtool = 'eval';
configuration.output.path = path.join(__dirname, 'dev');

module.exports = configuration;
