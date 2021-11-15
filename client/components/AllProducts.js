import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";

//MUI Components
//import Container from "@material-ui/core/Container";
import Card from "@mui/material/Card";
//import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
//import Box from "@mui/material/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { styled } from "@mui/material/styles";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

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
                      <CardMedia
                        sx={{ height: 255, width: 300 }}
                        component="img"
                        image={product.imageUrl}
                        alt="product-img"
                      />
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
                      {/* <Box alignContent="center"> */}
                      <Button aligncontent="right" href="/cart/userId">
                        <AddShoppingCartIcon />
                      </Button>
                      <script type="module" src="/cart.js"></script>
                      {/* </Box> */}
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
  return { products: state.products };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
