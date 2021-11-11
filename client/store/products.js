import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";
const SET_SINGLE_PRODUCT = "SET_PRODUCT";

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

const _setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products");
      dispatch(setProducts(products));
    } catch (error) {
      console.error("Trouble loading all products", error);
    }
  };
};

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(_setSingleProduct(data));
    } catch (err) {
      console.log("There was an issue with fetching a single product: ", err);
    }
  };
};

const initialState = {
  allProducts: [],
  singleProduct: {},
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.product };
    case SET_PRODUCTS:
      return { ...state, allProducts: action.products };
    default:
      return state;
  }
}
