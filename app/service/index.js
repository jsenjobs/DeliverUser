let client = require('./client')
let server = require('./server')
let models = {
	'client' : client,
	'server' : server,
}

exports.boot = function(app) {
    app.use(function(req,res, next) {
        req.models = models;
        return next();
    })
}
