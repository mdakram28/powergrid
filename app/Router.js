module.exports = function(auth){
	return [
	    {
	        path: '/api/auth/',
	        handler: rootRequire('app/api/authRoutes')(auth)
	    },
	    {
	        path: '/api/readings/',
	        handler: rootRequire('app/api/readingsRoutes')(auth)
	    }
	];
}
