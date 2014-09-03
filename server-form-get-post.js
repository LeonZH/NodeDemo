/**
 * Created by LeonZH on 2014/9/2 0002.
 */
var http = require('http');
var formidable = require('formidable');
var items = [];

function show(res) {
    var html = '<html><head><title>TodoList</title></head><body>'
        + '<h1>TodoList</h1>'
        + '<ul>'
        + items.map(function(item){
            return'<li>'+ item+ '</li>'
        }).join('')
        + '</ul>'
//        + '<form method="post" action="/" enctype="multipart/form-data">'
        + '<form method="post" action="/">'
        + '<p><input type="text" name="item" /></p>'
        + '<p><input type="file" name="file" /></p>'
        + '<p><input type="submit" value="Add Item" /></p>'
        + '</form></body></html>';
    res.setHeader('Content-Type','text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad request');
}

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}

function upload(res,req) {
    if (!isFormData(req)) {
        res.statusCode = 400;
        res.end('Bad Request: expecting multipart/form-data');
        return;
    }

    var form = new formidable.IncomingForm();
    form.on('field',function(field,value){
        console.log(field);
        console.log(value);
    });
    form.on('file',function(name,file){
        console.log('name: ' + name);
        console.log('file: ' + file);
    });
    form.on('end',function(){
        res.end('upload complete!');
    });
    form.on('progress',function(bytesReceived, bytesExpected){
        varpercent= Math.floor(bytesReceived/bytesExpected*100);
        console.log('Progress: ' + percent);
    });

    form.parse(req, function(err, fields, files) {
        console.log('fields: ' + fields);
        console.log('files: ' + files);
        res.end('RES END: Upload completed.')
    });
}

var qs = require('querystring');


function add(req, res) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {body += chunk});
    req.on('end', function() {
        var obj = qs.parse(body);
        items.push(obj.item);
        show(res);
    });
}

function badRequest(res) {
    console.log('bad request');
    show(res);
}

var server = http.createServer(function(req, res){
    console.log(req.url);

    if ('/' == req.url) {
        console.log(req.method);
        switch (req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
            default:
                badRequest(res);
        }
    } else {
        notFound(res);
    }
});

server.listen(3000);
console.log('Server is started.');