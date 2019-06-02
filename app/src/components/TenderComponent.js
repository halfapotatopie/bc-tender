import React from 'react';
import { Box, Paper, Typography, Divider } from '@material-ui/core';
import logo from '../logo.png';

export default() => (
    <div className = "TenderComponent">
        <Box py={6} px={10}>
            <Paper className="paper"> 
                <div>
                    <img src={logo} alt="drizzle-logo" />
                </div>
                <Typography variant="h3" component="h3">
                    Welcome 
                </Typography>
                <Typography variant="h6" component="h6">
                    to Drizzle Tender App
                </Typography>
                <Divider />
                <Typography component="p">
                    This is a blockchain application to manage your tenders
                </Typography>
            </Paper>
        </Box>
    </div>
);