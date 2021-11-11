'use strict';

const {
	db,
	models: {User, Product, Order, Order_Products},
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
	await db.sync({force: true}); // clears db and matches models to tables
	console.log('db synced!');

	// Creating Users
	const users = await User.bulkCreate([
		{email: 'grace@oishii.com', password: '123'},
		{email: 'boxu@oishii.com', password: '123'},
		{email: 'sen@oishii.com', password: '123'},
		{email: 'courtney@oishii.com', password: '123'},
	]);
	// const users = await Promise.all([
	// 	User.create({email: 'grace@oishii.com', password: '123'}),
	// 	User.create({email: 'boxu@oishii.com', password: '123'}),
	// 	User.create({email: 'sen@oishii.com', password: '123'}),
	// 	User.create({email: 'courtney@oishii.com', password: '123'}),
	// ]);
	const products = await Product.bulkCreate([
		{
			name: 'Matcha Pocky',
			price: 13.5,
			quantity: 99,
			description: 'A box of delicious Pocky',
			imageUrl: 'https://images.heb.com/is/image/HEBGrocery/001779488',
		},
		{
			name: 'Taiyaki',
			price: 8,
			quantity: 85,
			description: 'Matcha Ice Cream and Red bean paste what more do you want',
			imageUrl:
				'https://cdn.vox-cdn.com/thumbor/J8AtwCpBgNuGtHH3uvn3J1KI8yI=/0x120:960x840/1400x1400/filters:focal(0x120:960x840):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/51047099/14333641_175488296188873_4191830636852674148_n.0.jpg',
		},
		{
			name: 'Sakura Pocky',
			price: 9,
			quantity: 90,
			description: 'A box of delicious Sakura Pocky',
			imageUrl:
				'https://scstore.com.my/wp-content/uploads/2020/07/Untitled-design-20.jpg',
		},
		{
			name: 'Hello Panda Chocolate Biscuit',
			price: 5.99,
			quantity: 50,
			description: 'A box of adorable and yummy panda biscuits.',
			imageUrl:
				'https://target.scene7.com/is/image/Target/GUEST_083453b0-bd17-48bb-a9b6-02d4546afa66',
		},
		{
			name: 'Daisuki Pikachu Gummies',
			price: 3.99,
			quantity: 50,
			description:
				'A bag of grape-flavored gummy candies in the shape of your favorite Pokémon, Pikachu.',
			imageUrl:
				'https://meccha-japan.com/138004-large_default/gummies-daisuki-pikachu-lotte.jpg',
		},
		{
			name: 'Milk Tea Kit Kat',
			price: 7.99,
			quantity: 50,
			description: 'A bag of milk tea Kit Kats - perfect for a tea party!',
			imageUrl:
				'https://meccha-japan.com/169160-large_default/kit-kat-milk-tea-nestle-japan.jpg',
		},
		{
			name: 'Chocolate Potato Chips',
			price: 5.99,
			quantity: 50,
			description: 'Your two favorite loves in one snack!',
			imageUrl:
				'https://meccha-japan.com/169055-large_default/potato-chips-zeitaku-chocolate-calbee.jpg',
		},
		{
			name: 'Chocolate Potato Chips',
			price: 3.99,
			quantity: 50,
			description: 'Your two favorite loves in one snack!',
			imageUrl:
				'https://meccha-japan.com/169055-large_default/potato-chips-zeitaku-chocolate-calbee.jpg',
		},
		{
			name: 'Chocolate Strawberry Apollo',
			price: 2.99,
			quantity: 50,
			description:
				'A box of creamy bite-sized chocolates with sweet strawberry flavor.',
			imageUrl: 'https://m.media-amazon.com/images/I/61MKyXmKk3L._SL1500_.jpg',
		},
	]);
	const orders = await Order.bulkCreate([
		{userId: 1},
		{userId: 2},
		{userId: 3},
		{userId: 4},
	]);

	const orderProducts = await Order_Products.bulkCreate([
		{orderId: 1, productId: 1, quantity: 3},
		{orderId: 1, productId: 2, quantity: 1},
		{orderId: 1, productId: 3, quantity: 4},
		{orderId: 1, productId: 4, quantity: 1},
		{orderId: 2, productId: 5, quantity: 2},
		{orderId: 2, productId: 6, quantity: 1},
		{orderId: 2, productId: 7, quantity: 5},
		{orderId: 2, productId: 8, quantity: 1},
		{orderId: 2, productId: 9, quantity: 3},
		{orderId: 3, productId: 1, quantity: 2},
		{orderId: 3, productId: 2, quantity: 3},
		{orderId: 3, productId: 3, quantity: 1},
		{orderId: 3, productId: 4, quantity: 4},
		{orderId: 4, productId: 5, quantity: 1},
		{orderId: 4, productId: 6, quantity: 6},
		{orderId: 4, productId: 7, quantity: 1},
		{orderId: 4, productId: 8, quantity: 2},
		{orderId: 4, productId: 9, quantity: 1},
	]);

	// const products = await Promise.[
	//{
	// 		name: 'Matcha Pocky',
	// 		price: 13,
	// 		quantity: 99,
	// 		description: 'A box of delicious Pocky',
	// 		imageUrl: 'https://images.heb.com/is/image/HEBGrocery/001779488',
	// 	}),
	//{
	// 		name: 'Taiyaki',
	// 		price: 8,
	// 		quantity: 85,
	// 		description: 'Matcha Ice Cream and Red bean paste what more do you want',
	// 		imageUrl:
	// 			'https://cdn.vox-cdn.com/thumbor/J8AtwCpBgNuGtHH3uvn3J1KI8yI=/0x120:960x840/1400x1400/filters:fo0x120:960x840):forjpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/51047099/14333641_175488296188873_4191830636852674148_n.0.jpg',
	// 	}),
	//{
	// 		name: 'Sakura Pocky',
	// 		price: 9,
	// 		quantity: 90,
	// 		description: 'A box of delicious Sakura Pocky',
	// 		imageUrl:
	// 			'https://scstore.com.my/wp-content/uploads/2020/07/Untitled-design-20.jpg',
	// 	}),

	//{
	//   name: "Hello Panda Chocolate Biscuit",
	//   price: 5.99,
	//   quantity: 50,
	//   description: "A box of adorable and yummy panda biscuits.",
	//   imageUrl:
	//     "https://target.scene7.com/is/image/Target/GUEST_083453b0-bd17-48bb-a9b6-02d4546afa66",
	// }),
	//{
	//   name: "Daisuki Pikachu Gummies",
	//   price: 3.99,
	//   quantity: 50,
	//   description:
	//     "A bag of grape-flavored gummy candies in the shape of your favorite Pokémon, Pikachu.",
	//   imageUrl:
	//     "https://meccha-japan.com/138004-large_default/gummies-daisuki-pikachu-lotte.jpg",
	// }),
	//{
	//   name: "Milk Tea Kit Kat",
	//   price: 7.99,
	//   quantity: 50,
	//   description: "A bag of milk tea Kit Kats - perfect for a tea party!",
	//   imageUrl:
	//     "https://meccha-japan.com/169160-large_default/kit-kat-milk-tea-nestle-japan.jpg",
	// }),
	//{
	//   name: "Chocolate Potato Chips",
	//   price: 5.99,
	//   quantity: 50,
	//   description: "Your two favorite loves in one snack!",
	//   imageUrl:
	//     "https://meccha-japan.com/169055-large_default/potato-chips-zeitaku-chocolate-calbee.jpg",
	// }),
	//{
	//   name: "Chocolate Potato Chips",
	//   price: 3.99,
	//   quantity: 50,
	//   description: "Your two favorite loves in one snack!",
	//   imageUrl:
	//     "https://meccha-japan.com/169055-large_default/potato-chips-zeitaku-chocolate-calbee.jpg",
	// }),
	//{
	//   name: "Chocolate Strawberry Apollo",
	//   price: 2.99,
	//   quantity: 50,
	//   description:
	//     "A box of creamy bite-sized chocolates with sweet strawberry flavor.",
	//   imageUrl: "https://m.media-amazon.com/images/I/61MKyXmKk3L._SL1500_.jpg",
	// }),
	// ]);

	// await users[1].createOrders({productId: 2, quantity: 10});
	// await users[2].createOrders({productId: 2, quantity: 10});
	// await users[3].createOrders({productId: 3, quantity: 10});
	// await users[3].createOrders({productId: 1, quantity: 10});

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
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
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
