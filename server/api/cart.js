const router = require('express').Router();
const {
	models: {Order, Product},
} = require('../db');

module.exports = router;

router.get('/:id', async (req, res, next) => {
	try {
		const cart = await Order.findAll({
			include: {model: Product},
			where: {
				userId: req.params.id,
			},
		});
		res.json(cart);
	} catch (err) {
		next(err);
	}
});
