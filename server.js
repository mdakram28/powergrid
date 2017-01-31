'use strict';
require('./utils/rootRequire')();
require('./utils/prodEnv')();
require('./config/config.js')();
let express = require('express');
let http    = require('http');
let Router  = rootRequire('app/Router');
let app     = express();
let server  = http.createServer(app);

/**
* MIDDLEWARE
********************* */
require('./config/middleware')(app, express);

/**
* ROUTES
********************* */
app.use(rootRequire('utils/flash'));

Router.forEach(route => {
  app.use(route.path, route.handler);
});

app.use((req, res, next) => {
  res.status(404);
  res.render('global/404', {
    title: 'Page introuvable !',
  });
});

server.listen(global.config.port);
console.log(`Server started on ${global.config.baseUrl}:${global.config.port}\n`);
