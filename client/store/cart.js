import axios from 'axios';

const SET_CART = 'SET_CART';

export const setCART = (cart) => {
	return {
		type: SET_CART,
		cart,
	};
};

export const fetchCart = (id) => {
	return async (dispatch) => {
		try {
			const {data: cart} = await axios.get(`/api/cart/${id}`);
			dispatch(setCART(cart));
		} catch (error) {
			console.log("Can't find your order", error);
		}
	};
};

export default function cartReducer(state = [], action) {
	switch (action.type) {
		case SET_CART:
			return action.cart;
		default:
			return state;
	}
}
