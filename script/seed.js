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
    User.create({ email: "ben@oishii.com", password: "123" }),
    User.create({ email: "jess@oishii.com", password: "123" }),
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
      price: 10,
      quantity: 1,
      description: "One of a kind Kit Kat",
      imageUrl:
        "https://www.tokyoweekender.com/wp-content/uploads/2016/04/kitkat.jpg",
    }),

    Product.create({
      name: "Sakura sake Kit Kat",
      price: 20,
      quantity: 1,
      description: "Who would say no to alcohol right?",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2020/02/KIT-KAT-Sakura-Japanese-Sake-Made-in-Japan1a.jpg",
    }),

    Product.create({
      name: "Crayon Shin-Chan Chocobi Corn Snacks - Lemon",
      price: 4,
      quantity: 99,
      description:
        "This box of star-shaped corn snacks features prints of Crayon Shin-Chan characters! Enjoy the revitalizing lemon flavor of these tasty treats. They come with 1 Crayon Shin-Chan sticker taken from a set of 20 different designs.",
      imageUrl:
        "https://www.japancandystore.com/media/catalog/product/cache/11/thumbnail/600x600/9df78eab33525d08d6e5fb8d27136e95/2/0/20210514_093_1.jpg",
    }),

    Product.create({
      name: "Crayon Shin-Chan Hot Milk Biscuits",
      price: 4,
      quantity: 99,
      description:
        " These star-shaped puffy corn snacks from Tohato are beloved by the characters in Crayon Shin-Chan! They are flavored with Hokkaido milk and have a satisfying crunch. Feel like you are in their anime world as you snack on these sweet choco corn biscuits. Each pack comes with a collectible Crayon Shin-Chan sticker.",
      imageUrl:
        "https://www.japancandystore.com/media/catalog/product/cache/11/thumbnail/600x600/9df78eab33525d08d6e5fb8d27136e95/2/0/20190426_021.jpg",
    }),
    Product.create({
      name: "Meiji Meltykiss Party Assortment",
      price: 20,
      quantity: 75,
      description:
        " Meltykiss Party Assortment comes with three flavours, Premium chocolate, rich fruity strawberry and rich green tea. This is a Japanese winter limited edition. It’s a perfect gift to give to that someone special.",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2017/11/MEIJI-Meltykiss-Party-Assortment-of-Three-Flavour.jpg",
    }),
    Product.create({
      name: "Calbee JagaRico Potato Sticks Original Flavor",
      price: 2,
      quantity: 60,
      description:
        " French fries in chip form. There’s a crunch in every bite.",
      imageUrl:
        "https://img01.weeecdn.com/2020-08/FD2GQS2lRxyHV5RGEUW_ng-square.jpg",
    }),
    Product.create({
      name: "Calbee Honey Butter Potato Chips",
      price: 3,
      quantity: 50,
      description:
        "Potato Chips covered in a concoction of honey butter sauce and then baked to perfection. Will definitely have you reaching back for more. It is one of the most popular flavors in Japan for a reason.",
      imageUrl:
        "https://img01.weeecdn.com/2021-03/17MnKxcoQa2QPa3e47Rp2g-square.jpg",
    }),
    Product.create({
      name: "Peach Parfait Kit Kat",
      price: 12,
      quantity: 50,
      description:
        " Love peaches? Love parfaits? This Kit Kat combines the best of both worlds.",
      imageUrl:
        "https://i.etsystatic.com/30378333/r/il/65deba/3262486314/il_1588xN.3262486314_4a06.jpg",
    }),
    Product.create({
      name: "Japanese Ume Plum Kit Kat",
      price: 13,
      quantity: 45,
      description:
        "Sweet, sour, and refreshing Japanese Plum flavor covered in white chocolate with the original crispy wafer in the middle.",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2021/01/Kit-Kat-Ume-Plum-Made-in-Japan3-300x300.jpg",
    }),
    Product.create({
      name: "Japanese Hojicha Roasted Tea Kit Kat",
      price: 15,
      quantity: 60,
      description:
        "Hojicha flavored Kit Kats used to be a Kyoto only limited souvenir. Now, you can also get a taste of this deeply infused roasted tea infused with white chocolate Kit Kat.",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2021/03/Kit-Kat-Japanese-Hojicha-Roasted-Tea-12-Piece.jpg",
    }),
    Product.create({
      name: "Petit Cheese Crackers",
      price: 5,
      quantity: 50,
      description:
        "Bourbon’s Petit Series is one of the most popular and fun Japanese snack products. This product is Petit Cheese Crackers, a perfect snack for morning and afternoon tea!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0768/4331/products/Bourbon-Petit-Senbei-1024x72_1024x1024.jpg",
    }),
    Product.create({
      name: "Choco Pie Original",
      price: 10,
      quantity: 50,
      description:
        "One of the most delicious chocolate pie snacks in Japan. Find out why Japanese have been so crazy about this chocolate pie for decades!",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2016/10/LOTTE-Choco-Pie-Original-Made-in-Japan2.jpg",
    }),
    Product.create({
      name: "Pretz Mild Roast",
      price: 6,
      quantity: 50,
      description:
        "Pretz is the perfect savory snacks when you’re on the go. Our variety of these pretzel sticks ranges from pizza flavor to a sweet corn flavor.",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2016/02/GLICO-Pretz-Mild-Salad-Made-in-Japan4.jpg",
    }),
    Product.create({
      name: "MEIJI Fran Double Chocolate Sticks",
      price: 8,
      quantity: 50,
      description:
        "MEIJI Fran Double Chocolate Sticks are made of buttery biscuit sticks dipped in dark chocolate cream. The bittersweet biscuit sticks are pleasant treats to accompany your morning coffee or afternoon tea.",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2017/05/Fran-Double-Chocolate.jpg",
    }),
    Product.create({
      name: "MEIJI Takenoko No Sato",
      price: 11,
      quantity: 50,
      description:
        "MEIJI Takenoko No Sato – Original (meaning “Bamboo Shoot of the Village”) are delicious sweet snacks that are made to look like cute little bamboo shoots, with a milk chocolate “bamboo shoot” and crunchy biscuit “stalk” – a very tasty combination!",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2016/12/MEIJI-Takenoko-No-Sato-Original.jpg",
    }),
    Product.create({
      name: "Mini Strawberry Kit Kat",
      price: 7,
      quantity: 50,
      description:
        "KIT KAT Japan is one of the most popular Japanese snacks in the world. KIT KAT Strawberry is a limited version, available only for a limited time. It has a sweet strawberry flavor creating slightly sour taste mixed with beautiful chocolate on crispy wafer. This bag contains 12 individually wrapped mini bars.",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2016/10/KIT-KAT-Mini-Strawberry.jpg",
    }),
    Product.create({
      name: "GLICO Cratz Pepper Bacon",
      price: 4,
      quantity: 50,
      description:
        "GLICO Cratz Pepper Bacon. This savoury taste will have you licking your fingers soon after finishing these Cratz. There are mixed with awesome pretzel crackers that are not too hard and not too light.",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2016/04/GLICO-Cratz-Pepper-Bacon-1.jpg",
    }),
    Product.create({
      name: "Pocky Chocolate Luxury",
      price: 100,
      quantity: 50,
      description:
        "The perfect balance of high quality creamy chocolate and the crunch of a biscuit stick gives Pocky its irresistible taste. Share happiness!",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2019/11/GLICO-Chocolate-Luxury-20-Pocky-Limited-Time-Only-in-Japan-1.jpg",
    }),
    Product.create({
      name: "MEIJI Macadamia Nuts Chocolate",
      price: 14,
      quantity: 50,
      description:
        "Introduced some 40 years ago, MEIJI Macadamia Chocolate has always been one of the most popular chocolate among all Japanese. Meiji is a Japanese dairy and confectionery business that has been operating for 100 years.",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2016/12/MEIJI-Macadamia-Nuts-Chocolate-Japan.jpg",
    }),
    Product.create({
      name: "Premium Mini Mint Kit Kat",
      price: 7,
      quantity: 50,
      description:
        "A refreshing taste with a mint scent. Uses peppermint fragrance. Be one of the first to try the latest Japanese KitKat in your country. Both Chocolate Premium Mint Kit Kats and Citrus Premium Mint Kit Kats contain Feuilletine, or crushed up bits of crepe, as well as rum powder formulated into the cream between the wafers–said to have a sweet aroma and a rich taste aimed at adults. ",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2021/05/Kit-Kat-Premium-Mint-Limited-Seasonal-Special-Edition-Made-in-Japan.jpg",
    }),
    Product.create({
      name: "MEIJI Fruit Gumi Gummy Candy Orange",
      price: 5,
      quantity: 50,
      description:
        "One of the best selling soft candy in Japan. Using carefully selected sweet grapes as the key ingredient, the sweetness and the flavours have been packed into each gummy. They are made with concentrated real grape juice preserving the real fruit taste. ",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2018/02/MEIJI-Fruit-Gumi-Gummy-Candy-Orange-Made-in-Japan2.jpg",
    }),
    Product.create({
      name: "Uji Matcha Green Tea Caramel Corn",
      price: 15,
      quantity: 50,
      description:
        "A bittersweet, fragrant matcha flavor that you can enjoy. Uji matcha is joining the ranks of fluffy, crispy, and softly melting caramel corn with a gentle taste! You can enjoy the bittersweet and fragrant taste of matcha.",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2019/03/TOHATO-Uji-Matcha-Green-Tea-Caramel-Corns-Made-in-Japan2.jpg",
    }),
    Product.create({
      name: "FUJIYA Milky Vanilla Candy",
      price: 3,
      quantity: 50,
      description:
        "Fujiya Milky is a brand which started production in 1951 and are made of high quality milk from the Hokkaido region of Japan! This candy box features the well known Peko-Chan on the box and it contains around 7 individually wrapped candies. These soft and chewy treats are deliciously milky and matcha flavoured at the same time!",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2019/02/FUJIYA-Milky-Candy-Made-in-Japan2.jpg",
    }),
    Product.create({
      name: "Hi-Chew Assortment",
      price: 11,
      quantity: 50,
      description:
        "The famous fruity chewy candy from Japan ! Since its first release in 1975 by the confectionery producer Morinaga, Hi-Chew has became one of the most famous and best-selling Japanese candy. These sweets are juicy, chewy, and creamy at the same time. Though the individually wrapped little blocks look like usual bubblegum first, they soon become softer and smoother when you continue chewing them.",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2016/10/MORINAGA-Hi-Chew-Assortment-4-Flavours-Made-in-Japan2.jpg",
    }),
    Product.create({
      name: "Galbo Chocolate Strawberry Dagashi",
      price: 10,
      quantity: 50,
      description:
        "Meiji’s Galbo chocolates are popular in Japan for their unique texture. These chocolate snacks are coated with hard chocolaty goodness and have a chocolate-soaked cookie inside. What a tasty surprise! Perfect for picnics and parties!",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2020/01/MEIJI-Galbo-Chocolate-Strawberry-Dagashi-Snacks-Made-in-Japan2.jpg",
    }),
    Product.create({
      name: "Cream Genmai Brown Rice Brownie Matcha",
      price: 13,
      quantity: 50,
      description:
        "ASAHI Cream Genmai Brown Rice Brownie Matcha contains 10 types of nutrition including dietary fiber, vitamin, calsium, iron, etc. Stay healthy by eating this highly nutritious and rich brownie with delicious matcha cream.",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2018/05/ASAHI-Cream-Genmai-Brown-Rice-Brownie-Matcha-Made-in-Japan.jpg",
    }),
    Product.create({
      name: "Kinako Mochi Chocolate",
      price: 12,
      quantity: 50,
      description:
        "The gummy mochi is in the middle! The texture of the gummy mochi helps to spread the flavor of the kinako ‘chocolate’ all around your mouth. Chewing the gummy mochi produced more saliva that melted the chocolate further as well.",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2016/06/CHIRORU-CHOCO-Kinako-Mochi-Chocolate.jpg",
    }),
    Product.create({
      name: "BOURBON Alfort Chocolate & Cocoa Cookie",
      price: 6,
      quantity: 50,
      description:
        "Bite-size chocolatey-topped cookies Elegant and perfectly delightful, Alfort bite-size chocolatey cookies are the ideal after-dinner treat or anytime snack. Widely enjoyed in Japan, these cookies are great with coffee or tea and just the right size to take with you anywhere. Beautiful milky chocolate on top of crispy cookie. Perfect companion for morning and afternoon tea.",
      imageUrl:
        "https://www.takaski.com/wp-content/uploads/2016/10/BOURBON-Alfort-Chocolate-Cookie-Original-Blue-Made-in-Japan.jpg",
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
