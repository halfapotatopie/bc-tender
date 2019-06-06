import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, TextField } from '@material-ui/core';
import { Button, Form, Input, notification, Select } from 'antd';

import {
    AccountData,
    ContractData,
    ContractForm
} from "drizzle-react-components";
import { getAllAccounts, getPhase, getProjectDetails, getHash, submitHashedBid } from "./util";

const { Option } = Select;
const NONNEGINT_REGEX = RegExp('^[1-9]+[0-9]*$|^0$');
const POSINT_REGEX = RegExp('^[1-9]+[0-9]*$');
const deposit = 1; // to remove

class SubmitBidComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        validPhase: false,
        projectDetails: {},
        detailsLoaded: false,
        accounts: [],
        accountsLoaded: false,
        chosenAccount: "",
        accountChosen: false,
        nonce: {
          value: 0,
          validateStatus: "",
          errorMsg: null
        },
        bidAmount: {
          value: 0,
          validateStatus: "",
          errorMsg: null
        }
      };

      this.checkPhase = this.checkPhase.bind(this);
      this.loadProjectDetails = this.loadProjectDetails.bind(this);
      this.loadAccounts = this.loadAccounts.bind(this);
      this.handleAccountChange = this.handleAccountChange.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.validateNonce = this.validateNonce.bind(this);
      this.validateAmount = this.validateAmount.bind(this);
      this.isFormValid = this.isFormValid.bind(this);
    }

    checkPhase() {
      getPhase()
      .then(phase => {
        console.log(phase);
        console.log(typeof phase);
        if (phase === "Bidding Period") {
          this.setState({
            validPhase: true
          });
        } else {
          console.log("error is here");
          this.setState({
            validPhase: false
          });
        }
      }).catch(error => {
        console.log(error);
        this.setState({
          validPhase: false
        });
      });
    }

    loadProjectDetails() {
      getProjectDetails()
      .then(details => {
        this.setState({
          projectDetails: details,
          detailsLoaded: true
        });
      }).catch(error => {
        this.setState({
          projectDetails: {},
          detailsLoaded: false
        })
      });
    }

    loadAccounts() {
      getAllAccounts()
      .then(response => {
        this.setState({
          accounts: response,
          accountsLoaded: true
        });
      }).catch(error => {
        this.setState({
          accounts: [],
          accountsLoaded: false
        })
      });
    }

    handleAccountChange(value) {
      this.setState({
        chosenAccount: value,
        accountChosen: true
      });
    }

    handleInputChange(evt, validationFunc) {
      const tar = evt.target;
      const inputName = tar.name;
      const inputValue = tar.value;

      this.setState({
          [inputName]: {
            value: inputValue,
            ...validationFunc(inputValue)
          }
      });
    }

    handleSubmit(event) {
      event.preventDefault();
      getHash(this.state.nonce.value, this.state.bidAmount.value)
      .then(hash => {
        return submitHashedBid(this.state.chosenAccount, hash);
      }).then(res => {
        notification.success({
          message: "Success",
          description: "Submitted hashed bid successfully!"
        });
      }).catch(error => {
        console.log(error);
        notification.error({
          message: "Error",
          description: "Unable to submit hashed bid!"
        });
      });
    }

    validateNonce(nonce) {
      if (!NONNEGINT_REGEX.test(nonce)) {
        return {
          validateStatus: "error",
          errorMsg: "Nonce should be a non-negative integer!"
        };
      } else {
        return {
          validateStatus: "success",
          errorMsg: null
        };
      }
    }

    validateAmount(amount) {
      if(!POSINT_REGEX.test(amount)) {
        return {
          validateStatus: "error",
          errorMsg: "Amount should be a positive integer!"
        };
      }
      if (amount < deposit) { // to change deposit to refer to deposit from contract
        return {
          validateStatus: "error",
          errorMsg: "Amount should be at least the same as deposit!"
        };
      } else {
        return {
          validateStatus: "success",
          errorMsg: null
        };
      }
    }

    isFormValid() {
      return (this.state.accountChosen
              && this.state.nonce.validStatus === "success"
              && this.state.bidAmount.validStatus === "success");
    }

    componentDidMount() {
      this.checkPhase();
      this.loadProjectDetails();
      this.loadAccounts();
    }


    //code to push state to HashGenerator contract
    // TODO: display project details, reorganise stuff and change styling if needed
    // need to check if bid amount is more than depositAmount (change solidity?)
    render() {
      console.log(this.state.validPhase);
      console.log(this.state.detailsLoaded);
      console.log(this.state.accountsLoaded);
      if (this.state.validPhase && this.state.detailsLoaded && this.state.accountsLoaded) {
        return (
            <div className="SubmitBidComponent">
                <Box py={6} px={10}>
                    <h3>Submit your bid</h3>
                    <Container>
                      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                        <Form.Item label="Account">
                          
                            <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select an account"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={this.handleAccountChange}
                            >
                              {this.state.accounts.map(value => (
                                <Option key={value}>{value}</Option>
                              ))}
                            </Select>
      
                        </Form.Item>
                        <Form.Item
                          label="Nonce"
                          hasFeedback
                          validateStatus={this.state.nonce.validateStatus}
                          help={this.state.nonce.errorMsg}>
                          <Input
                            type="number"
                            size="large"
                            name="nonce"
                            onChange={evt => {this.handleInputChange(evt, this.validateNonce)}}
                            placeholder="Nonce"
                            style={{ width: '65%', marginRight: '3%' }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Amount"
                          hasFeedback
                          validateStatus={this.state.bidAmount.validateStatus}
                          help={this.state.bidAmount.errorMsg}>
                          <Input
                            type="number"
                            size="large"
                            name="bidAmount"
                            onChange={evt => {this.handleInputChange(evt, this.validateAmount)}}
                            placeholder="Amount"
                            style={{ width: '65%', marginRight: '3%' }}
                          /> ETH
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                          <Button type="primary" htmlType="submit" className="submit-bid-button" disabled={!this.isFormValid()}>
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                    </Container>
                </Box>
            </div>
        );
      } else if (this.state.validPhase && this.state.detailsLoaded) { // return a page with just details
        return (
          <div>
          </div>
        );
      } else if (this.state.validPhase) { // return empty page
        return (
          <div>
          </div>
        );
      } else { // return a page that says invalid phase
        return (
          <div>
            Bidding Phase has ended!
          </div>
        );
      }
    }
}

export default SubmitBidComponent;
//
// <form>
//     <div>
//         <div className="col-1">
//             <TextField
//                 label="Enter bid amount"
//                 margin="normal"
//                 variant="outlined"
//                 value={this.state.bidAmt}
//                 onChange={this.onChange}
//             />
//         </div>
//         <div className="co1-2">
//             <TextField
//                 label="Enter nounce"
//                 margin="normal"
//                 variant="outlined"
//                 value={this.state.nounce}
//                 onChange={this.onChange}
//             />
//         </div>
//         <div className="col-3">
//         <Button variant="contained"
//                 color="secondary"
//                 type="submit"
//                 value="submit">
//             Send
//         </Button>
//         </div>
//     </div>
// </form>
