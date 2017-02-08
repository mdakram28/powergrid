'use strict';

let bodyParser = require('body-parser');
let path = require('path');
let session = require('express-session');
let compression = require('compression');

module.exports = function(app, express) {
    if (global.PROD_ENV) {
        app.use(compression());
    }

    /*
     * Parse JSON
     * app.use(bodyParser.json());
     **/

    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    /*
     * Use PUT / DELETE HTTP verb
     * app.use(methodOverride());
     **/

    app.use(session({
        secret: global.config.sessionSecret,
        saveUninitialized: true,
        resave: true,
    }));

    // app.set('views', path.join(__dirname, '../app/views'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../public/build')));
    app.use(express.static(path.join(__dirname, '../assets')));
};
