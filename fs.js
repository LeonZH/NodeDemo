/**
 * Created by lz16 on 2014/8/21 0021.
 */

var fs = require('fs');
console.log('-----------------no encoding-----------------------------')
fs.readFile('hello.js', function(err, data) {
    if(err) {
        console.error(err);
    } else {
        console.log(data);
    }

});

// utf-8
console.log('-----------------utf-8 encoding-----------------------------')
fs.readFile('hello.js', 'utf-8', function(err, data) {
    if(err) {
        console.error(err);
    } else {
        console.log(data);
    }

});

// throw err
/*
console.log('-----------------throw err-----------------------------')
fs.readFile('hello1.js', 'utf-8', function(err, data) {
    if(err) {
        console.error(err);
    } else {
        console.log(data);
    }

});
*/

//fs.open and fs.read
console.log('-----------------fs.open, fs.read-----------------------------')
fs.open('hello.js', 'r', function(err, fd) {
    if(err) {
        console.error(err);
        return;
    }

    var buf = new Buffer(8);
    fs.read(fd, buf, 0, 8 , null, function(err, bytesRead, buffer) {
        if(err) {
            console.error(err);
            return;
        }


        console.log('--bytesRead: ' + bytesRead);
        console.log('--buffer: ' + buffer);
    })
});