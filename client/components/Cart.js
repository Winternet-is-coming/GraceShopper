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

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart(this.props.match.params.userId);
  }

  render() {
    const cart = this.props.cart;

    console.log("cart:", cart);

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
                  onClick={() => this.props.deleteFromCart(order.product.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <ButtonGroup>
                <Tooltip title="Decrease">
                  <Button aria-label="reduce">
                    <RemoveIcon fontSize="small" />
                  </Button>
                </Tooltip>
                <Tooltip title="Increase">
                  <Button aria-label="increase">
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
    deleteFromCart: (userId, productId) =>
      dispatch(deleteFromCart(userId, productId, history)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
