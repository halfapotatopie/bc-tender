import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Divider, Container, TextField, Paper, Button } from '@material-ui/core';
import {
    AccountData,
    ContractData,
    ContractForm,
} from "drizzle-react-components";

const API = 'http://localhost:3000/bid'

class SubmitBidComponent extends React.Component {

    state = {
        bid: {
            nounce: 0,
            bidAmt: 0,
        }
    }

    componentDidMount() {
        
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    addBid = (nounce, bidAmt) => {
        const newBid = {
          nounce, 
          bidAmt
        }
        this.setState({ bid: [newBid] });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.addBid(this.state.bidAmt, this.state.nounce)
        this.setState({bidAmt: '', nounce: ''}) //set bid back to nothing after submitted
    }
    
    //code to push state to HashGenerator contract

    render() {
        return(
            <div className="SubmitTenderComponent">
                <Box py={6} px={10}>
                    <h3>Submit your bid</h3>
                    <Container>
                        <form>
                            <div>
                                <div className="col-1">
                                    <TextField
                                        label="Enter bid amount"
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.bidAmt}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="co1-2">
                                    <TextField
                                        label="Enter nounce"
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.nounce}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-3">
                                <Button variant="contained" 
                                        color="secondary"
                                        type="submit"
                                        value="submit">
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

export default SubmitBidComponent