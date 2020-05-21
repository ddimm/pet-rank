import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import { firebase } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../utils/actions";
import Post from "./Post";
export default function Header() {
  let dispatch = useDispatch();
  let login = useSelector((state) => state.login);
  firebase.auth().onAuthStateChanged((user) => {
    dispatch(setLogin(!!user));
  });
  return (
    <Router>
      <div>
        {login ? (
          <button
            onClick={() => {
              firebase.auth().signOut();
            }}
          >
            signout
          </button>
        ) : (
          <p>not logged in</p>
        )}
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route
          render={(props) =>
            login ? (
              <Post />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      </Switch>
    </Router>
  );
}
