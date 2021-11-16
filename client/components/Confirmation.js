import React, { Component } from "react";
import { connect } from "react-redux";

//Material UI
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export default function Confirmation() {
  return (
    <Container alignitems="center" aligncontents="center">
      <Container justifycontent="center">
        <img src="https://itsugar.com/media/catalog/product/cache/9392bcc61c6b22792bba4834355aed07/a/s/asian_blind_box.png" />
        <br />
        <Typography variant="h2">Thank you for your purchase!</Typography>
      </Container>
    </Container>
  );
}
