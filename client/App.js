import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Button from "@material-ui/core/Button";
//import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";

const App = () => {
  return (
    //<Router>
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Navbar />
      {/* <Button variant="contained">View all snacks</Button> */}
      <Routes />
      <Footer />
    </div>
    //</Router>
  );
};

export default App;
