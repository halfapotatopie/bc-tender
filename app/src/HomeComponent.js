import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { styled } from '@material-ui/styles';
// import logo from './logo.png';
import logo from './tender(small).png';

const displayText = "This is a blockchain application for tender processes!";

class HomeComponent extends React.Component {

    render() {
        const MyButton = styled(Button)({
            background: 'linear-gradient(30deg, #ff4081 30%, #448aff 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
            align: "center",
          });

        return(
            <div className = "HomeComponent">
                <Box py={8} px={10}>
                        <div>
                            <img src={logo} alt="drizzle-logo" />
                        </div><br/>
                        <Typography variant="h3" component="h3">
                            Welcome
                        </Typography>
                        <Typography variant="h6" component="h6">
                            to Tender App
                        </Typography>
                        <Typography component="p">
                            {displayText}
                        </Typography>
                        <br/><br/>
                        <MyButton href='/bid'>
                            Submit A Bid
                        </MyButton>
                </Box>
        </div>
        )
    }
}

export default HomeComponent;
