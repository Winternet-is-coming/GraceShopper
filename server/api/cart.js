const router = require('express').Router();
const {
	models: {Order, Product, Order_Products},
} = require('../db');

module.exports = router;

router.get('/:id', async (req, res, next) => {
	try {
		const cart = await Order_Products.findAll({
			include: [
				{
					model: Order,
					where: {
						userId: req.params.id,
					},
					attributes: [],
				},
				{
					model: Product,
					attributes: ['name', 'price', 'imageUrl'],
				},
			],
			attributes: ['quantity'],
		});
		res.json(cart);
	} catch (err) {
		next(err);
	}
});
