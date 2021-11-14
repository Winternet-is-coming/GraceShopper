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
      <Container fixed>
        <div className="single-product-container">
          <Card sx={{ width: 550, minWidth: 300, minHeight: 400, padding: 5 }}>
            <Root>
              <Typography variant="h4">{product.name}</Typography>
              <Divider>Product Details</Divider>
              <Typography variant="body2">{product.description}</Typography>
              <Divider />
              <Typography variant="body2">$ {product.price}</Typography>
              <Box textAlign="center">
                <Button variant="contained">Add to Cart</Button>
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
    product: state.products.singleProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
