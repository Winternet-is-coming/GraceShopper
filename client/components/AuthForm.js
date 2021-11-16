import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../store";

//MUI Components
//import Container from "@material-ui/core/Container";
import Card from "@mui/material/Card";
//import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
//import Box from "@mui/material/Box";
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

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  // console.log(props)
  if (props.name === "signup") {
    return (
      <div>
        <Card sx={{ width: 325, padding: 5, margin: 5, height: 300 }}>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
          <div>
            <label htmlFor="password">
            <small>Already have an account? Login <Link to="/login">here</Link>.</small>
            </label>
          </div>
        </form>
        </Card>
      </div>
    );
  } else {

      return (
        <div>
          <Card sx={{ width: 325, padding: 5, margin: 5, height: 300 }}>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
            <div>
              <button type="submit">{displayName}</button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
            <div>
              <label htmlFor="password">
              <small>Don't have an account? <Link to="/signup">Sign up!</Link></small>
              </label>
            </div>
          </form>
          </Card>
        </div>
      )
    }
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
