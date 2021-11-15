import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import { deleteFromCart } from "../store/cart";
import { changeQuantity } from "../store/cart";
//UI

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonGroup from '@mui/material/ButtonGroup';
import EmptyCart from './EmptyCart';
import PageNotFound from './PageNotFound';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';


<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;
class Cart extends Component {
	constructor() {
		super();
		this.state = {
			cart: [],
		};
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
			// update quantity in db
			this.props.changeQuantity(
				this.props.match.params.userId,
				productId,
				newQuantity
			);
		}
	}
	render() {
		const cart = this.props.cart || [];
		const authId = this.props.auth.id;
		const {userId} = this.props.match.params;
		// const subTotal = cart.map((order) => order.product.price * order.quantity);
		// const total = subTotal.reduce((prev, curr) => prev + curr, 0);

		if (authId && authId !== +userId) {
			// if there is an authId and it does not match id in URL
			// (a user is logged in but does not own this cart)
			return <PageNotFound />;
		} else if (authId) {
			// if the authId does match
			return (
				<div>
					{cart.length ? (
						cart.map((order) => (
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
										<p>Price: $ {order.product.price}</p>
										<p>Quantity: {order.quantity}</p>
									</CardContent>
									<CardActions>
										<ButtonGroup>
											<Tooltip title="Increase">
												<Button
													aria-label="increase"
													onClick={() => {
														let newQuantity = order.quantity + 1;
														this.changeQuantity(order.product.id, newQuantity);
													}}
												>
													<AddIcon fontSize="small" />
												</Button>
											</Tooltip>
											<Tooltip title="Decrease">
												<Button
													aria-label="reduce"
													onClick={() => {
														let newQuantity = order.quantity - 1;
														this.changeQuantity(order.product.id, newQuantity);
													}}
												>
													<RemoveIcon fontSize="small" />
												</Button>
											</Tooltip>
										</ButtonGroup>
										<Tooltip title="Delete">
											<IconButton
												sx={{ml: 2}}
												onClick={() => {
													this.handleDelete(order.product.id);
												}}
											>
												<DeleteIcon />
											</IconButton>
										</Tooltip>
									</CardActions>
								</Box>
							</Card>
						))
					) : (
						<EmptyCart />
					)}
					<div>
						<Card>
							<Box sx={{display: 'flex', flexDirection: 'row-reverse '}}>
								<CardContent>
									Total: $
									{cart
										.map((order) => order.product.price * order.quantity)
										.reduce((prev, curr) => prev + curr, 0)}
								</CardContent>
								<Button href="/confirmation" variant="contained">
									Checkout
								</Button>
							</Box>
						</Card>
					</div>
				</div>
			);
		} else {
			// if there is no authId (not logged in)
			return <PageNotFound />;
		}
	}
}
const mapState = (state) => {

  return {
    cart: state.cart,
    auth: state.auth,
  };
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
