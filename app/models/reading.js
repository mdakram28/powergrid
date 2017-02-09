'use strict';
module.exports = function(sequelize, DataTypes) {
    let Reading = sequelize.define('Reading', {
		'id': {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		'datetime': DataTypes.DATE,
		'meterid': DataTypes.INTEGER,
		'vry': DataTypes.FLOAT,
		'vyb': DataTypes.FLOAT,
		'vbr': DataTypes.FLOAT,
		'vrn': DataTypes.FLOAT,
		'vyn': DataTypes.FLOAT,
		'vbn': DataTypes.FLOAT,
		'ir': DataTypes.FLOAT,
		'iy': DataTypes.FLOAT,
		'ib': DataTypes.FLOAT,
		'pf': DataTypes.FLOAT,
		'hz': DataTypes.FLOAT,
		'kwh': DataTypes.FLOAT,
		'kvah': DataTypes.FLOAT,
		'kvarhlag': DataTypes.FLOAT,
		'kvarhlead': DataTypes.FLOAT,
		'kw': DataTypes.FLOAT,
		'kw-r': DataTypes.FLOAT,
		'kw-y': DataTypes.FLOAT,
		'kw-b': DataTypes.FLOAT,
		'kva': DataTypes.FLOAT,
		'kva-r': DataTypes.FLOAT,
		'kva-y': DataTypes.FLOAT,
		'kva-b': DataTypes.FLOAT,
		'kvar': DataTypes.FLOAT,
		'kvar-r': DataTypes.FLOAT,
		'kvar-y': DataTypes.FLOAT,
		'kvar-b': DataTypes.FLOAT,
    }, {
		timestamps: false,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            },
        },
    });
    return Reading;
};
