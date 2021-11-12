const router = require('express').Router();
const {
	models: {Order, Product, Order_Products},
} = require('../db');

module.exports = router;

router.get('/:userId', async (req, res, next) => {
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
					attributes: ['id', 'name', 'price', 'imageUrl'],
				},
			],
			attributes: ['quantity'],
		});
		res.json(cart);
	} catch (err) {
		next(err);
	}
});

router.get('/:userId/:productId', async (req, res, next) => {
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
		await product.destory();
		res.json(product);
	} catch (e) {
		next(e);
	}
});
