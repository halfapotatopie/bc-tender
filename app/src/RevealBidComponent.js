import React from 'react';
import { Box, Container } from '@material-ui/core';
import { Button, Form, Input, notification, Select } from 'antd';

import { getAllAccounts, getPhase, getProjectDetails, revealBid } from "./util";

const { Option } = Select;
const NONNEGINT_REGEX = RegExp('^[1-9]+[0-9]*$|^0$');
const POSINT_REGEX = RegExp('^[1-9]+[0-9]*$');

class RevealBidComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        validPhase: false,
        prevPhaseEnded: false,
        validForm: false,
        detailsDescription: "",
        detailsDeposit: 0,
        detailsBidEnd: 0,
        detailsRevealEnd: 0,
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
      this.updateValidForm = this.updateValidForm.bind(this);
    }


    checkPhase() {
      getPhase()
      .then(phase => {
        if (phase === "Revelation") {
          this.setState({
            validPhase: true,
            prevPhaseEnded: true
          });
        } else if (phase === "Bidding") {
          this.setState({
            validPhase: false,
            prevPhaseEnded: false
          });
        } else {
          this.setState({
            validPhase: false,
            prevPhaseEnded: true
          });
        }
      }).catch(error => {
        console.log(error);
        this.setState({
          validPhase: false,
          prevPhaseEnded: false
        });
      });
    }

    loadProjectDetails() {
      getProjectDetails()
      .then(details => {
        this.setState({
          detailsDescription: details[0],
          detailsDeposit: parseInt(details[1], 16),
          detailsBidEnd: new Date(parseInt(details[2], 10) * 1000),
          detailsRevealEnd: new Date(parseInt(details[3], 10) * 1000),
          detailsLoaded: true
        });
        console.log("updated details:");
        console.log(this.state.detailsDescription);
        console.log(this.state.detailsDeposit);
        console.log(this.state.detailsBidEnd);
        console.log(this.state.detailsRevealEnd);
      }).catch(error => {
        this.setState({
          detailsDescription: "",
          detailsDeposit: 0,
          detailsBidEnd: 0,
          detailsRevealEnd: 0,
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
      this.updateValidForm();
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
      this.updateValidForm();
    }

    handleSubmit(event) {
      event.preventDefault();
      if (!this.state.validForm) {
        notification.error({
          message: "Error",
          description: "Make sure all fields are filled in correctly!"
        });
        return;
      }

      revealBid(this.state.chosenAccount,this.state.nonce.value, this.state.bidAmount.value)
      .then(res => {
        notification.success({
          message: "Success",
          description: "Revealed bid successfully!"
        });
      }).catch(error => {
        console.log(error);
        notification.error({
          message: "Error",
          description: "Incorrect nonce and/or amount!"
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
      if (amount < this.state.detailsDeposit) {
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

    updateValidForm() {
      this.setState({
        validForm: (this.state.accountChosen
                && this.state.nonce.validStatus === "success"
                && this.state.bidAmount.validStatus === "success")
      });
    }

    componentDidMount() {
      this.checkPhase();
      this.loadProjectDetails();
      this.loadAccounts();
    }


    // TODO: Reorganise stuff and restyle if needed
    render() {
      if (this.state.validPhase && this.state.detailsLoaded && this.state.accountsLoaded) {
        // TODO: Display project details (get from this.state)
        return (
            <div className="RevealBidComponent">
                <Box py={6} px={10}>
                    <h3>Reveal your bid</h3>
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
                          <Button type="primary" htmlType="submit" className="reveal-bid-button">
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                    </Container>
                </Box>
            </div>
        );
      } else if (this.state.validPhase && this.state.detailsLoaded) {
        // TODO: Return a page with just project details
        return (
          <div>
          </div>
        );
      } else if (this.state.validPhase) { // Returns an empty page
        return (
          <div>
          </div>
        );
      } else if (!this.state.prevPhaseEnded) {
        // TODO: Restyle
        return (
          <div>
            Revelation Phase has not started!
          </div>
        );
      } else {
        // TODO: Restyle
        return (
          <div>
            Revelation Phase has ended!
          </div>
        );
      }
    }
}

export default RevealBidComponent;
