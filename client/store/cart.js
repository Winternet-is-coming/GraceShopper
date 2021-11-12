import axios from 'axios';
//action type
const SET_CART = 'SET_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';

//action creator
export const setCART = (cart) => {
	return {
		type: SET_CART,
		cart,
	};
};

const _deleteFromCart = (product) => {
	return {
		type: DELETE_FROM_CART,
		product,
	};
};

//thunk creator
export const fetchCart = (userId) => {
	return async (dispatch) => {
		try {
			const {data: cart} = await axios.get(`/api/cart/${userId}`);
			dispatch(setCART(cart));
		} catch (error) {
			console.log("Can't find your order", error);
		}
	};
};

export const deleteFromCart = (userId, productId, history) => {
	return async (dispatch) => {
		try {
			const product = await axios.delete(`/api/cart/${userId}/${productId}`);
			dispatch(_deleteFromCart(product));
			history.push(`/cart/${userId}`);
		} catch (e) {
			console.log(`Can't delete this item`, e);
		}
	};
};
// export const addToCart = () => {};

export default function cartReducer(state = [], action) {
	switch (action.type) {
		case SET_CART:
			return action.cart;
		case DELETE_FROM_CART:
			return state.filter((product) => product.id !== action.product.id);
		default:
			return state;
	}
}
