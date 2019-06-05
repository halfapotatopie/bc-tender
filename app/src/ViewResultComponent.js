import React from 'react';
import { Box, Typography, Container, Card, CardContent } from '@material-ui/core';
import {
    AccountData,
    ContractData,
    ContractForm
  } from "drizzle-react-components";

class ViewResultComponent extends React.Component{

    componentDidMount() {

    }

    render() {
        return(
            <div className="ViewResultComponent">
                <Box py={6} px={10}>
                    <Container>
                        <h3>Check the result here</h3>
                    </Container>
                </Box>
            </div>
        )
    }
}
export default ViewResultComponent;
