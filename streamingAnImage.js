/**
 * Created by lz16 on 2014/8/27 0027.
 */
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    res.writeHeader(200, {'Content-Type': 'image/png'});
    fs.createReadStream('./resources/image.png').pipe(res);
}).listen(3000);

console.log('Server running at http://localhost:3000/');
