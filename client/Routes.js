import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import Confirmation from "./components/Confirmation";
import EmptyCart from "./components/EmptyCart";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className="body-container">
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route path="/home" component={Home} />
            <Route exact path="/cart" component={EmptyCart} />
            <Route path="/cart/:userId" component={Cart} />
            <Route path="/confirmation" component={Confirmation} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route
              path="/cart"
              render={(props) => <Cart {...props} isLoggedIn={isLoggedIn} />}
            />
            <Route path="/confirmation" component={Confirmation} />
            <Route
              exact
              path="/products"
              render={(props) => (
                <AllProducts {...props} isLoggedIn={isLoggedIn} />
              )}
            />
            <Route
              exact
              path="/products/:id"
              render={(props) => (
                <SingleProduct {...props} isLoggedIn={isLoggedIn} />
              )}
            />
          </Switch>
        )}
      </div>
    );
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};
const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};
// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
