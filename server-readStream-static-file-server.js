/**
 * Created by LeonZH on 2014/8/30 0030.
 */
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;
console.log('root: ' + root);

var server = http.createServer(function(req, res){
    var url = parse(req.url);
    var path = join(root, url.pathname);
    var stream = fs.createReadStream(path);

    console.log('url: ' + url);
    console.log('url path name: ' + url.pathname);
    console.log('path: ' + path);

    stream.on('data', function(chunk){
        res.write(chunk);
    });
    stream.on('end', function(){
        res.end();
    });
});

server.listen(3000);
console.log('Server is start');

//Optimizing data transfer with stream#pipe()
var server1 = http.createServer(function(req, res) {
    var url = parse(req.url);
    var path = join(root, url.pathname);

//  Checking for a file's existence and responding with content-length
    fs.stat(path, function(err, stat) {
        if (err) {
            if ('ENOENT' == err.code) {
                console.log('ERROR IS 404.');
                res.statusCode = 404;
                res.end('Not Found.');
            } else {
                console.log('ERROR NOT 404.');
                res.statusCode = 500;
                res.end('Internal Server Error.');
            }
            console.log('ERROR NOT RECORD.')
        } else {
            console.log('NO ERROR. PATH=' + path);
            res.setHeader('Content-Length', stat.size);
        }
    });

    var stream = fs.createReadStream(path);
    stream.pipe(res);

    stream.on('error', function(err) {
        console.log('ERROR in Stream.');
        res.statusCode = 500;
        res.end('ERROR: Internal Server Error: ' + err.message);
    });
});

server1.listen(3001);
console.log('Server1 is start');