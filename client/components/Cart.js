import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCart} from '../store/cart';

class Cart extends Component {
	componentDidMount() {
		this.props.fetchCart(this.props.match.params.id);
	}

	render() {
		const cart = this.props.cart;

		return (
			<div>
				{cart.map((order) => (
					<div key={order.id}>
						<h1>{order.product.name}</h1>
						<img src={order.product.imageUrl} style={{width: 300}} />
						<p>{order.product.price}</p>
						<p>{order.quantity}</p>
					</div>
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
		fetchCart: (id) => dispatch(fetchCart(id)),
	};
};

export default connect(mapState, mapDispatch)(Cart);
