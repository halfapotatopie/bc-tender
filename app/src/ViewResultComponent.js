import React from 'react';
import { Box, Container, Paper, Button } from '@material-ui/core';
import { Form, Input, notification, Select, Divider } from 'antd';
import { getAllAccounts, getPhase, reopenTender,
         closeContract, endRevelation, hasBeenChecked,
         hasWinner, getResult } from "./util";
import { styled } from '@material-ui/styles';

const { Option } = Select;
const POSINT_REGEX = RegExp('^[1-9]+[0-9]*$');

class ViewResultComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        validPhase: false,
        hasBeenChecked: false,
        hasWinner: false,
        winner: "",
        winningBid: 0,
        resultDetailsLoaded: false,
        accounts: [],
        accountsLoaded: false,
        chosenAccount: "",
        accountChosen: false,
        newDescription: {
          value: "",
          validateStatus: "",
          errorMsg: null
        },
        newBiddingDuration: {
          value: 0,
          validateStatus: "",
          errorMsg: null
        },
        newRevelationDuration: {
          value: 0,
          validateStatus: "",
          errorMsg: null
        },
        newDepositAmount: {
          value: 0,
          validateStatus: "",
          errorMsg: null
        }
      };

      this.checkPhase = this.checkPhase.bind(this);
      this.loadAccounts = this.loadAccounts.bind(this);
      this.handleAccountChange = this.handleAccountChange.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.validateDescription = this.validateDescription.bind(this);
      this.validateBiddingDuration = this.validateBiddingDuration.bind(this);
      this.validateRevelationDuration = this.validateRevelationDuration.bind(this);
      this.validateDepositAmount = this.validateDepositAmount.bind(this);
      this.generateResultMessage = this.generateResultMessage.bind(this);
      this.generateResult = this.generateResult.bind(this);
      this.closeTender = this.closeTender.bind(this);
      this.loadResultDetails = this.loadResultDetails.bind(this);
    }

    generateResultMessage() {
      if (this.state.hasBeenChecked && this.state.hasWinner) {
        return `Winner: ${this.state.winner} \n Winning Bid: ${this.state.winningBid}`;
      } else if (this.state.hasBeenChecked) {
        return "Tender ended with no winner";
      } else {
        return "Result has not been computed yet.";
      }
    }

    loadResultDetails(){
      hasBeenChecked()
      .then(res => {
        if (res) {
          hasWinner().then(res2 => {
            if (res2) {
              getResult().then(res3 => {
                this.setState({
                  winner: res3[0],
                  winningBid: res3[1],
                  hasBeenChecked: true,
                  hasWinner: true,
                  resultDetailsLoaded: true
                });
              });
            } else {
              this.setState({
                winner: "",
                winningBid: 0,
                hasBeenChecked: true,
                hasWinner: false,
                resultDetailsLoaded: true
              });
            }
          });
        } else {
          this.setState({
            winner: "",
            winningBid: 0,
            hasBeenChecked: false,
            hasWinner: false,
            resultDetailsLoaded: true
          });
        }
      }).catch(err => {
        this.setState({
          resultDetailsLoaded: false
        });
      });
    }

    generateResult(event) {
      event.preventDefault();
      if (!this.state.accountChosen) {
        notification.error({
          message: "Error",
          description: "Make sure you selected an account!"
        });
        return;
      }

      endRevelation(this.state.chosenAccount) // change this?
      .then(res => {
        if (res) {
          notification.success({
            message: "Success",
            description: "Generated result successfully!"
          });
        } else {
          notification.error({
            message: "Error",
            description: "You are not the owner or have already generated result!"
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

    closeTender(event) {
      event.preventDefault();
      if (!this.state.accountChosen) {
        notification.error({
          message: "Error",
          description: "Make sure you selected an account!"
        });
        return;
      }

      closeContract(this.state.chosenAccount)
      .then(res => {
        if (res) {
          notification.success({
            message: "Success",
            description: "Closed tender successfully!"
          });
        } else {
          notification.error({
            message: "Error",
            description: "You are not the owner or result has not been generated!"
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

    checkPhase() {
      getPhase()
      .then(phase => {
        if (phase === "End") {
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
              && (this.state.newDescription.validateStatus === "success")
              && (this.state.newBiddingDuration.validateStatus === "success")
              && (this.state.newRevelationDuration.validateStatus === "success")
              && (this.state.newDepositAmount.validateStatus === "success"))) {
        notification.error({
          message: "Error",
          description: "Make sure all fields are filled in correctly!"
        });
        return;
      }

      reopenTender(this.state.chosenAccount,this.state.newDescription.value,
                   this.state.newBiddingDuration.value, this.state.newRevelationDuration.value,
                   this.state.newDepositAmount.value)
      .then(res => {
        console.log("reopening");
        console.log(res);
        if (res) {
          notification.success({
            message: "Success",
            description: "Reopened tender successfully!"
          });
        } else {
          notification.error({
            message: "Error",
            description: "You are not the owner or result has not been generated!"
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

    validateDescription(desc) {
      if (desc.trim() === "") {
        return {
          validateStatus: "error",
          errorMsg: "Description should be not be empty!"
        };
      } else {
        return {
          validateStatus: "success",
          errorMsg: null
        };
      }
    }

    validateBiddingDuration(duration) {
      if (!POSINT_REGEX.test(duration)) {
        return {
          validateStatus: "error",
          errorMsg: "Bidding duration should be a positive integer!"
        };
      } else {
        return {
          validateStatus: "success",
          errorMsg: null
        };
      }
    }

    validateRevelationDuration(duration) {
      if (!POSINT_REGEX.test(duration)) {
        return {
          validateStatus: "error",
          errorMsg: "Revelation duration should be a positive integer!"
        };
      } else {
        return {
          validateStatus: "success",
          errorMsg: null
        };
      }
    }

    validateDepositAmount(amount) {
      if (!POSINT_REGEX.test(amount)) {
        return {
          validateStatus: "error",
          errorMsg: "Deposit amount should be a positive integer!"
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
      this.loadResultDetails();
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

      if (this.state.validPhase && this.state.resultDetailsLoaded && this.state.accountsLoaded) {
        return (
            <div className="ViewResultComponent">
                <Box py={6} px={10}>
                  <Paper style={{maxHeight: '60vh', overflow: 'auto'}} elevation={6}>
                    <Container>
                      <br/>
                      <h3>Check the result here</h3>
                      {this.generateResultMessage()}
                      <br/>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="Account">

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
                        <Form.Item>
                          <MyButton type="submit"
                          className="generate-result-button"
                          onClick={this.generateResult}>
                            Generate Result
                          </MyButton>
                        </Form.Item>
                        <Divider />
                        <Form.Item
                          label="Project Description"
                          hasFeedback
                          validateStatus={this.state.newDescription.validateStatus}
                          help={this.state.newDescription.errorMsg}>
                          <Input
                            type="text"
                            size="large"
                            name="newDescription"
                            onChange={evt => {this.handleInputChange(evt, this.validateDescription)}}
                            placeholder="Description"
                            style={{ width: '20vw', marginRight: '3%'}}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Bidding Duration"
                          hasFeedback
                          validateStatus={this.state.newBiddingDuration.validateStatus}
                          help={this.state.newBiddingDuration.errorMsg}>
                          <Input
                            type="number"
                            size="large"
                            name="newBiddingDuration"
                            onChange={evt => {this.handleInputChange(evt, this.validateBiddingDuration)}}
                            placeholder="Duration"
                            addonAfter="min"
                            style={{ width: '20vw', marginRight: '3%'}}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Revelation Duration"
                          hasFeedback
                          validateStatus={this.state.newRevelationDuration.validateStatus}
                          help={this.state.newRevelationDuration.errorMsg}>
                          <Input
                            type="number"
                            size="large"
                            name="newRevelationDuration"
                            onChange={evt => {this.handleInputChange(evt, this.validateRevelationDuration)}}
                            placeholder="Duration"
                            addonAfter="min"
                            style={{ width: '20vw', marginRight: '3%'}}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Deposit Amount"
                          hasFeedback
                          validateStatus={this.state.newDepositAmount.validateStatus}
                          help={this.state.newDepositAmount.errorMsg}>
                          <Input
                            type="number"
                            size="large"
                            name="newDepositAmount"
                            onChange={evt => {this.handleInputChange(evt, this.validateDepositAmount)}}
                            placeholder="Amount"
                            addonAfter="ETH"
                            style={{ width: '20vw', marginRight: '3%'}}
                          />
                        </Form.Item>
                        <Form.Item >
                          <MyButton type="submit" className="reopen-tender-button">
                            Reopen Tender
                          </MyButton>
                        </Form.Item>
                        <Form.Item >
                          <MyButton type="submit"
                          className="close-tender-button"
                          onClick={this.closeTender}>
                            Close Tender
                          </MyButton>
                        </Form.Item>
                      </Form>
                    </Container>
                  </Paper>
                </Box>
            </div>
        );
      } else if (this.state.validPhase && this.state.resultDetailsLoaded) {
        return (
          <div className="ViewResultComponent">
              <Box py={6} px={10}>
                <Paper style={{maxHeight: '60vh', overflow: 'auto'}}>
                  <Container>
                    <br/>
                    <h3>Check the result here</h3>
                    {this.generateResultMessage()}
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
            Revelation Phase has not ended!
          </div>
        );
      }
    }
}

export default ViewResultComponent;