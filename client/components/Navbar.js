import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

//Material UI
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles({
  header: {
    backgroundColor: "pink",
    margin: 0,
  },
  tool: {
    flexGrow: 1,
  },
  logo: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
});

function Navbar({ handleClick, isLoggedIn, auth }) {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline>
        <AppBar position="sticky" className={classes.header}>
          <ToolBar>
            <Link to="/home" className={classes.logo}>
              <img
                src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/15849/giant-panda-taiyaki-clipart-md.png"
                className={classes.logo}
              />
            </Link>
            <Typography variant="h6" className={classes.tool}>
              Oishii
            </Typography>
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Button color="inherit" href="/products">
                  Snacks
                </Button>
                <Button color="inherit" href="/home">
                  Home
                </Button>
                <Button color="inherit" href="#" onClick={handleClick}>
                  {/* <a href="#" onClick={handleClick}> */}
                  Logout
                  {/* </a> */}
                </Button>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Button color="inherit" href="/products">
                  Snacks
                </Button>
                <Button color="inherit" href="/home">
                  Home
                </Button>
                <Button color="inherit" href="/login">
                  Login
                </Button>
                <Button color="inherit" href="/signup">
                  Sign Up
                </Button>
              </div>
            )}
            <Button color="inherit" href={`/cart/${auth.id}`}>
              <ShoppingCart />
            </Button>
          </ToolBar>
        </AppBar>
      </CssBaseline>
    </div>
  );
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
