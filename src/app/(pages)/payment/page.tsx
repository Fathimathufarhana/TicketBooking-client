// pages/checkout.tsx

import Payment from '@/components/payment/payment';
import { Box, Typography } from '@mui/material';
import React from 'react';

const Checkout: React.FC = () => (
    <Box>
        <Typography variant='h4' textAlign='center' padding='20px 0'>Checkout</Typography>
        <Payment />
    </Box>
);

export default Checkout;
