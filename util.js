/**
 * Created by lz16 on 2014/8/21 0021.
 * http://www.w3cschool.cc/nodejs/nodejs-util.html
 */

//util.inherits
console.log('----------------------------util.inherits-------------------------------------');
var util = require('util');
function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function() {
        console.log('Hello' + this.name);
    };
}

Base.prototype.showName = function() {
    console.log(this.name);
};

function Sub() {
    this.name = 'sub';
}

util.inherits(Sub, Base);

var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);

var objSub = new Sub();
objSub.showName();
//objSub.sayHello();
console.log(objSub);

// util.inspect
console.log('----------------------------util.inspect-------------------------------------');
function Person() {
    this.name = 'Leon';
    this.toString = function() {
        return this.name;
    };
}

var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));
console.log(util.inspect(obj, true, null, true));
console.log(util.inspect(objBase, true, null, true));
console.log(util.inspect(objSub, true, null, true));

// util.isArray(object)
console.log('----------------------------util.isArray(object)-------------------------------------');
console.log(util.isArray([]));
console.log(util.isArray(new Array));
console.log(util.isArray({}));

// util.isRegExp(object)
console.log('----------------------------util.isRegExp(object)-------------------------------------');
console.log(util.isRegExp(/some regexp/));
console.log(util.isRegExp(new RegExp('another regexp')));
console.log(util.isRegExp({}));