import React from "react";
import Header from "./layout/Header";
import HomeComponent from "./HomeComponent";
import SubmitBidComponent from "./SubmitBidComponent";
import RevealBidComponent from "./RevealBidComponent";
import ViewResultComponent from "./ViewResultComponent";
import { BrowserRouter, Route } from "react-router-dom";

class MyComponent extends React.Component {

  componentDidMount() {

  }

  render() {
    return(
      <div className="App">
        <Header />
        <BrowserRouter>
          <Route exact path="/" component = {HomeComponent} />
          <Route exact path="/bid" component = {SubmitBidComponent} />
          <Route exact path="/reveal" component = {RevealBidComponent}/>
          <Route exact path="/result" component = {ViewResultComponent}/>
        </BrowserRouter>
      </div>
    )
  }
}

export default MyComponent;
