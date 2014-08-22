/**
 * Created by lz16 on 2014/8/20 0020.
 * http://www.w3cschool.cc/nodejs/nodejs-function.html
 */

function say(word) {
    console.log(word);
}

function execute(someFunction, value) {
    someFunction(value);
}

execute(say, 'Hello');