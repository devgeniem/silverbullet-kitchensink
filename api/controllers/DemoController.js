/**
 * DemoController
 *
 * @description :: Server-side logic for managing demoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  test(req,res) {
    res.json({ok:'toimii'});
  },
  test2(req,res) {
    res.msgPack({"testing":"Toimiiko"});
  }
};

