import React from "react";
import { connect } from "react-redux";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

export const Home = (props) => {
  const { email } = props;

  return (
    <Container fixed>
      <CardMedia
        component="img"
        image="https://assets.epicurious.com/photos/59381e2ae468e80d4bf4d5b4/5:4/w_1300,h_1040,c_limit/Pocky.jpeg"
        height="300"
      />
      <Typography variant="h4">Welcome</Typography>
      <Divider>About Oishii</Divider>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
      <Divider>Our Products</Divider>
      <Typography variant="body2" textAlign="center">
        Product cards will go here
      </Typography>
    </Container>
  );
};

const mapState = (state) => {
  return {
    email: state.auth.email,
  };
};

export default connect(mapState)(Home);
