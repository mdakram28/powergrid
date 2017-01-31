'use strict';

let Sequelize = require('sequelize');
let db = new Sequelize(global.config.database, global.config.username, global.config.password, {
    dialect: 'postgresql',

});

db._Sequelize = Sequelize;

module.exports = db;
