/**
 * Created by LeonZH on 2014/8/30 0030.
 */
var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './resources/rss_feeds.txt';

// 1. Make sure file containing the list of RSS feed URLs exists.
function checkForRSSFile () {
    fs.exists(configFilename, function(exists) {
        if (!exists)
//            Whenever there is an error, return early.
            return next(new Error('Missing RSS file: ' + configFilename));

        next(null, configFilename);
    });
}

//2. Read and parse file containing the feed URLs.
function readRSSFile (configFilename) {
    fs.readFile(configFilename, function(err, feedList) {
        if (err) return next(err);

//        convert list of feed URLs to a string and then into an array of feed URLs.
        feedList = feedList
            .toString()
            .replace(/^\s+|\s+$/g, '')
            .split("\n");

        console.log('**feed list count:' + feedList.length + '|' + Math.random() + '|' + (Math.random()*feedList.length));

//        Select random feed URL from array of feed URLs.
        var random = Math.floor(Math.random()*feedList.length);
        next(null, feedList[random]);
    });
}

//3. Do an HTTP request and get data for the selected feed.
function downloadRSSFeed (feedUrl) {
    request({uri: feedUrl}, function(err, res, body) {
        if (err) return next(err);

        console.log('**url:' + feedUrl);
        console.log('**res:' + res.statusCode + "|" + res.messages);

        if (res.statusCode != 200)
            return next(new Error('Abnormal response status code'));

        next(null, body);
    });
}

//4. Parse RSS data into array of items.
function parseRSSFeed (rss) {
    var handler = new htmlparser.RssHandler();
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);

    if (!handler.dom.items.length)
        return next(new Error('No RSS items found'));

    var item = handler.dom.items.shift();

//    Display title and URL of the first feed item, if it exists.
    console.log(item.title);
    console.log(item.link);
}

//Add each task to be performed to an array in execution order.
var tasks = [checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed ];

//a function called next executes each task.
function next(err, result) {
    console.log('**Run in next:' + typeof(result));
//    throw exception if task encounters an error.
    if (err) throw err;

//    Next task comes from array of task.
    var currentTask = tasks.shift();

    if (currentTask) {
//        Execute current task.
        currentTask(result);
    }
}

//start serial execution of tasks.
next();
console.log('**Run next()');
