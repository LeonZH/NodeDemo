/**
 * Created by lz16 on 2014/8/20 0020.
 * sample from http://www.w3cschool.cc/nodejs/nodejs-event.html
 */
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.once('connection', function(stream) {
    console.log('the first one request!');
});

event.on('some_event', function() {
    console.log('some_event occured.');
});


setTimeout(function() {
    event.emit('some_event');
    event.emit('connection');
//    event.emit('error');
}, 1000);




