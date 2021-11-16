import React from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FeaturedSnacks from "./FeaturedSnacks";

export const Home = (props) => {
  const { email } = props;

  return (
    <div style={{ minWidth: 1200 }}>
      <Box
        sx={{
          backgroundImage: 'url("/images/sakura-bg.jpg")',
          height: 700,
          textAlign: "right",
        }}
      >
        <br />
        <Typography
          variant="h3"
          bgcolor="#ff8080"
          color="white"
          sx={{
            marginTop: 5,
            padding: 1,
            paddingRight: 5,
          }}
        >
          Welcome to Oishii
        </Typography>
        <Typography
          variant="h4"
          color="white"
          sx={{
            paddingTop: 5,
            paddingRight: 5,
          }}
        >
          adorable snacks
        </Typography>
        <Typography
          variant="h4"
          color="white"
          sx={{
            paddingTop: 3,
            paddingRight: 5,
          }}
        >
          at a delicious price
        </Typography>
      </Box>

      <Box
        sx={{
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        <Divider>Our Products</Divider>
        <FeaturedSnacks />
      </Box>

      <Box
        fixed
        sx={{
          display: "flex",
        }}
      >
        <img
          src="https://assets.epicurious.com/photos/59381e2ae468e80d4bf4d5b4/5:4/w_1300,h_1040,c_limit/Pocky.jpeg"
          style={{ width: "50%" }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 10,
            gap: 2,
          }}
        >
          <Divider>About Oishii</Divider>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Box>
      </Box>

      <Box
        fixed
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 10,
            gap: 2,
          }}
        >
          <Divider>More Info</Divider>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Box>
        <img
          src="https://images.squarespace-cdn.com/content/v1/58fd82dbbf629ab224f81b68/1561008448509-USZXYK88MYA7WQLB4RJI/Japanese-Snacks.jpg"
          style={{ width: "50%" }}
        />
      </Box>
    </div>
  );
};

const mapState = (state) => {
  return {
    email: state.auth.email,
  };
};

export default connect(mapState)(Home);
