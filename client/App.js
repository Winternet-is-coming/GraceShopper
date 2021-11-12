import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";

import AllProducts from "./components/AllProducts";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

//Material UI
import Grid from "@material-ui/core/Grid";

import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Navbar />

      <div>
        <Grid container justifyContent="center">
          <Grid item></Grid>
        </Grid>
      </div>

      <Routes />
      <Footer />
    </div>
  );
};

export default App;
