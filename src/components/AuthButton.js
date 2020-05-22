import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { firebase } from "../utils/firebase";
import { Button } from "grommet";
export default function AuthButton() {
  let history = useHistory();
  let login = useSelector((state) => state.login);
  if (login) {
    return (
      <Button
        primary
        onClick={() => {
          firebase.auth().signOut();
          history.push("/");
        }}
        label="sign out"
      />
    );
  } else {
    return (
      <Button
        onClick={() => {
          history.push("/login");
        }}
        label="sign in"
        primary
      />
    );
  }
}
