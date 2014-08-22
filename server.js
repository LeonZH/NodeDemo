/**
 * Created by lz16 on 2014/8/20 0020.
 * http://www.w3cschool.cc/nodejs/nodejs-http-server.html
 */
var http = require('http');

http.createServer(function (request, response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World!\n')
    }).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');
