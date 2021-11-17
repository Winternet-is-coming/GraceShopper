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
      // check if this user already has an open order
      // check Orders model for a matching user Id, which has a 'false' value for isFulFilled
      const order = await Order.findOne({
        where: {
          [Op.and]: [{ userId: id }, { isFulfilled: false }],
        },
      });

      // if so, send it back
      if (order) {
        const cart = await Order_Products.findAll({
          // orderId in Order_Products must match order.id
          where: {
            orderId: order.id,
          },
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
      }

      // if not, create a new order and send it back
      else {
        const newCart = await Order.create({
          userId: id,
        });
        res.json(newCart);
      }
    } else {
      // if the user id does not match the id associated with the token
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
      console.log("***PRODUCT from db:", product);
      await product.destroy();
      res.json(product);
    } else {
      res.send("Access denied");
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.body.data.authorization);

    if (id === +req.params.userId) {
      // find the order associated with this userId
      const order = await Order.findOne({
        where: {
          [Op.and]: [{ userId: id }, { isFulfilled: false }],
        },
      });

      // update the isFulfilled value of the order to 'true'
      await order.update({ isFulfilled: true });

      // send back the order
      res.json(order);
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
      res.json(product);
    } else {
      res.send("Access denied");
    }
  } catch (e) {
    next(e);
  }
});

router.post("/:userId/:productId", async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.body.data.authorization);

    if (id === +req.params.userId) {
      // find the order id associated with this user
      const order = await Order.findOne({
        where: {
          [Op.and]: [{ userId: id }, { isFulfilled: false }],
        },
      });

      // find the product which matches the productId and is associated with this user's open order
      const product = await Order_Products.findOne({
        include: {
          model: Order,
          where: {
            id: order.id,
          },
          attributes: [],
        },
        where: {
          [Op.and]: [
            {
              productId: req.params.productId,
              orderId: order.id,
            },
          ],
        },
      });

      if (product) {
        const newQuantity = product.quantity + 1;
        await product.update({ quantity: newQuantity });
        res.json(product);
      } else {
        // find the orderId associated with this user
        const order = await Order.findOne({
          where: {
            [Op.and]: [{ userId: id }, { isFulfilled: false }],
          },
        });

        // add a new product associated with this orderId
        const newEntry = await Order_Products.create({
          // orderId should === order.id
          orderId: order.id,
          productId: req.params.productId,
          quantity: 1,
        });
        res.json(newEntry);
      }
    } else {
      res.send("Access denied");
    }
  } catch (e) {
    next(e);
  }
});
