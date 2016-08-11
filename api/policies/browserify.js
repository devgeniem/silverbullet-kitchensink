module.exports = function(req, res, next) {
  //lest's browserify some path
  console('testi->',req);
  next();
}
