"use strict";

const {
  db,
  models: { User, Product, Order, Order_Products },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ email: "grace@oishii.com", password: "123" }),
    User.create({ email: "boxu@oishii.com", password: "123" }),
    User.create({ email: "sen@oishii.com", password: "123", isAdmin: true }),
    User.create({ email: "courtney@oishii.com", password: "123" }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Matcha Pocky",
      price: 13,
      quantity: 99,
      description:
        "The perfect balance of high-quality, matcha green tea cream and the crunch of the crispy cookie biscuit stick make it the perfect every-day snack. Pocky is all about sharing happiness with friends, family and co-workers.",
      imageUrl: "https://images.heb.com/is/image/HEBGrocery/001779488",
    }),
    Product.create({
      name: "Taiyaki Ice Cream",
      price: 8,
      quantity: 85,
      description:
        "This cute fish shaped biscuit (similar texture to an ice cream cone) is very crispy and has an airy chocolate filling. A nice light snack and not too sweet.",
      imageUrl:
        "https://www.imuraya-group.com/english/information/global_activities/images/global_img08.jpg",
    }),
    Product.create({
      name: "Sakura Pocky",
      price: 9,
      quantity: 90,
      description:
        "The buttery biscuit is dipped in a pale pink white chocolate flavored with real sakura cherry blossoms. The blossoms are preserved with salt, adding brightness to the sweet chocolate, and are blended into a powder to infuse the chocolate with flavor. This classic Japanese flavor is perfect for enjoying under the spring flowers. ",
      imageUrl:
        "https://scstore.com.my/wp-content/uploads/2020/07/Untitled-design-20.jpg",
    }),

    Product.create({
      name: "Hello Panda Chocolate Biscuit",
      price: 5,
      quantity: 50,
      description:
        "For a yummy snack you can take with you on the go, reach for these Hello Panda Choco Cream Biscuits from Meiji. These biscuit cookies feature a creamy chocolate center. Stash them in your bag for a little pick-me-up or add to your child's lunch box for a sweet treat.",
      imageUrl:
        "https://target.scene7.com/is/image/Target/GUEST_083453b0-bd17-48bb-a9b6-02d4546afa66",
    }),
    Product.create({
      name: "Daisuki Pikachu Gummies",
      price: 3,
      quantity: 50,
      description:
        "Perfect for Pikachu and Pokemon lovers, these gummies feature various Pikachu shaped gummies including his cute face, tail, and more! They are almost too cute to eat, but with a yummy aroma and the sweetness of real grape juice, they are irresistible!",
      imageUrl:
        "https://meccha-japan.com/138004-large_default/gummies-daisuki-pikachu-lotte.jpg",
    }),
    Product.create({
      name: "Milk Tea Kit Kat",
      price: 7,
      quantity: 50,
      description:
        "Nestle Japan's newest creation is a royal favorite, Milk Tea! The cream is kneaded with milk tea flavored chocolate, and tea powder is sandwiched into the wafer. Together they created a delicious treat that tastes just like Royal Milk Tea.",
      imageUrl:
        "https://meccha-japan.com/169160-large_default/kit-kat-milk-tea-nestle-japan.jpg",
    }),
    Product.create({
      name: "Chocolate Potato Chips",
      price: 5,
      quantity: 50,
      description:
        "Enjoy the luxurious taste of rich 'Zaitaku' chocolate drizzled over thick, delicious ripple potato chips. World famous Lorraine rock salt is used to make the brilliant flavor combination. Calbee has been pleasing mouths in Japan for some time. A perfect snack with just the right amount of crunch, saltiness, and sweetness.",
      imageUrl:
        "https://meccha-japan.com/169055-large_default/potato-chips-zeitaku-chocolate-calbee.jpg",
    }),
    Product.create({
      name: "Chocolate Strawberry Apollo",
      price: 2,
      quantity: 50,
      description:
        "These delicious bite-sized, cone shaped chocolates with strawberry tips and milk chocolate bases are a staple in the Japanese confectionery scene. Meiji is one of the finest mass-produced chocolate makers in Japan.",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0561/3553/products/JP-656_x700.jpg?v=1575122802",
    }),
    Product.create({
      name: "Chocolate Giant Pocky",
      price: 15,
      quantity: 50,
      description: "It’s like Pocky but bigger!",
      imageUrl: "https://m.media-amazon.com/images/I/71wQA31dR8L._SL1500_.jpg",
    }),
    Product.create({
      name: "Hi-Chew Candy - Mango",
      price: 3,
      quantity: 100,
      description:
        "A cultural icon, these super juicy and yummy candies feel like gum at first, but become softer as you chew!",
      imageUrl:
        "https://cdn.shoplightspeed.com/shops/632181/files/31847362/pacific-candy-hi-chew-fruit-mango.jpg",
    }),

    Product.create({
      name: "Matcha Kit Kat",
      price: 15000,
      quantity: 1,
      description: "Reserved for Ben!",
      imageUrl:
        "https://i.pinimg.com/originals/07/d2/c0/07d2c0e0007685f12159b1b4e9e45c69.jpg",
    }),

    Product.create({
      name: "Seafood Kit Kat",
      price: 1000,
      quantity: 1,
      description: "One of a kind Kit Kat",
      imageUrl:
        "https://www.tokyoweekender.com/wp-content/uploads/2016/04/kitkat.jpg",
    }),

    Product.create({
      name: "Sakura sake Kit Kat",
      price: 2000,
      quantity: 1,
      description: "Who would say no to alcohol right?",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2020/02/KIT-KAT-Sakura-Japanese-Sake-Made-in-Japan1a.jpg",
    }),

    Product.create({
      name: "Crayon Shin-Chan Chocobi Corn Snacks - Lemon",
      price: 400,
      quantity: 99,
      description:
        "This box of star-shaped corn snacks features prints of Crayon Shin-Chan characters! Enjoy the revitalizing lemon flavor of these tasty treats. They come with 1 Crayon Shin-Chan sticker taken from a set of 20 different designs.",
      imageUrl:
        "https://www.japancandystore.com/media/catalog/product/cache/11/thumbnail/600x600/9df78eab33525d08d6e5fb8d27136e95/2/0/20210514_093_1.jpg",
    }),

    Product.create({
      name: "Crayon Shin-Chan Hot Milk Biscuits",
      price: 450,
      quantity: 99,
      description:
        " These star-shaped puffy corn snacks from Tohato are beloved by the characters in Crayon Shin-Chan! They are flavored with Hokkaido milk and have a satisfying crunch. Feel like you are in their anime world as you snack on these sweet choco corn biscuits. Each pack comes with a collectible Crayon Shin-Chan sticker.",
      imageUrl:
        "https://www.japancandystore.com/media/catalog/product/cache/11/thumbnail/600x600/9df78eab33525d08d6e5fb8d27136e95/2/0/20190426_021.jpg",
    }),
  ]);
  const orders = await Order.bulkCreate([
    { userId: 1 },
    { userId: 2 },
    { userId: 3 },
    { userId: 4 },
  ]);

  const orderProducts = await Order_Products.bulkCreate([
    { orderId: 1, productId: 1, quantity: 3 },
    { orderId: 1, productId: 2, quantity: 1 },
    { orderId: 1, productId: 3, quantity: 4 },
    { orderId: 1, productId: 4, quantity: 1 },
    { orderId: 2, productId: 5, quantity: 2 },
    { orderId: 2, productId: 6, quantity: 1 },
    { orderId: 2, productId: 7, quantity: 5 },
    { orderId: 2, productId: 8, quantity: 1 },
    { orderId: 2, productId: 1, quantity: 3 },
    { orderId: 3, productId: 1, quantity: 2 },
    { orderId: 3, productId: 2, quantity: 3 },
    { orderId: 3, productId: 3, quantity: 1 },
    { orderId: 3, productId: 4, quantity: 4 },
    { orderId: 4, productId: 5, quantity: 1 },
    { orderId: 4, productId: 6, quantity: 6 },
    { orderId: 4, productId: 7, quantity: 1 },
    { orderId: 4, productId: 8, quantity: 2 },
    { orderId: 4, productId: 4, quantity: 1 },
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users,
    products,
    orders,
    orderProducts,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

/*

const queryInterface = db.getQueryInterface();
    const now = new Date();

    await queryInterface.bulkInsert("RobotProjects", [
      { createdAt: now, updatedAt: now, projectId: 1, robotId: 1 },
      { createdAt: now, updatedAt: now, projectId: 1, robotId: 2 },
      { createdAt: now, updatedAt: now, projectId: 1, robotId: 3 },
      { createdAt: now, updatedAt: now, projectId: 1, robotId: 5 },
      { createdAt: now, updatedAt: now, projectId: 2, robotId: 1 },
      { createdAt: now, updatedAt: now, projectId: 2, robotId: 2 },
      { createdAt: now, updatedAt: now, projectId: 2, robotId: 5 },
      { createdAt: now, updatedAt: now, projectId: 3, robotId: 3 },
      { createdAt: now, updatedAt: now, projectId: 3, robotId: 6 },
      { createdAt: now, updatedAt: now, projectId: 3, robotId: 2 },
      { createdAt: now, updatedAt: now, projectId: 4, robotId: 6 },
      { createdAt: now, updatedAt: now, projectId: 5, robotId: 1 },
      { createdAt: now, updatedAt: now, projectId: 5, robotId: 2 },
      { createdAt: now, updatedAt: now, projectId: 5, robotId: 3 },
      { createdAt: now, updatedAt: now, projectId: 5, robotId: 5 },
      { createdAt: now, updatedAt: now, projectId: 6, robotId: 3 },
      { createdAt: now, updatedAt: now, projectId: 6, robotId: 5 },
    ]);


*/
