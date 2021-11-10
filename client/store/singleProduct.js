import axios from "axios";

const SET_PRODUCT = "SET_PRODUCT";

const _setProduct = (product) => {
  return {
    type: SET_PRODUCT,
    product,
  };
};

export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(_setProduct(data));
    } catch (err) {
      console.log("There was an issue with fetching a single product: ", err);
    }
  };
};

export default function singleProductReducer(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
