import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Account from "./components/Account";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Saved from "./components/Saved";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/account" component={Account} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/saved" component={Saved} />
    </Router>
  );
}

export default App;
