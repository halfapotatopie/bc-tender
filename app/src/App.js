import React, { Component } from "react";
// import { DrizzleProvider } from "drizzle-react";
import "./App.css";

// import drizzleOptions from "./drizzleOptions";
// import MyContainer from "./MyContainer";
import MyComponent from "./MyComponent";

class App extends Component {
  render() {
    return (

        <MyComponent />

    );
  }
}

export default App;

// class App extends Component {
//   render() {
//     return (
//       <DrizzleProvider options={drizzleOptions}>
//           <MyContainer />
//       </DrizzleProvider>
//     );
//   }
// }
