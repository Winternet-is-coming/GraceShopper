import React from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../store/products';
import {Link} from 'react-router-dom';
import AllProducts from './AllProducts';
//MUI Components

import {styled} from '@mui/material/styles';
import Button from '@material-ui/core/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
	const {expand, ...other} = props;
	return <IconButton {...other} />;
})(({theme, expand}) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

export class FeaturedSnacks extends React.Component {
	componentDidMount() {
		this.props.fetchProducts();
	}

  render() {
    const products = this.props.products.allProducts || [];
    const getRandomProducts = (arr) => {
      let i = 0
      let featuredProductArr = [];
      while (i < 4) {
        let randomIdx = Math.floor(Math.random() * arr.length)
        if (arr[randomIdx] in featuredProductArr) {
          i++
        } else {
          i++
          featuredProductArr.push(arr[randomIdx])
        }
      }
      return featuredProductArr;
    }
    const featuredProducts = getRandomProducts(products)
    console.log(featuredProducts)

    if (featuredProducts[0] === undefined) return <div>Loading...</div>
    return (
      <div>
        <Grid justifyContent="center" container spacing={1}>
        {featuredProducts.map((product) => (
          <Grid item key={product.id}>
            <Card sx={{ width: 325, padding: 5, margin: 5, height: 300 }}>
              <Grid container justifyContent="center">
                <Button href={`/products/${product.id}`}>
                  <CardMedia
                    sx={{ height: 170, width: 200 }}
                    component="img"
                    image={product.imageUrl}
                    alt="product-img"
                  />
                </Button>
                <Typography variant="h6">{product.name}</Typography>
              </Grid>
          </Card>
          </Grid>
        ))}
        </Grid>
        <Grid container justifyContent="center">
          <Link to='/products'>
            <Button variant="outlined" size="small" justifyContent="center">
                View All Snacks
            </Button>
          </Link>
        </Grid>
      </div>
    );
  }

}

const mapState = (state) => {
	return {products: state.products};
};

const mapDispatch = (dispatch) => {
	return {
		fetchProducts: () => dispatch(fetchProducts()),
	};
};

export default connect(mapState, mapDispatch)(FeaturedSnacks);
