import React, { Component } from "react";
import { connect } from "react-redux";

//Material UI
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

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
      </Container>
    </Container>
  );
}
