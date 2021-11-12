import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <footer>
      <Box bgcolor="#ff8080" color="white">
        <Container
          maxWidth="lg"
          sx={{
            height: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography variant="h6">♥</Typography>
          <Typography variant="body2">
            Thanks for shopping with Oishii!
          </Typography>
        </Container>
      </Box>
    </footer>
  );
}
