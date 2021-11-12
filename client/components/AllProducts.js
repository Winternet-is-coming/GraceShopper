import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import AllCards from "./AllCards";

//MUI Components
import Container from "@material-ui/core/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { styled } from "@mui/material/styles";
import Grid from "@material-ui/core/Grid";

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
    console.log(this.props.products);
    return (
      <Container>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={5}
        >
          <div className="all-products">
            {this.props.products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card sx={{ minWidth: 300, padding: 5, margin: 5 }}>
                  <div>
                    <Root>
                      <CardMedia
                        sx={{ minHeight: 300, minWidth: 150 }}
                        component="img"
                        height="400"
                        image={product.imageUrl}
                        alt="product-img"
                      />
                      <Typography variant="h4">{product.name}</Typography>

                      <CardContent>
                        <Typography variant="body2">
                          {product.description}
                        </Typography>
                      </CardContent>
                      <Divider />
                      <Typography variant="body2">{product.price}</Typography>
                      <Box textAlign="center">
                        <Button variant="contained">Add to Cart</Button>
                      </Box>
                    </Root>
                  </div>
                </Card>
              </Grid>
            ))}
          </div>
        </Grid>
      </Container>
    );
  }
}

const mapState = (state) => {
  return { products: state.products.allProducts };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
