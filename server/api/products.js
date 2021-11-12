const router = require("express").Router();
const { requireToken, isAdmin } = require('./gateKeepingMiddleware')
const {
  models: { Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const { name, price, quantity, description, imageUrl } = req.body
    res.send(await Product.create({
      name: name,
      price: price,
      quantity: quantity,
      description: description,
      imageUrl: imageUrl
    }));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const { name, price, quantity, description, imageUrl } = req.body
    res.send(await product.update({
      name: name,
      price: price,
      quantity: quantity,
      description: description,
      imageUrl: imageUrl
    }));
  } catch (error) {
    next(error);
  }
});
