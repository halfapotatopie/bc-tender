import React from 'react';
import { Box, Paper, Typography, Divider, Button } from '@material-ui/core';
import logo from './logo.png';

class TenderComponent extends React.Component {
    
    constructor (props) {
        super(props)

        this.state = {
            currentPhase: ''
        }

        this.getPhase = this.getPhase.bind(this)
    }

    getPhase() {
        const {getPhase} = this.props.state.contracts.Tender

        getPhase ((err, phase) => {
            if (err) console.error ('An error occured::::', err);
            console.log ('Phase::::', phase);
            this.setState({currentPhase: phase})
        })
    }

    render() {
        return(
            <div className = "TenderComponent">
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
                        This is a blockchain application to manage your tenders
                    </Typography>
                </Box>
        </div>
        )
    }
}
export default TenderComponent
