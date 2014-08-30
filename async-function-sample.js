/**
 * Created by LeonZH on 2014/8/30 0030.
 */

function asyncFunction(callback) {
    setTimeout(function() {
        callback()
    }, 200);
}

var color = 'blue';

asyncFunction(function() {
    console.log('The color is ' + color);
});

//using an anonymous function to preserve a global variable's value.
(function(color) {
    asyncFunction(function() {
        console.log('The color is ' + color);
    })
})(color);

color = 'green';