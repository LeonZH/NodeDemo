/**
 * Created by lz16 on 2014/8/20 0020.
 * http://www.w3cschool.cc/nodejs/nodejs-http-server.html
 */
var http = require('http');
var https = require('https');


var fs = require('fs');

var options = {
    key: fs.readFileSync('./resources/key.pem'),
    cert: fs.readFileSync('./resources/key-cert.pem')
};

//HTTPS Server
https.createServer(options, function(req, res) {
    res.writeHead(200);
    res.end('Hello World! HTTPS!\n');
}).listen(3001);
console.log('Server running at https://127.0.0.1:3001/');

//HTTP Server
http.createServer(function (request, response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World!\n')
    }).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');
