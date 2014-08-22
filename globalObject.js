/**
 * Created by lz16 on 2014/8/21 0021.
 */

console.log(process.argv);

console.trace();

process.stdin.resume();
process.stdin.on('data', function(data) {
    process.stdout.write('read from console: ' + data.toString());
});

