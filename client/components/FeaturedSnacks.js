import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import AllProducts from "./AllProducts";

//MUI Components
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export class FeaturedSnacks extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    return (
      <Card sx={{ width: 325, padding: 5, margin: 5, height: 500 }}>
        <CardHeader title="Shrimp and Chorizo Paella" />
        <CardMedia
          component="img"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
        {/* <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing> */}
        {/* <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon /> */}
        {/* </ExpandMore> */}
        {/* </CardActions>
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
        {/* <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>direction</Typography>
          <Typography paragraph>direction</Typography>
          <Typography paragraph>direction</Typography>
          <Typography>direction</Typography>
        </CardContent> */}
        {/* </Collapse> */}
      </Card>
    );
  }
}

const mapState = (state) => {
  return { products: state.products };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(FeaturedSnacks);
