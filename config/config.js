'use strict';

module.exports = function() {
    global.config = {
        'baseUrl': 'http://localhost',
        'port': 8080,
        'database': 'test',
        'username': 'postgre',
        'password': 'admin',
        'sessionSecret': 'akram@3s^%hget',
		'jwtSecret': 'MyS3c1231%78NH',
		'jwtSession': {
			session: false
		}
    };
};
