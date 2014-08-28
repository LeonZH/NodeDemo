/**
 * Created by lz16 on 2014/8/28 0028.
 */
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    if (req.url == '/') {
        fs.readFile('./resources/titles.json', function(err, data) {
            if (err) {
                console.error(err);
                res.end('Server Error - read titles');
            } else {
                var titles = JSON.parse(data.toString());

                fs.readFile('./resources/template.html', function(err, data) {
                    if (err) {
                        console.error(err);
                        res.end('Server Error - read templates');
                    } else {
                        var tmpl = data.toString();
                        var html = tmpl.replace('%', titles.join('</li><li>'));
                        res.writeHead(200, {'Content-Type':'text/html'});
                        res.end(html);
                    }
                });
            }
        });
    }
}).listen(8000, "127.0.0.1");

console.log('server start on 8000 port');