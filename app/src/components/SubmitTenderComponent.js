import React from 'react';
import { Box, Paper, Typography, Divider } from '@material-ui/core';

export default() => (
    <div className="SubmitTenderComponent">
        <Box py={6} px={10}>
            Bidding is now: <b>open</b>
            
            <Paper>
                <p>Fill up this form to submit your tender bid</p>
                <p><b>Do not forget your nounce!</b></p>
                <p>Note that we are not able to retrieve your nounce should you forget it and your bid will be considered forfeited</p>
            </Paper>

            <p>form goes below...</p>
        </Box>
    </div>
);