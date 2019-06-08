import React from 'react';
import { Box, Container, Paper, Divider, Button } from '@material-ui/core';
import { Form, Input, notification, Select, List } from 'antd';
import { styled } from '@material-ui/styles';
import { getAllAccounts, getPhase, getProjectDetails, getHash, submitHashedBid } from "./util";

const { Option } = Select;
const NONNEGINT_REGEX = RegExp('^[1-9]+[0-9]*$|^0$');
const POSINT_REGEX = RegExp('^[1-9]+[0-9]*$');

class SubmitBidComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        validPhase: false,
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
        },

        formLayout: 'horizontal',
      };

      this.checkPhase = this.checkPhase.bind(this);
      this.loadProjectDetails = this.loadProjectDetails.bind(this);
      this.loadAccounts = this.loadAccounts.bind(this);
      this.handleAccountChange = this.handleAccountChange.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.validateNonce = this.validateNonce.bind(this);
      this.validateAmount = this.validateAmount.bind(this);
    }


    checkPhase() {
      getPhase()
      .then(phase => {
        if (phase === "Bidding") {
          this.setState({
            validPhase: true
          });
        } else {
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
          detailsDescription: details[0],
          detailsDeposit: parseInt(details[1], 16),
          detailsBidEnd: new Date(parseInt(details[2], 10) * 1000),
          detailsRevealEnd: new Date(parseInt(details[3], 10) * 1000),
          detailsLoaded: true
        });
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
      if (!(this.state.accountChosen
              && this.state.nonce.validateStatus === "success"
              && this.state.bidAmount.validateStatus === "success")) {
        notification.error({
          message: "Error",
          description: "Make sure all fields are filled in correctly!"
        });
        return;
      }
      getHash(this.state.nonce.value, this.state.bidAmount.value)
      .then(hash => {
        return submitHashedBid(this.state.chosenAccount, hash, this.state.detailsDeposit);
      }).then(console.log("submitted"))
      .then(console.log(this.state.chosenAccount))
      .then(console.log(this.state.nonce.value))
      .then(console.log(this.state.bidAmount.value))
      .then(res => {
        if (res) {
          notification.success({
            message: "Success",
            description: "Submitted hashed bid successfully!"
          });
        } else {
          notification.error({
            message: "Error",
            description: "Unable to submit hashed bid!"
          });
        }
      }).catch(error => {
        console.log(error);
        notification.error({
          message: "Error",
          description: "An error occurred!"
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

    componentDidMount() {
      this.checkPhase();
      this.loadProjectDetails();
      this.loadAccounts();
    }


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

      if (this.state.validPhase && this.state.detailsLoaded && this.state.accountsLoaded) {
        return (
            <div className="SubmitBidComponent">
                <Box py={6} px={10}>
                  <Paper style={{maxHeight: '60vh', overflow: 'auto'}} elevation={6}>
                    <Container>
                      <br/>
                      <h3>Submit your bid</h3>
                      <br />
                    <List itemLayout="horizontal">
                      <List.Item>
                        <List.Item.Meta
                          title="Project Description"
                          description={this.state.detailsDescription}/>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          title="Deposit"
                          description={this.state.detailsDeposit}/>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          title="Bid End"
                          description={this.state.detailsBidEnd.toString()}/>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          title="Reveal End"
                          description={this.state.detailsRevealEnd.toString()}/>
                      </List.Item>
                    </List>
                      <br />
                      <Divider />
                      <br />

                      <Form
                          onSubmit={this.handleSubmit}
                          >
                        <Form.Item label="Account" >
                            <Select
                            showSearch
                            style={{ width: '20vw', marginRight: '3%'}}
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
                            style={{ width: '20vw', marginRight: '3%' }}
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
                            addonAfter="ETH"
                            style={{ width: '20vw', marginRight: '3%' }}
                          />
                        </Form.Item>
                        <Form.Item>
                          <MyButton type="submit" className="submit-bid-button">
                            Submit
                          </MyButton>
                        </Form.Item>
                      </Form>
                      <br/>
                    </Container>
                    </Paper>
                </Box>
            </div>
        );
      } else if (this.state.validPhase && this.state.detailsLoaded) {
        return (
          <div className="SubmitBidComponent">
              <Box py={6} px={10}>
                <Paper style={{maxHeight: '60vh', overflow: 'auto'}}>
                  <Container>
                    <br/>
                    <h3>Submit your bid</h3>
                    <br />
                  <List itemLayout="horizontal">
                    <List.Item>
                      <List.Item.Meta
                        title="Project Description"
                        description={this.state.detailsDescription}/>
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        title="Deposit"
                        description={this.state.detailsDeposit}/>
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        title="Bid End"
                        description={this.state.detailsBidEnd.toString()}/>
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        title="Reveal End"
                        description={this.state.detailsRevealEnd.toString()}/>
                    </List.Item>
                  </List>
                    <br />
                    <Divider />
                    <br />
                    <br/>
                  </Container>
                  </Paper>
              </Box>
          </div>
        );
      } else if (this.state.validPhase) { // Returns an empty page
        return (
          <div>
          </div>
        );
      } else {
        return (
          <div>
            Bidding Phase has ended!
          </div>
        );
      }
    }
}

export default SubmitBidComponent;
