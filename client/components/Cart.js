import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCart} from '../store/cart';
import {deleteFromCart} from '../store/cart';
//UI
import IconButton from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

class Cart extends Component {
	componentDidMount() {
		this.props.fetchCart(this.props.match.params.userId);
	}

	render() {
		const cart = this.props.cart;

		return (
			<div>
				{cart.map((order) => (
					<Card className="cartProductCard" variant="outlined">
						<CardContent key={cart.id}>
							<img src={order.product.imageUrl} style={{width: 100}} />
							<h4>{order.product.name}</h4>
							<p>Price:{order.product.price}</p>
							<p>Quantity:{order.quantity}</p>
						</CardContent>
						<CardActions>
							<Tooltip title="Delete">
								<IconButton
									onClick={() => this.props.deleteFromCart(order.product.id)}
								>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						</CardActions>
					</Card>
				))}
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
	};
};

export default connect(mapState, mapDispatch)(Cart);
