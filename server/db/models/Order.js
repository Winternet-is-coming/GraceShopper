const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
	// quantity: {
	// 	type: Sequelize.INTEGER,
	// },
	isFulfilled: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Order;
