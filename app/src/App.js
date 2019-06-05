import React, { Component } from "react";
import { DrizzleProvider } from "drizzle-react";
import "./App.css";

import drizzleOptions from "./drizzleOptions";
import MyContainer from "./MyContainer";

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
          <MyContainer />
      </DrizzleProvider>
    );
  }
}

export default App;
