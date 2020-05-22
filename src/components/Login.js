import React, { useEffect } from "react";
import { ui, firebase } from "../utils/firebase";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../utils/actions";
export default function Login() {
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  let login = useSelector((state) => state.login);
  let history = useHistory();
  let dispatch = useDispatch();
  useEffect(() => {
    ui.start("#firebaseui-auth-container", {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          dispatch(setLogin(!!authResult));
          history.replace(from);
          return false;
        },
      },
      signInFlow: "popup",
    });
  }, [history, dispatch, from]);
  if (!login) {
    return <div id={"firebaseui-auth-container"}></div>;
  } else {
    return <React.Fragment></React.Fragment>;
  }
}
