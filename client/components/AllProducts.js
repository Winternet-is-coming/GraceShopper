import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    return (
      <div>
        {this.props.products.map((product) => (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.imageUrl}</p>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return { products: state.products };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
