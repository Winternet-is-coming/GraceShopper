const router = require("express").Router();
const {
  models: { Order, Product, Order_Products, User },
} = require("../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = router;

router.get("/:userId", async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.headers.authorization);

    if (id === +req.params.userId) {
      const cart = await Order_Products.findAll({
        include: [
          {
            model: Order,
            where: {
              userId: req.params.userId,
            },
            attributes: [],
          },
          {
            model: Product,
            attributes: ["id", "name", "price", "imageUrl"],
          },
        ],
        attributes: ["quantity"],
      });
      res.json(cart);
    } else {
      res.send("Access denied");
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId/:productId", async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.headers.authorization);

    if (id === +req.params.userId) {
      const product = await Order_Products.findOne({
        include: {
          model: Order,
          where: {
            userId: req.params.userId,
          },
          attributes: [],
        },
        where: {
          productId: req.params.productId,
        },
      });
      await product.destroy();
      res.json(product);
    } else {
      res.send("Access denied");
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:userId/:productId", async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.body.data.authorization);

    if (id === +req.params.userId) {
      const product = await Order_Products.findOne({
        include: {
          model: Order,
          where: {
            userId: req.params.userId,
          },
          attributes: [],
        },
        where: {
          productId: req.params.productId,
        },
      });

      await product.update({ quantity: req.body.data.newQuantity });
      console.log("done updating in db");
      res.json(product);
    } else {
      res.send("Access denied");
    }
  } catch (e) {
    next(e);
  }
});

// adding to cart in progress
router.post("/:userId/:productId", async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.headers.authorization);

    if (id === +req.params.userId) {
      const product = await Order_Products.findOne({
        include: {
          model: Order,
          where: {
            userId: req.params.userId,
          },
          attributes: [],
        },
        where: {
          productId: req.params.productId,
        },
      });

      if (product) {
        const newQuantity = product.quantity + 1;
        await product.update({ quantity: newQuantity });
        res.json(product);
      } else {
        const newEntry = await Order_Products.create({
          orderId: req.params.userId,
          productId: req.params.productId,
          quantity: 1,
        });
        res.json(newEntry);
      }

      // insert a new row into Order_Products
      // with matching userId and productId
      // and quantity 1
    } else {
      res.send("Access denied");
    }
  } catch (e) {
    next(e);
  }
});
