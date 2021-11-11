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
import { B0BEC5 } from "@material-ui/core/colors";
//MUI Theme
const theme = createTheme({
  palette: {
    main: B0BEC5,
  },
});

const Navbar = ({ handleClick, isLoggedIn }) => (
  <ThemeProvider theme={theme}>
    <div>
      <h1>Oishii</h1>
      <AppBar>
        <ToolBar>
          <IconButton></IconButton>
          <Typography variant="h6">Oishii</Typography>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Button>
                <Link to="/home">Home</Link>
              </Button>
              <Button>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </Button>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Button>
                <Link to="/login">Login</Link>
              </Button>
              <Button>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
          <ShoppingCart />
        </ToolBar>
      </AppBar>

      <hr />
    </div>
  </ThemeProvider>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
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
