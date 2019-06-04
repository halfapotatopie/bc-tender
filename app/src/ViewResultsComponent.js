import React from 'react';
import { Box, Typography, Container, Card, CardContent } from '@material-ui/core';
import {
    AccountData,
    ContractData,
    ContractForm,
  } from "drizzle-react-components";

class ViewResultsComponent extends React.Component{

    componentDidMount() {
        
    }

    render() {
        return(
            <div className="ViewResultsComponent">
                <Box py={6} px={10}>            
                    <Container>
                        <h3>Check your results here</h3>
                    </Container>
                </Box>
            </div>
        )
    }
}
export default ViewResultsComponent