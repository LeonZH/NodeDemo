/**
 * Created by lz16 on 2014/8/28 0028.
 */

var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function(req, res){
    switch (req.method) {
        case 'POST':
            var item = '';
            req.setEncoding('utf8');
            req.on('data', function(chunk) {
               item += chunk;
            });
            req.on('end', function() {
               items.push(item);
               res.end('DONE\n');
            });
            break;

        case 'GET':
//            items.forEach(function(item, i) {
//                res.write(i + ')' + item + '\n');
//            });

            // setting the content-length header for performance.
            var body = items.map(function(item, i) {
                return i + '.' + item;
            }).join('\n');

            res.setHeader('Content-Length', Buffer.byteLength(body));
            res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
            res.end();
            break;

        case 'DELETE':
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(1), 10);

            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if (!items[i]) {
                res.statusCode = 404;
                res.end('Item not exists');
            } else {
                items.splice(i, 1);
                res.end('Item has been removed\n');
            }
            break;
    }
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');
