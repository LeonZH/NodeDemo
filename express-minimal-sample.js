/**
 * Created by LeonZH on 2014/9/16 0016.
 */
var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hello');
});

app.listen(3000);
console.log('Server is started on port:3000');