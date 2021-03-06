import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";

//MUI Components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { styled } from "@mui/material/styles";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart, fetchCart, _addToCart } from "../store/cart";

const Root = styled("div")(({ theme }) => ({
  width: "90%",
  margin: "auto",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div className="all-products">
        <Grid justifyContent="center" container spacing={1}>
          {this.props.products.allProducts.map((product) => (
            <Grid item key={product.id}>
              <Card sx={{ width: 325, padding: 5, margin: 5, height: 500 }}>
                <div>
                  <Root>
                    <Grid container justifyContent="center">
                      <Button href={`/products/${product.id}`}>
                        <CardMedia
                          sx={{ height: 255, width: 300 }}
                          component="img"
                          image={product.imageUrl}
                          alt="product-img"
                        />
                      </Button>
                      <Typography variant="h6">{product.name}</Typography>
                    </Grid>

                    <Divider />
                    <Grid container justifyContent="center">
                      <Typography variant="body2">
                        ${product.price}.00
                      </Typography>
                    </Grid>

                    <Grid container justifyContent="center">
                      <Link to={`/products/${product.id}`}>
                        <Button variant="outlined" size="small">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        aligncontent="right"
                        onClick={() => {
                          if (this.props.auth.id) {
                            this.props.addToCart(
                              this.props.auth.id,
                              product.id
                            );
                          } else {
                            this.props.addToGuestCart(product);
                          }
                        }}
                      >
                        <AddShoppingCartIcon />
                      </Button>
                      <script type="module" src="/cart.js"></script>
                    </Grid>
                  </Root>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart.cart,
    products: state.products,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addToCart: (userId, productId) => dispatch(addToCart(userId, productId)),
    fetchCart: (userId) => dispatch(fetchCart(userId)),
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

export default connect(mapState, mapDispatch)(AllProducts);
