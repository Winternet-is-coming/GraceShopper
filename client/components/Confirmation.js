import React, { Component } from "react";
import { connect } from "react-redux";

//Material UI
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ef9a9a",
    },
    secondary: {
      main: "#f9c8d9",
    },
  },
});

const useStyles = makeStyles({
  thankYouImg: {
    justifycontent: "center",
    height: 400,
    paddingLeft: 450,
    paddingTop: 125,
  },
  imgContainer: {
    width: "100%",
  },
  thankYouText: {
    paddingLeft: 225,
  },
  buyMoreButton: {
    paddingLeft: 460,
  },
});

export default function Confirmation() {
  const classes = useStyles();

  return (
    <Container>
      <Container justifycontent="center" className={classes.imgContainer}>
        <img
          src="https://c.tenor.com/WaQ9Avqbp38AAAAi/kikicat-kikiapp.gif"
          className={classes.thankYouImg}
        />

        <br />
        <Typography variant="h2" className={classes.thankYouText}>
          Your snacks are on the way!
        </Typography>
        <ThemeProvider theme={theme}>
          <div className={classes.buyMoreButton}>
            <Button color="secondary" variant="contained" href="/products">
              {" "}
              Buy More Yummy Snacks
            </Button>
          </div>
        </ThemeProvider>
      </Container>
    </Container>
  );
}
