"use strict";

const {
  db,
  models: { User, Product, Order },
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
    User.create({ email: "sen@oishii.com", password: "123" }),
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
  ]);

  await users[0].createOrder({ productId: 1, quantity: 10 });
  await users[1].createOrder({ productId: 2, quantity: 10 });
  await users[2].createOrder({ productId: 2, quantity: 10 });
  await users[3].createOrder({ productId: 3, quantity: 10 });
  await users[3].createOrder({ productId: 1, quantity: 10 });

  // const queryInterface = db.getQueryInterface();
  //   const now = new Date();

  //   await queryInterface.bulkInsert(Order, [
  //     { createdAt: now, updatedAt: now, userId: 1, productId: 1, quantity: 10},
  //     { createdAt: now, updatedAt: now, userId: 1, productId: 2, quantity: 5},
  //     { createdAt: now, updatedAt: now, userId: 2, productId: 3, quantity: 2},
  //     { createdAt: now, updatedAt: now, userId: 3, productId: 1, quantity: 10},
  //     { createdAt: now, updatedAt: now, userId: 4, productId: 2, quantity: 20},
  //   ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users,
    products,
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
