exports.boot = function() {
	require('./mongose.init').boot()
	// redis require('./redis.init').boot()
	// mysql require('./mysql.init').boot()
}