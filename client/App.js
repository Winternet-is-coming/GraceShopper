import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Navbar />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
