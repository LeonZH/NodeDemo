/**
 * Created by lz16 on 2014/8/21 0021.
 * http://www.w3cschool.cc/nodejs/node-js-get-post.html
 */

console.log('---------------get---------------------------------');
var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);

console.log('---------------put---------------------------------');
var querystring = require('querystring');
http.createServer(function(req, res) {
/*
    res.writeHead(200, {'content-type': 'text/plain'});
    res.end(util.inspect(url.parse(req.url, true)));
*/
    var post = '';
    req.on('data', function(chunk) {
        post += chunk;
    });

    req.on('end', function() {
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3001);
