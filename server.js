'use strict';
require('./utils/rootRequire')();
require('./utils/prodEnv')();
require('./config/config.js')();
let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app);
let auth = require('./app/util/auth.js')();
require('./config/middleware')(app, express, auth);
let Router = rootRequire('app/Router')(auth);
app.use(rootRequire('utils/flash'));
Router.forEach((route) => {
    app.use(route.path, route.handler);
});
app.use((req, res, next) => {
    res.sendStatus(404);
});
server.listen(global.config.port);
let link = ` ${global.config.baseUrl}:${global.config.port}`;
console.log(`Server started on ${link}\n`);
