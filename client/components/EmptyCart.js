import React, {Component} from 'react';
import Box from '@mui/material/Box';
import {Button} from '@mui/material';
export default function EmptyCart() {
	return (
		<div>
			<Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
				<h1>Oh no! Your cart looks very sad at the moment...</h1>
			</Box>
			<Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
				<img
					src="https://i1.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1"
					alt="empty cart"
				/>
			</Box>
			<Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
				<Button href="/products" variant="contained">
					Checkout our awsome collection
				</Button>
			</Box>
		</div>
	);
}
