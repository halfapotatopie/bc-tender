import React from 'react';
import { Box, Paper, Typography, Divider } from '@material-ui/core';

export default() => (
    <div className="ViewResultsComponent">
        <Box py={6} px={10}>            
            <Paper>
                <p>check your bidding results here</p>
                <p>upon release of successful bid, your deposit will be refunded to you</p>
            </Paper>

            <p>form goes below...</p>
        </Box>
    </div>
);