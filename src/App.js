import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grommet } from "grommet";
import Account from "./components/Account";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Saved from "./components/Saved";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import "./App.css";

const theme = {
  global: {
    colors: { brand: "#228BE6" },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};
function App() {
  return (
    <Grommet theme={theme}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Homepage} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/saved" component={Saved} />
        <Route exact path="/create" component={Create} />
      </Router>
    </Grommet>
  );
}

export default App;
