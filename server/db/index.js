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

/*
What info do you need for an ecommerce site?
- things to sell (products)
- user info
- cart
- dummy orders
- website name
- address
- payment info

How do you separate these into tables (Sequelize models)?
- Users table

- Products table

- Orders table
  - isFulfilled: false -> order still in progress or not started
  - isFulfilled: true -> historical order

Is there a relationship between users and products?
Users buy our products through the cart. So users and products have an indirect relationship.
There's a relationship between products <-> orders and orders <-> users.

Is there a relationship between an order and a cart?
A cart is an unfulfilled order. A cart is a boolean value on orders.
Can add 'isFulfilled' field to the Orders table.

As an MVP, we don't have to optimize for how many times the db is getting queried.
(So if the cart is constantly being updated in the db, that's fine for this project.)

THE ASSOCIATIONS
User can have many Orders. (one-to-many)

Orders have many Products. (many-to-many)
Products have many Orders.
Creates a through table with orderId, productId.

DATA FLOW


*/
