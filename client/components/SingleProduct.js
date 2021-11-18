import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/products";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { addToCart, fetchCart, _addToCart } from "../store/cart";

const Root = styled("div")(({ theme }) => ({
  width: "90%",
  margin: "auto",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  render() {
    const { product } = this.props;

    return (
      <Container fixed sx={{ marginTop: 20 }}>
        <div className="single-product-container">
          <Card sx={{ width: 550, minWidth: 300, minHeight: 400, padding: 5 }}>
            <Root>
              <Typography variant="h4">{product.name}</Typography>
              <Divider>Product Details</Divider>
              <Typography variant="body2">{product.description}</Typography>
              <Divider />
              <Typography variant="body2">$ {product.price}</Typography>
              <Box textAlign="center">
                <Button
                  variant="contained"
                  onClick={() => {
                    if (this.props.auth.id) {
                      this.props.addToCart(this.props.auth.id, product.id);
                    } else {
                      this.props.addToGuestCart(product);
                    }
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Root>
          </Card>

          <img
            src={product.imageUrl}
            style={{ maxWidth: 600, maxHeight: 500 }}
          />
        </div>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart.cart,
    product: state.products.singleProduct,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(fetchSingleProduct(id)),
    fetchCart: (userId) => dispatch(fetchCart(userId)),
    addToCart: (userId, productId) => dispatch(addToCart(userId, productId)),
    addToGuestCart: (product) => {
      let lsCart = JSON.parse(window.localStorage.getItem("cart"));
      if (Array.isArray(lsCart)) {
        let updated = false;
        lsCart.forEach((order) => {
          if (order.product.id === product.id) {
            order.quantity++;
            updated = true;
          }
        });
        if (!updated) {
          lsCart.push({ product, quantity: 1 });
        }
      } else {
        lsCart = [{ product, quantity: 1 }];
      }
      window.localStorage.setItem("cart", JSON.stringify(lsCart));
      dispatch(_addToCart(product));
    },
  };
};
export default connect(mapState, mapDispatch)(SingleProduct);
