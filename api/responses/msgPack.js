/**
 * send json as messagepack
 * http://msgpack.org
 *
 */

var msgpack = require("msgpack-lite");
var encodeStream = msgpack.createEncodeStream();

 module.exports = function msgPack(data, options) {

    var res = this.res;

    res.status(200);
    res.set('Content-Type','application/x-msgpack');
    return res.send(msgpack.encode(data));

 }
