import React from 'react';
import { Box, Paper, Typography, Divider, Button } from '@material-ui/core';
import logo from './logo.png';

class HomeComponent extends React.Component {

    render() {
        return(
            <div className = "HomeComponent">
                <Box py={6} px={10}>
                        <div>
                            <img src={logo} alt="drizzle-logo" />
                        </div>
                        <Typography variant="h3" component="h3">
                            Welcome
                        </Typography>
                        <Typography variant="h6" component="h6">
                            to Drizzle Tender App
                        </Typography>
                        <Typography component="p">
                            This is a blockchain application for tender processes!
                        </Typography>
                </Box>
        </div>
        )
    }
}
export default HomeComponent;
