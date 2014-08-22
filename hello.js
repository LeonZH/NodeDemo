/**
 * Created by lz16 on 2014/8/20 0020.
 */
/*exports.world = function() {
    console.log('Hello World!!');
};*/

function Hello() {
    var name;
    this.setName = function(thyName) {
        name = thyName;
    };

    this.sayHello = function() {
        console.log('Hello ' + name);
    };
}

module.exports = Hello;