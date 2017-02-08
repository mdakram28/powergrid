/*
consumes ::

POST		/api/auth/login
POST		/api/auth/logout
GET			/api/auth/isLoggedIn
*/
module.exports = function(app) {
    app.factory('AuthService', ['$http', '$cookieStore', function($http, $cookieStore) {
        let token = '';
        let isLoggedIn = false;

        return {
            authenticate: function(username, password, done) {
                $http({
                    method: 'POST',
                    url: '/api/auth/login',
                    data: {
                        username: username,
                        password: password
                    }
                }).then(function(res) {
                    token = res.data.token;
                    isLoggedIn = true;
                    //$cookieStore.put('token', token);
                    return done();
                }, function(res) {
                    token = '';
                    //$cookieStore.remove('token');
                    isLoggedIn = false;
                    return done(res.data.err);
                });
            },
            logout: function(done) {
                console.log("yeah")
                $cookieStore.remove('token');
                $http({
                    method: 'POST',
                    url: '/api/auth/logout'
                }).then(function(res) {
                    token = '';
                    isLoggedIn = false;
                    if (done) return done();
                }, function(res) {
                    token = '';
                    isLoggedIn = false;
                    if (done) return done(res.data.err);
                });
            },
            syncIsLoggedIn: function(done) {
                $http({
                    method: 'GET',
                    url: '/api/auth/isLoggedIn'
                }).then(function(res) {
                    isLoggedIn = true;
                    return done(true);
                }, function(res) {
                    token = '';
                    $cookieStore.remove('token', '')
                    isLoggedIn = false;
                    return done(false);
                });
            },
            isLoggedIn: function(done) {
                if (done) {
                    return done(isLoggedIn);
                } else {
                    return isLoggedIn;
                }
            }
        }
	}]);
}
