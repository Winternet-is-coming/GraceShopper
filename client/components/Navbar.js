import React, { useEffect } from "react";
import { connect, useSelector, useDispatch, useStore } from "react-redux";
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
import { fetchCart } from "../store/cart";
import Badge from "@material-ui/core/Badge";
import { styled } from "@mui/system";
import { BadgeUnstyled } from "@mui/core";

const useStyles = makeStyles({
  header: {
    backgroundColor: "#ff8080",
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

const StyledBadge = styled(BadgeUnstyled)`
  .MuiBadge-badge {
    z-index: auto;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: #008ebd;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #fff;
  }
`;

function Navbar(props) {
  const classes = useStyles();
  const { handleClick, isLoggedIn, auth, cart, fetchCart } = props;

  const id = auth.id || 0;

  useEffect(() => {
    if (id > 0) {
      fetchCart(auth.id);
    }
  }, [id]);

  console.log("cart from navbar:", cart);
  console.log("cart length:", cart.length);

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
                <Button color="inherit" href="/home">
                  Home
                </Button>
                <Button color="inherit" href="/products">
                  Snacks
                </Button>

                <Button color="inherit" href="#" onClick={handleClick}>
                  {/* <a href="#" onClick={handleClick}> */}
                  Logout
                  {/* </a> */}
                </Button>
                <Button color="inherit" href={`/cart/${auth.id}`}>
                  {cart.length > 0 ? (
                    <StyledBadge
                      badgeContent={cart.length}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <ShoppingCart />
                    </StyledBadge>
                  ) : (
                    <ShoppingCart />
                  )}
                </Button>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Button color="inherit" href="/home">
                  Home
                </Button>
                <Button color="inherit" href="/products">
                  Snacks
                </Button>
                <Button color="inherit" href="/login">
                  Login
                </Button>
                <Button color="inherit" href="/signup">
                  Sign Up
                </Button>
                <Button color="inherit" href={"/cart"}>
                  {cart.length > 0 ? (
                    <StyledBadge
                      badgeContent={cart.length}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <ShoppingCart />
                    </StyledBadge>
                  ) : (
                    <ShoppingCart />
                  )}
                </Button>
              </div>
            )}
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
    cart: state.cart.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    fetchCart: (userId) => dispatch(fetchCart(userId)),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
