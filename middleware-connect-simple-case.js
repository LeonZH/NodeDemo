/**
 * Created by LeonZH on 2014/9/4 0004.
 */
var connect = require('connect');

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}

function authenticateWithDatabase(user, pass, callback) {
    var err;
    if (user != 'Aladdin' || pass != 'open sesame') {
        err = new Error('Unauthorized');
    }
    callback(err);
}

function restrict(req, res, next) {
//    console.log(req.headers);

    var authorization = req.headers.authorization;
    if (!authorization) return next(new Error('Unauthorized'));

    var parts = authorization.split(' ');
    var scheme = parts[0];
    var auth = new Buffer(parts[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    console.log(parts[1] + '|' + Buffer(parts[1], 'base64').toString());

    authenticateWithDatabase(user, pass, function (err) {
        if (err) return next(err);
        next();
    });
}

function admin(req, res, next) {

    switch (req.url.toLowerCase()) {
        case '/':
            res.end('try /users');
            console.log('try users.');
            break;
        case '/users':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
            break;
        default :
            res.end('not found req.ur.' + req.url);
    }
}

connect()
    .use(logger)
    .use('/admin', restrict)
    .use('/admin', admin)
    .use(hello)
    .listen(3000);
