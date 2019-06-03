import React, { Component } from 'react';
import { Box, Typography, Divider, Container, TextField, Paper, Button } from '@material-ui/core';

class SubmitNounceComponent extends React.Component {

    state = {
        nounce: 0
    }
 
    onChange= (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        return(
            <div className="SubmitNounceComponent">
                <Box py={6} px={10}>            
                    <h3>Submit your nounce</h3>
                    <Container>
                        <form>
                            <div>
                                <div className="co1-1">
                                    <TextField
                                        label="Enter nounce"
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.nounce}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-2">
                                <Button variant="contained" 
                                        color="secondary" 
                                        type="submit"
                                        value="submit" >
                                    Send
                                </Button>
                                </div>
                            </div>
                        </form>
                    </Container>
                </Box>
            </div>
        )
    }
}
export default SubmitNounceComponent