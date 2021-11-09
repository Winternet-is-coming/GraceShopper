//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product=require('./models/Product')
const Order=require('./models/Order');

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

// Product.belongsToMany(Order, {through: 'Orders_Products'});
// Order.belongsToMany(Product, {through: 'Orders_Products'});

// Order.hasMany(Product);
// Product.belongsTo(Order)

Order.belongsTo(Product);
Product.hasMany(Order);


module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
  },
}

/*
User.belongsToMany(Profile, { through: 'User_Profiles' });
Profile.belongsToMany(User, { through: 'User_Profiles' });

*/
