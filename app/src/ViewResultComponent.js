import React from 'react';
import { Box, Container } from '@material-ui/core';
import { Button, Form, Input, notification, Select } from 'antd';
import { getAllAccounts, getPhase, reopenTender,
         closeContract, endRevelation, hasBeenChecked,
         hasWinner, getResult } from "./util";

const { Option } = Select;
const POSINT_REGEX = RegExp('^[1-9]+[0-9]*$');

class ViewResultComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        validPhase: false,
        validForm: false,
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
      this.updateValidForm = this.updateValidForm.bind(this);
      this.generateResultMessage = this.generateResultMessage.bind(this);
      this.generateResult = this.generateResult.bind(this);
      this.closeTender = this.closeTender.bind(this);
      this.loadResultDetails = this.loadResultDetails.bind(this);
    }

    generateResultMessage() {
      if (this.state.hasBeenChecked && this.state.hasWinner) {
        return `Winner: ${this.state.winner}\nWinning Bid: ${this.state.winningBid}`;
      } else if (this.state.hasBeenChecked) {
        return "Tender ended with no winner";
      } else {
        return "Results have not been computed yet.";
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

      endRevelation(this.state.chosenAccount)
      .then(res => {
        notification.success({
          message: "Success",
          description: "Generated result successfully!"
        });
      }).catch(error => {
        console.log(error);
        notification.error({
          message: "Error",
          description: "You are not the owner!"
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
        notification.success({
          message: "Success",
          description: "Closed tender successfully!"
        });
      }).catch(error => {
        console.log(error);
        notification.error({
          message: "Error",
          description: "You are not the owner!"
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

      reopenTender(this.state.chosenAccount,this.state.newDescription.value,
                   this.state.newBiddingDuration.value, this.state.newRevelationDuration.value,
                   this.state.newDepositAmount.value)
      .then(res => {
        notification.success({
          message: "Success",
          description: "Reopened tender successfully!"
        });
      }).catch(error => {
        console.log(error);
        notification.error({
          message: "Error",
          description: "You are not the owner!"
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

    updateValidForm() {
      this.setState({
        validForm: (this.state.accountChosen
                && this.state.newDescription.validStatus === "success"
                && this.state.newBiddingDuration.validStatus === "success"
                && this.state.newRevelationDuration.validStatus === "success"
                && this.state.newDepositAmount.validStatus === "success")
      });
    }

    componentDidMount() {
      this.checkPhase();
      this.loadResultDetails();
      this.loadAccounts();
    }


    // TODO: Reorganise stuff and restyle if needed
    render() {
      if (this.state.validPhase && this.state.resultDetailsLoaded && this.state.accountsLoaded) {
        return (
            <div className="ViewResultComponent">
                <Box py={6} px={10}>
                    <h3>Check the result here</h3>
                    {this.generateResultMessage()}
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
                        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                          <Button type="primary"
                          className="generate-result-button"
                          onClick={this.generateResult}>
                            Generate Result
                          </Button>
                        </Form.Item>
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
                            style={{ width: '65%', marginRight: '3%' }}
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
                            style={{ width: '65%', marginRight: '3%' }}
                          /> min
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
                            style={{ width: '65%', marginRight: '3%' }}
                          /> min
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
                            style={{ width: '65%', marginRight: '3%' }}
                          /> ETH
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                          <Button type="primary" htmlType="submit" className="reopen-tender-button">
                            Reopen Tender
                          </Button>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                          <Button type="primary"
                          className="close-tender-button"
                          onClick={this.closeTender}>
                            Close Tender
                          </Button>
                        </Form.Item>
                      </Form>
                    </Container>
                </Box>
            </div>
        );
      } else if (this.state.validPhase && this.state.resultDetailsLoaded) {
        // TODO: Restyle
        return (
          <div>
            {this.generateResultMessage()}
          </div>
        );
      } else if (this.state.validPhase) { // Returns an empty page
        return (
          <div>
          </div>
        );
      } else {
        // TODO: Restyle
        return (
          <div>
            Revelation Phase has not ended!
          </div>
        );
      }
    }
}

export default ViewResultComponent;
