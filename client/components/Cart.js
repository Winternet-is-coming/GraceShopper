import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteFromCart } from "../store/cart";
import { changeQuantity } from "../store/cart";
import { memberCheckout } from "../store/cart";
import { fetchCart, setCART } from "../store/cart";
//UI

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@material-ui/core/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ButtonGroup from "@mui/material/ButtonGroup";
import EmptyCart from "./EmptyCart";
import PageNotFound from "./PageNotFound";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

class Cart extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.fetchCart(this.props.match.params.userId);
    } else {
      this.props.fetchCart("guest");
    }
  }

  componentDidUpdate(newProps) {
    if (newProps.isLoggedIn && newProps.cart !== this.props.cart) {
      this.props.fetchCart(this.props.match.params.userId);
    }
  }

  handleDelete(productId) {
    if (this.props.auth.id) {
      this.props.deleteFromCart(
        this.props.match.params.userId,
        productId,
        this.props.history
      );
    } else {
      this.props.deleteFromGuestCart(productId);
    }
  }
  changeQuantity(productId, newQuantity) {
    if (newQuantity === 0) {
      this.handleDelete(productId);
    } else {
      // update quantity in db
      this.props.changeQuantity(
        this.props.match.params.userId,
        productId,
        newQuantity
      );
    }
  }

  render() {
    console.log(this.props.isLoggedIn);
    console.log("id", this.props.auth.id);
    const cart = this.props.cart || [];
    const authId = this.props.auth.id;
    const { userId } = this.props.match.params;
    // const subTotal = cart
    // 	.map((order) => order.product.price * order.quantity)
    // 	.reduce((prev, curr) => prev + curr, 0);
    // const totalItems = cart
    // 	.map((order) => order.quantity)
    // 	.reduce((prev, curr) => prev + curr, 0);

    if (this.props.isLoading)
      return (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      );

    if (authId && authId !== +userId) {
      // if there is an authId and it does not match id in URL
      // (a user is logged in but does not own this cart)
      return <PageNotFound />;
    } else {
      // if the authId does match
      return (
        <div>
          {cart.length ? (
            cart.map((order) => (
              <Card
                sx={{ ml: 5, mr: 5, mt: 1, display: "flex" }}
                key={order.product.id}
                className="cartProductCard"
                variant="outlined"
              >
                <Box
                  sx={{ width: "100%", display: "flex", alignItem: "center" }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      ml: 3,
                      mt: 1,
                      mr: 3,
                      mb: 1,
                      width: 150,
                    }}
                    image={order.product.imageUrl}
                    alt="product image"
                  />
                </Box>
                <Box
                  sx={{
                    mr: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent>
                    <h4>{order.product.name}</h4>
                    <p>Price: $ {order.product.price}</p>
                    <p>Quantity: {order.quantity}</p>
                  </CardContent>
                  <CardActions>
                    <ButtonGroup>
                      <Tooltip title="Increase">
                        <Button
                          aria-label="increase"
                          onClick={() => {
                            let newQuantity = order.quantity + 1;
                            if (this.props.auth.id) {
                              this.changeQuantity(
                                order.product.id,
                                newQuantity
                              );
                            } else {
                              this.props.changeGuestQuantity(
                                order.product.id,
                                newQuantity
                              );
                            }
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Decrease">
                        <Button
                          aria-label="reduce"
                          onClick={() => {
                            let newQuantity = order.quantity - 1;
                            if (this.props.auth.id) {
                              this.changeQuantity(
                                order.product.id,
                                newQuantity
                              );
                            } else {
                              this.props.changeGuestQuantity(
                                order.product.id,
                                newQuantity
                              );
                            }
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </Button>
                      </Tooltip>
                    </ButtonGroup>
                    <Tooltip title="Delete">
                      <IconButton
                        sx={{ ml: 2 }}
                        onClick={() => {
                          this.handleDelete(order.product.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Box>
              </Card>
            ))
          ) : (
            <EmptyCart />
          )}
          <div>
            <Card
              sx={{
                ml: 5,
                mr: 5,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  mr: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Typography variant="h5">
                    Subtotal (
                    {cart
                      .map((order) => order.quantity)
                      .reduce((prev, curr) => prev + curr, 0)}{" "}
                    items): $
                    {cart
                      .map((order) => order.product.price * order.quantity)
                      .reduce((prev, curr) => prev + curr, 0)}
                  </Typography>
                </CardContent>
                <Button
                  // href="/confirmation"
                  variant="contained"
                  onClick={() => {
                    this.props.memberCheckout(this.props.auth.id);
                  }}
                >
                  Checkout
                </Button>
              </Box>
            </Card>
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    cart: state.cart.cart,
    auth: state.auth,
    isLoading: state.cart.isLoading,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (userId) => dispatch(fetchCart(userId)),
    deleteFromCart: (userId, productId, history) =>
      dispatch(deleteFromCart(userId, productId, history)),
    changeQuantity: (userId, productId, newQuantity) =>
      dispatch(changeQuantity(userId, productId, newQuantity)),
    memberCheckout: (userId) => dispatch(memberCheckout(userId)),
    setCart: (cart) => dispatch(setCART(cart)),
    deleteFromGuestCart: (productId) => {
      let lsCart = JSON.parse(window.localStorage.getItem("cart"));
      if (Array.isArray(lsCart)) {
        lsCart = lsCart.filter((order) => order.product.id !== productId);
        window.localStorage.setItem("cart", JSON.stringify(lsCart));
      }
      dispatch(setCART(lsCart));
    },
    changeGuestQuantity: (productId, newQuantity) => {
      let lsCart = JSON.parse(window.localStorage.getItem("cart"));
      if (Array.isArray(lsCart)) {
        if (newQuantity <= 0) {
          lsCart = lsCart.filter((order) => order.product.id !== productId);
        } else {
          lsCart.forEach((order) => {
            if (order.product.id === productId) {
              order.quantity = newQuantity;
            }
          });
        }
        window.localStorage.setItem("cart", JSON.stringify(lsCart));
      }
      dispatch(setCART(lsCart));
    },
  };
};

export default connect(mapState, mapDispatch)(Cart);
