import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCart} from '../store/cart';

class Cart extends Component {
	componentDidMount() {
		console.log('this.props', this.props);
		this.props.fetchCart(this.props.match.params.id);
	}

	render() {
		// return (
		// 	// <div>
		// 	// 	{this.props.cart.map((product) => (
		// 	// 		<div key={product.id}>
		// 	// 			<h1>{product.name}</h1>
		// 	// 			<img src={product.imageUrl} style={{width: 300}} />
		// 	// 			<p>{product.price}</p>
		// 	// 			<p>{product.quantity}</p>
		// 	// 		</div>
		// 	// 	))}
		// 	// </div>
		// );
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
