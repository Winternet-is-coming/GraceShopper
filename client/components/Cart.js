import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCart} from '../store/cart';
import {deleteFromCart} from '../store/cart';
import {changeQuantity} from '../store/cart';
//UI
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonGroup from '@mui/material/ButtonGroup';
import {spacing} from '@mui/system';
import Chip from '@mui/material/Chip';

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

class Cart extends Component {
	constructor() {
		super();
		this.changeQuantity = this.changeQuantity.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.props.fetchCart(this.props.match.params.userId);
	}

	handleDelete(productId) {
		this.props.deleteFromCart(
			this.props.match.params.userId,
			productId,
			this.props.history
		);
	}

	changeQuantity(productId, newQuantity) {
		if (newQuantity === 0) {
			this.handleDelete(productId);
		} else {
			this.props.changeQuantity(
				this.props.match.params.userId,
				productId,
				newQuantity
			);
		}
	}

	render() {
		const cart = this.props.cart;

		return (
			<div>
				{cart.map((order) => (
					<Card
						sx={{ml: 5, mr: 5, mt: 1, display: 'flex'}}
						key={order.product.id}
						className="cartProductCard"
						variant="outlined"
					>
						<Box sx={{width: '100%', display: 'flex', alignItem: 'center'}}>
							<CardMedia
								component="img"
								sx={{
									ml: 3,
									mt: 1,
									mr: 3,
									mb: 1,
									width: 150,
								}}
								image={order.product.imageUrl}
								alt="product image"
							/>
						</Box>
						<Box
							sx={{
								mr: 2,
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<CardContent>
								<h4>{order.product.name}</h4>
								<p>Price: $ {order.product.price / 100}</p>
								<p>Quantity: {order.quantity}</p>
							</CardContent>
							<CardActions>
								<ButtonGroup>
									<Tooltip title="Decrease">
										<Button
											aria-label="reduce"
											onClick={() => {
												order.quantity--;
												this.changeQuantity(order.product.id, order.quantity);
											}}
										>
											<RemoveIcon fontSize="small" />
										</Button>
									</Tooltip>
									<Tooltip title="Increase">
										<Button
											aria-label="increase"
											onClick={() => {
												order.quantity++;
												this.changeQuantity(order.product.id, order.quantity);
											}}
										>
											<AddIcon fontSize="small" />
										</Button>
									</Tooltip>
								</ButtonGroup>
								<Tooltip title="Delete">
									<IconButton
										sx={{ml: 2}}
										variant="outlined"
										onClick={(event) => {
											event.defaultMuiPrevented = true;
											this.handleDelete(order.product.id);
										}}
									>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							</CardActions>
						</Box>
					</Card>
				))}
				<div>
					<Card>
						<Box sx={{display: 'flex', flexDirection: 'row-reverse '}}>
							<CardContent>Total: $</CardContent>
							<Button href="/confirmation" variant="contained">
								Checkout
							</Button>
						</Box>
					</Card>
				</div>
			</div>
		);
	}
}

const mapState = (state) => {
	return {cart: state.cart};
};

const mapDispatch = (dispatch) => {
	return {
		fetchCart: (userId) => dispatch(fetchCart(userId)),
		deleteFromCart: (userId, productId, history) =>
			dispatch(deleteFromCart(userId, productId, history)),
		changeQuantity: (userId, productId, newQuantity) =>
			dispatch(changeQuantity(userId, productId, newQuantity)),
	};
};

export default connect(mapState, mapDispatch)(Cart);
