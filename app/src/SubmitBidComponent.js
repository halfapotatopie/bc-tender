import React from 'react';
import { Box, Container, Paper, Divider } from '@material-ui/core';
import { Button, Form, Input, notification, Select, Descriptions } from 'antd';
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
      this.updateValidForm = this.updateValidForm.bind(this);
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
      console.log(this.state.validForm);
      console.log(this.state.accountChosen);
      console.log(this.state.nonce.validateStatus);
      console.log(this.state.bidAmount.validateStatus);
    }

    handleSubmit(event) {
      event.preventDefault();
      if (!this.state.validForm) {
        notification.error({
          message: "Error",
          description: "Make sure all fields are filled in correctly!"
        });
        console.log(this.state.validForm);
        console.log(this.state.accountChosen);
        console.log(this.state.nonce.validateStatus);
        console.log(this.state.bidAmount.validateStatus);
        return;
      }

      getHash(this.state.nonce.value, this.state.bidAmount.value)
      .then(hash => {
        console.log("hash:");
        console.log(hash);
        return submitHashedBid(this.state.chosenAccount, hash, this.state.detailsDeposit);
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
                && this.state.nonce.validateStatus === "success"
                && this.state.bidAmount.validateStatus === "success")
      });
    }

    componentDidMount() {
      this.checkPhase();
      this.loadProjectDetails();
      this.loadAccounts();
    }


    // TODO: Reorganise stuff and restyle if needed
    render() {
      const { formLayout } = this.state;

      const formItemLayout =
        formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;

      const MyButton = styled(Button)({
        background: 'linear-gradient(30deg, #ff4081 30%, #448aff 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      });

      if (this.state.validPhase && this.state.detailsLoaded && this.state.accountsLoaded) {
        // TODO: Display project details (get from this.state)
        return (
            <div className="SubmitBidComponent">
                <Box py={6} px={10}>
                  <Paper>
                    
                    <Container>
                      <br/>
                      <h2>Submit your bid</h2>

                      <Divider />
                      <br />
                    <Descriptions
                        title="Tender Description"
                        border
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                      >
                        <Descriptions.Item label="Project Description">{this.state.detailsDescription}</Descriptions.Item>
                        <Descriptions.Item label="Deposit">{this.state.detailsDeposit}</Descriptions.Item>
                        {/* Error trying to fetch dates
                        
                        <Descriptions.Item label="Bid End">{this.state.detailsBidEnd}</Descriptions.Item>
                        <Descriptions.Item label="Revelation End">{this.state.detailsRevealEnd}</Descriptions.Item>

                         */}
                       
                      </Descriptions>
                      {/* form */}
                      <br />
                      <Divider />
                      <br />

                      <Form layout={formLayout}
                            labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                        <Form.Item label="Account" {...formItemLayout}>
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
                          label="Nonce" {...formItemLayout}
                          hasFeedback
                          validateStatus={this.state.nonce.validateStatus}
                          help={this.state.nonce.errorMsg}>
                          <Input
                            type="number"
                            size="large"
                            name="nonce"
                            onChange={evt => {this.handleInputChange(evt, this.validateNonce)}}
                            placeholder="Nonce"
                            style={{ width: 200, marginRight: '3%' }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Amount" {...formItemLayout}
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
                            style={{ width: 200, marginRight: '3%' }}
                          /> 
                        </Form.Item>
                        <Form.Item>
                          <MyButton type="primary" htmlType="submit" className="submit-bid-button">
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
      } else {
        // TODO: Restyle
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
