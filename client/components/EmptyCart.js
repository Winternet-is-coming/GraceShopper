import React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";

export default function EmptyCart() {
  return (
    <Container
      fixed
      sx={{
        textAlign: "center",
        padding: 20,
      }}
    >
      <Box>Your cart is empty!</Box>
    </Container>
  );
}
