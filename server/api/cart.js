const router = require("express").Router();
const {
  models: { Order, Product, Order_Products },
} = require("../db");

module.exports = router;

router.get("/:userId", async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId/:productId", async (req, res, next) => {
  try {
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
  } catch (e) {
    next(e);
  }
});

router.post("/:userId/:productId", async (req, res, next) => {
  try {
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
  } catch (e) {
    next(e);
  }
});
