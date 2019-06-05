import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm
} from "drizzle-react-components";
import Header from "./layout/Header";
import HomeComponent from "./HomeComponent";
import SubmitBidComponent from "./SubmitBidComponent";
import RevealBidComponent from "./RevealBidComponent";
import ViewResultComponent from "./ViewResultComponent";
import { BrowserRouter, Route } from "react-router-dom";

class MyComponent extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return(
      <div className="App">
        <Header />
        <BrowserRouter>
          <Route exact path="/" component = {HomeComponent} />
          <Route exact path="/bid" component = {SubmitBidComponent} />
          <Route exact path="/nounce" component = {RevealBidComponent}/>
          <Route exact path="/result" component = {ViewResultComponent}/>
        </BrowserRouter>
      </div>
    )
  }
}

export default MyComponent;
