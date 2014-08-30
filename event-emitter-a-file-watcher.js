/**
 * Created by LeonZH on 2014/8/30 0030.
 */
function Watcher(watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}

var events = require('events')
    , util = require('util');

util.inherits(Watcher, events.EventEmitter);

var fs = require('fs')
    , watchDir = './resources/watch'
    , processedDir  = './resources/done';

Watcher.prototype.watch = function() {
    var watcher = this;
    fs.readdir(this.watchDir, function(err, files) {
        if (err) throw err;
        for(index in files) {
            console.log('----files[index]------\n' + files[index]);
            watcher.emit('process', files[index]);
        }
    })
};

Watcher.prototype.start = function() {
    var watcher = this;
    console.log('----this------\n' + this.toString());
    console.log('----watchDir------\n' + watchDir);
    fs.watchFile(watchDir, function() {
        watcher.watch();
    });
};

var watcher = new Watcher(watchDir, processedDir);

watcher.on('process', function process(file) {
    var watchFile      = this.watchDir + '/' + file;
    var processedFile  = this.processedDir + '/' + file.toLowerCase();

    fs.rename(watchFile, processedFile, function(err) {
        if (err) throw err;
    });
});

watcher.start();
