import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { firebase } from "../utils/firebase";
export default function AuthButton() {
  let history = useHistory();
  let login = useSelector((state) => state.login);
  if (login) {
    return (
      <button
        onClick={() => {
          firebase.auth().signOut();
          history.push("/");
        }}
      >
        sign out
      </button>
    );
  } else {
    return (
      <button
        onClick={() => {
          history.push("/login");
        }}
      >
        sign in
      </button>
    );
  }
}
