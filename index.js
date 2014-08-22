/**
 * Created by lz16 on 2014/8/20 0020.
 */

var server = require('./routerServer.js');
var router = require('./router.js')

server.start(router.route);
