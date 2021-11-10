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
  
- OrderDetail through table (between Products<->Orders)

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
User ID 1 adds something to the cart.
A new order is created in the Orders table. The foreign key userId links this order back to the User table.
The order is currently unfulfilled.

When User 1 adds Product 1 to their cart (Orders table), a new row is added to OrderDetail through table with orderId: 1, productId: 1.
User 1 adds Product 2 to their cart, a  new row is added to the through table orderId: 1, productId: 2.

If someone adds multiple qty of the same productId, we need a qty column in OrderDetail through table.

Product.belongsToMany(Order, through: {'OrderDetail'})

Create the OrderDetail model in a separate file, with the qty field included. Then use THAT as the through table.
Product.belongsToMany(Order, {through: OrderDetail})
Order.belongsToMany(Product, {through: OrderDetail})

OrderDetail also needs ttal price per product. This makes it so that when you update the price in your Product model, you can see the historical price.

*/
