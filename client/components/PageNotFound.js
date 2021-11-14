import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function PageNotFound() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "gray",
        height: "500",
        textAlign: "center",
        marginTop: 20,
        padding: 30,
      }}
    >
      <Typography variant="h2" color="white">
        Oops!
      </Typography>
      <Typography variant="h4" color="white">
        It looks like that page doesn't exist.
      </Typography>
    </Box>
  );
}
