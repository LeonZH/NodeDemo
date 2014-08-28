/**
 * Created by lz16 on 2014/8/28 0028.
 */
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
   getTitles(res);
}).listen(8000, "127.0.0.1");
console.log('server start on 8000 port');

function getTitles(res) {
    fs.readFile('./resources/titles.json', function(err, data) {
        if (err) return hadError(err, res);
        getTemplate(JSON.parse(data.toString()), res);
    })
}

function hadError(err, res) {
    console.error(err);
    res.end('Server Error,' + res.toString());
}

function formateHTML(titles, tmpl, res) {
    var html = tmpl.replace('%', titles.join('</li><li>'));
//    res.writeHead(200, {'Content-Type':'text/html'});
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(html);
}

function getTemplate(titles, res) {
    fs.readFile('./resources/template.html', function(err, data) {
      if (err) {
          hadError(err, res);
      } else {
          formateHTML(titles, data.toString(), res);
      }
    })
}