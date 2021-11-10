import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  render() {
    const { product } = this.props;

    return (
      <div className="single-product-container">
        <img src={product.imageUrl} style={{ width: 300 }} />
        <div className="single-product-details">
          <p>{product.name}</p>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button>Add to Cart</button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
