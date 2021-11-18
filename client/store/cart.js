import axios from "axios";
//action type
const SET_CART = "SET_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const ADD_TO_CART = "ADD_TO_CART";
const MEMBER_CHECKOUT = "MEMBER_CHECKOUT";

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

export const _addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

const _memberCheckout = (cart) => {
  return {
    type: MEMBER_CHECKOUT,
    cart,
  };
};

//thunk creator
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      let cart = [];
      if (userId !== "guest") {
        const res = await axios.get(`/api/cart/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        cart = res.data;
      } else {
        const lsCart = JSON.parse(window.localStorage.getItem("cart"));
        if (Array.isArray(lsCart)) {
          cart = lsCart;
        }
      }
      console.log(cart);
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
      dispatch(_addToCart({ ...product, id: product.productId }));
    } catch (e) {
      console.log("There was an issue with adding to cart: ", e);
    }
  };
};

export const memberCheckout = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      await axios.put(`/api/cart/${userId}`, {
        data: {
          authorization: token,
        },
      });

      // clear local storage first for guest

      dispatch(_memberCheckout([]));
    } catch (e) {
      console.log("There was an issue with member checkout: ", e);
    }
  };
};

const initialState = {
  cart: [],
  isLoading: true,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.cart, isLoading: false };
    case DELETE_FROM_CART:
      const filteredCart = state.cart.filter((cartItem) => {
        return cartItem.product.id !== action.product.productId;
      });
      return { ...state, cart: filteredCart, isLoading: false };
    case CHANGE_QUANTITY:
      const newCart = state.cart.map((cartItem) => {
        if (cartItem.product.id === action.product.productId) {
          return {
            ...cartItem,
            quantity: action.product.quantity,
          };
        }
        return cartItem;
      });
      return { ...state, cart: newCart, isLoading: false };
    case ADD_TO_CART:
      // this handles the condition when the item already exists in the cart but the quantity was updated
      let existsInCart = false;

      const updatedCart = state.cart.map((cartItem) => {
        if (cartItem.product.id === action.product.productId) {
          existsInCart = true;
          return {
            product: cartItem.product,
            quantity: action.product.quantity,
          };
        } else {
          return cartItem;
        }
      });

      // this handles the condition when the item does not already exist in the cart
      if (!existsInCart) {
        // need to return the new product along with an initial quantity of 1
        const newItem = {
          product: action.product,
          quantity: 1,
        };
        return {
          ...state,
          cart: [...state.cart, newItem],
          isLoading: false,
        };
      } else {
        return { ...state, cart: updatedCart, isLoading: false };
      }
    case MEMBER_CHECKOUT:
      // once member has checked out, reset their redux cart to an empty array
      return { ...state, cart: [], isLoading: false };
    default:
      return state;
  }
}
