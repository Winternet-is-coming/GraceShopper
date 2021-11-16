import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import AllProducts from "./AllProducts";
//MUI Components

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
    console.log(this.props);
    const products = this.props.products.allProducts || [];
    const getRandomProduct = (arr) => {
      const randomId = Math.floor(Math.random() * arr.length)
      return arr[randomId]
    }
    const featuredProducts = [getRandomProduct(products), getRandomProduct(products), getRandomProduct(products), getRandomProduct(products)]
    console.log(featuredProducts)

    return (
      <div>
        <Grid justifyContent="center" container spacing={0.5}>
        {featuredProducts.map((product) => (
          <Card sx={{ width: 325, padding: 5, margin: 5, height: 500 }}>
            <CardHeader title={product.name} />
            <CardMedia component="img" image={product.imageUrl} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
          </Card>
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

export default connect(mapState, mapDispatch)(FeaturedSnacks);
