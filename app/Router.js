module.exports = function(auth){
	return [
	    {
	        path: '/api/auth/',
	        handler: rootRequire('app/api/authRoutes')(auth),
	    }
	];

}
