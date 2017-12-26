let client = require('./client')
let queryorder = require('./queryorder')
let server = require('./server')
let models = {
	'client' : client,
	'queryorder' : queryorder,
	'server' : server,
}

exports.boot = function(app) {
    app.use(function(req,res, next) {
        req.models = models;
        return next();
    })
}
