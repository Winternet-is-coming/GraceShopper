//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Order_Products = require("./models/Order_Products");

//associations could go here!

Order.belongsTo(User);
User.hasMany(Order);

// Product.belongsToMany(Order, {through: 'Orders_Products'});
// Order.belongsToMany(Product, {through: 'Orders_Products'});

// Order.hasMany(Product);
// Product.belongsTo(Order)

Product.belongsToMany(Order, { through: Order_Products });
Order.belongsToMany(Product, { through: Order_Products });

Order.hasMany(Order_Products);
Order_Products.belongsTo(Order);

Product.hasMany(Order_Products);
Order_Products.belongsTo(Product);
// Order.belongsTo(Product);
// Product.hasMany(Order);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Order_Products,
  },
};

/*
User.belongsToMany(Profile, { through: 'User_Profiles' });
Profile.belongsToMany(User, { through: 'User_Profiles' });

*/
