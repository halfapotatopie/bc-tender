import React from 'react';
import { Box, Paper, Typography, Divider } from '@material-ui/core';

export default() => (
    <div className="SubmitNounceComponent">
        <Box py={6} px={10}>            
            <Paper>
                Submit your nounce...
                <p>don't forget your nounce, or your bid cannot be revealed</p>
            </Paper>

            <p>form goes below...</p>
        </Box>
    </div>
);