
import React, { useEffect, useState } from "react";
import { ui, firebase } from "../utils/firebase";
import { Redirect } from "react-router-dom";
export default function Login(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const { from } = props.location.state || { from: { pathname: "/" } };
  useEffect(() => {
    ui.start("#firebaseui-auth-container", {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          setLoggedIn(true);
          return true;
        },
      },
    });
  }, []);
  if (loggedIn) {
    return <Redirect to={from} />;
  }
  return <div id={"firebaseui-auth-container"}></div>;
}
