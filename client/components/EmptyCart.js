import React, {Component} from 'react';
import Box from '@mui/material/Box';
import {Button} from '@mui/material';
export default function EmptyCart() {
	return (
		<div>
			<Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
				<img
					src="https://i1.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1"
					alt="empty cart"
				/>
			</Box>
			<Button href="/products" variant="contained">
				Go to all products
			</Button>
		</div>
	);
}