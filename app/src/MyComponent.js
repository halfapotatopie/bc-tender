import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";
import Header from "./layout/Header";
import TenderComponent from "./TenderComponent";
import SubmitBidComponent from "./SubmitBidComponent";
import SubmitNounceComponent from "./SubmitNounceComponent";
import ViewResultsComponent from "./ViewResultsComponent";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import logo from "./logo.png";

export default () => (
  <div className="App">
    <Header />
      <BrowserRouter>
        <Route exact path="/" component = {TenderComponent} />
        <Route exact path="/bid" component = {SubmitBidComponent} />
        <Route exact path="/nounce" component = {SubmitNounceComponent}/>
        <Route exact path="/result" component = {ViewResultsComponent}/>
      </BrowserRouter>
      
  </div>
);
