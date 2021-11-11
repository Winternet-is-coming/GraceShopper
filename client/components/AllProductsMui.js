import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import { IconButton } from "@material-ui/core";
import { DeleteOutlined } from "@mui/icons-material";
import AllProducts from "../components/AllProducts";
import Typography from "@material-ui/core/Typography";

//fonts
//import "fontsource-roboto";

export default function AllProductsMui({ product }) {
  return (
    <div>
      <Typography variant="h2">Snacks</Typography>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            <IconButton>
              <DeleteOutlined />
            </IconButton>
          }
          // title={project.name}
        />
      </Card>
      <script>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </script>
    </div>
  );
}
