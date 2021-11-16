import axios from "axios";
//action type
const SET_CART = "SET_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const ADD_TO_CART = "ADD_TO_CART";

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

const _changeQuantity = (product) => {
  return {
    type: CHANGE_QUANTITY,
    product,
  };
};

const _addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

//thunk creator
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");

      const { data: cart } = await axios.get(`/api/cart/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setCART(cart));
    } catch (error) {
      console.log("Can't find your order", error);
    }
  };
};

export const deleteFromCart = (userId, productId, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");

      const { data: product } = await axios.delete(
        `/api/cart/${userId}/${productId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(_deleteFromCart(product));
    } catch (e) {
      console.log(`Can't delete this item`, e);
    }
  };
};

export const changeQuantity = (userId, productId, newQuantity) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data: product } = await axios.put(
        `/api/cart/${userId}/${productId}`,
        {
          data: {
            newQuantity,
            authorization: token,
          },
        }
      );
      dispatch(_changeQuantity(product));
    } catch (e) {
      console.log("There was an issue with changing quantity in the cart:", e);
    }
  };
};

export const addToCart = (userId, productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data: product } = await axios.post(
        `/api/cart/${userId}/${productId}`,
        {
          data: {
            authorization: token,
          },
        }
      );
      dispatch(_addToCart(product));
    } catch (e) {
      console.log("There was an issue with adding to cart: ", e);
    }
  };
};

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case DELETE_FROM_CART:
      return state.filter((cartItem) => {
        return cartItem.product.id !== action.product.productId;
      });
    case CHANGE_QUANTITY:
      const newState = state.map((cartItem) => {
        if (cartItem.product.id === action.product.productId) {
          return {
            ...cartItem,
            quantity: action.product.quantity,
          };
        }
        return cartItem;
      });
      return newState;
    case ADD_TO_CART:
      // this handles the condition when the item already exists in the cart but the quantity was updated
      let existsInCart = false;
      const updatedState = state.map((cartItem) => {
        if (cartItem.productId === action.product.productId) {
          existsInCart = true;
          return {
            ...cartItem,
            quantity: action.product.quantity,
          };
        }
      });

      // this handles the condition when the item does not already exist in the cart
      if (!existsInCart) {
        return [...state, action.product];
      }
      return updatedState;

    default:
      return state;
  }
}
