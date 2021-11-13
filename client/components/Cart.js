import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import { deleteFromCart } from "../store/cart";
//UI
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ButtonGroup from "@mui/material/ButtonGroup";

import { changeQuantity } from "../store/cart";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
    this.changeQuantity = this.changeQuantity.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart.length > prevProps.cart.length) {
      this.setState({ cart: this.props.cart });
    }
  }

  handleDelete(productId) {
    this.props.deleteFromCart(
      this.props.match.params.userId,
      productId,
      this.props.history
    );
  }

  changeQuantity(productId, newQuantity, currentCart) {
    if (newQuantity === 0) {
      this.handleDelete(productId);
    } else {
      this.props.changeQuantity(
        this.props.match.params.userId,
        productId,
        newQuantity
      );
    }

    currentCart = currentCart.map((cartItem) => {
      if (cartItem.product.id === productId) {
        cartItem.quantity = newQuantity;
      }
      return cartItem;
    });

    this.setState({
      cart: currentCart,
    });
  }

  render() {
    const cart = this.state.cart || [];

    // console.log("props:", this.props);
    // console.log("cart:", cart);
    // console.log("state:", this.state);

    return (
      <div>
        {cart.map((order) => (
          <Card
            key={order.product.id}
            className="cartProductCard"
            variant="outlined"
          >
            <CardContent>
              <img src={order.product.imageUrl} style={{ width: 100 }} />
              <h4>{order.product.name}</h4>
              <p>Price: $ {order.product.price}</p>
              <p>Quantity: {order.quantity}</p>
            </CardContent>
            <CardActions>
              <Tooltip title="Delete">
                <IconButton
                  onClick={(event) => {
                    event.defaultMuiPrevented = true;
                    this.handleDelete(order.product.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <ButtonGroup>
                <Tooltip title="Decrease">
                  <Button
                    aria-label="reduce"
                    onClick={() => {
                      let newQuantity = order.quantity - 1;
                      this.changeQuantity(order.product.id, newQuantity, cart);
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                </Tooltip>
                <Tooltip title="Increase">
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      let newQuantity = order.quantity + 1;
                      this.changeQuantity(order.product.id, newQuantity, cart);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return { cart: state.cart };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (userId) => dispatch(fetchCart(userId)),
    deleteFromCart: (userId, productId, history) =>
      dispatch(deleteFromCart(userId, productId, history)),
    changeQuantity: (userId, productId, newQuantity) =>
      dispatch(changeQuantity(userId, productId, newQuantity)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
