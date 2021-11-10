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
      description: "A box of delicious Pocky",
      imageUrl: "https://images.heb.com/is/image/HEBGrocery/001779488",
    }),
    Product.create({
      name: "Taiyaki",
      price: 8,
      quantity: 85,
      description: "Matcha Ice Cream and Red bean paste what more do you want",
      imageUrl:
        "https://cdn.vox-cdn.com/thumbor/J8AtwCpBgNuGtHH3uvn3J1KI8yI=/0x120:960x840/1400x1400/filters:focal(0x120:960x840):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/51047099/14333641_175488296188873_4191830636852674148_n.0.jpg",
    }),
    Product.create({
      name: "Sakura Pocky",
      price: 9,
      quantity: 90,
      description: "A box of delicious Sakura Pocky",
      imageUrl:
        "https://scstore.com.my/wp-content/uploads/2020/07/Untitled-design-20.jpg",
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
