'use strict';
module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define('User', {
        fullname: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            },
        },
    });
    return User;
};
