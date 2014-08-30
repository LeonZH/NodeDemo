/**
 * Created by LeonZH on 2014/8/29 0029.
 */

var net = require('net');

// on method to response events
var server = net.createServer(function(socket) {
    socket.on('data', function(data) {
        socket.write(data);
    })
});

server.listen(8888);

// once method to response a single event
var server1 = net.createServer(function(socket) {
    socket.once('data', function(data) {
        socket.write(data);
    })
});

server1.listen(8889);

// create event emitter.
var eventEmitter = require('events').EventEmitter;
var channel = new eventEmitter();
channel.on('join', function() {
    console.log('welcome');
});
channel.emit('join');

//a simple publish/subscribe system using an event emitter
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
    console.log('join event');

    var welcome = "Welcome! \n" + "Guest online: " + this.listeners('broadcast').length;
    client.write(welcome + "\n");

    this.clients[id] = client;
    this.subscriptions[id] = function(senderID, message) {
        if (id != senderID) {
            channel.clients[id].write(message);
            console.log('add a message');
        }
    };

    this.on('broadcast', this.subscriptions[id]);
    console.log('broadcast event');
});

channel.on('leave', function(id) {
//    channel.removeListener('broadcast',this.subscriptions[id]);
    channel.removeListener('broadcast', function(){
        this.subscriptions[id].deleteContents(id);
        console.log('remove the subscription id: ' + id);
    });
    channel.emit('broadcast', id, id + ' has left the chart.\n');
    console.log('someone left the chat');
});

channel.on('shutdown', function() {
    channel.emit('broadcast', '', 'Chat has shut down. \n');
    channel.removeAllListeners('broadcast');
});

channel.on('error', function(err){
    console.log('ERROR: ' + err.toString());
});

var server2 = net.createServer(function(client) {
    var id = client.remoteAddress + ':' + client.remotePort;
    client.on('connect', function() {
        channel.emit('join', id, client);
        channel.emit('join', id);
    });
    client.on('data', function(data) {
        data = data.toString();
        channel.emit('broadcast', id, data);
        channel.emit('broadcast', id);
    });
    client.on('close', function() {
        channel.emit('leave', id);
    });
    client.on('data', function(data) {
        data = data.toString();
        if (data == 'shutdown\r\n') {
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, data);
    })
});
server2.listen(8890);