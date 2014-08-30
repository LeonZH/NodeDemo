/**
 * Created by LeonZH on 2014/8/30 0030.
 */
var flow = require('nimble');

flow.series([
    function (callback) {
        setTimeout(function() {
            console.log('I execute first.');
            callback();
        }, 1000);
    },
    function (callback) {
        setTimeout(function() {
            console.log('I execute next.');
            callback();
        }, 500);
    },
    function (callback) {
        setTimeout(function() {
            console.log('I execute last.');
            callback();
        }, 100);
    }
]);
