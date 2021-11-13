import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
// import ricebowl from "../assets/logo.png";

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

function Navbar({ handleClick, isLoggedIn }) {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline>
        <AppBar position="sticky" className={classes.header}>
          <ToolBar>
            <Link to="/" className={classes.logo}>
              <img
                src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/15849/giant-panda-taiyaki-clipart-md.png"
                className={classes.logo}
              />
            </Link>
            {/* <img src={ricebowl} alt="logo" className={classes.logo} /> */}
            <Typography variant="h6" className={classes.tool}>
              Oishii
            </Typography>
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
