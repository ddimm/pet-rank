import React, { useEffect } from "react";
import { ui, firebase } from "../utils/firebase";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../utils/actions";
import { Box } from "grommet";
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
    return <Box id={"firebaseui-auth-container"}></Box>;
  } else if (location.state) {
    return <Redirect to={from} />;
  }
}
