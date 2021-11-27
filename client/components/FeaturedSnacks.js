import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
//MUI Components

import { styled } from "@mui/material/styles";
import Button from "@material-ui/core/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export class FeaturedSnacks extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const products = this.props.products.allProducts || [];
    const getRandomProducts = (arr) => {
      let i = 0;
      let featuredProductArr = [];
      let memo = {};
      while (i < 4) {
        let randomIdx = Math.floor(Math.random() * arr.length);
        if (memo[randomIdx]) {
          i++;
          featuredProductArr.push(arr[randomIdx - i]);
        } else {
          i++;
          memo[randomIdx] = true;
          featuredProductArr.push(arr[randomIdx]);
        }
      }
      return featuredProductArr;
    };
    const featuredProducts = getRandomProducts(products);

    if (featuredProducts[0] === undefined) return <div>Loading...</div>;
    return (
      <div>
        <Grid justifyContent="center" container spacing={1}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id}>
              <Card sx={{ width: 325, padding: 5, margin: 5, height: 300 }}>
                <Grid container justifycontent="center">
                  <Button href={`/products/${product.id}`}>
                    <CardMedia
                      sx={{ height: 170, width: 200 }}
                      component="img"
                      image={product.imageUrl}
                      alt="product-img"
                    />
                  </Button>
                  <Typography variant="h6">{product.name}</Typography>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container justifyContent="center">
          <Link to="/products">
            <Button variant="outlined" size="small">
              View All Snacks
            </Button>
          </Link>
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

export default connect(mapState, mapDispatch)(FeaturedSnacks);
