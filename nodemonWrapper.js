var execSync = require('child_process').execSync;
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var compiler = webpack(config);
compiler.run(function (err, stats) {
  execSync('node ./app.js');
});
