var passport = require("passport");
var passportJWT = require("passport-jwt");
var cfg = global.config;
var jwt = require('jwt-simple');

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['token'];
		try{
			token = JSON.parse(token);
		}catch(err){}
    }
	console.log(token);
    return token;
};

var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: cookieExtractor
};

var users = [{
	id: 0,
	username: 'mdakram28',
	password: '1234'
},{
	id: 1,
	username: 'blah blah',
	password: '12345'
},{
	id: 2,
	username: 'a',
	password: 'a'
}]

module.exports = function() {
    var strategy = new Strategy(params, function(payload, done) {
        var user = users[payload.id] || null;
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};
