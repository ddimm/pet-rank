import { Button, Header } from "grommet";
import { Bookmark, Home, Upload, User } from "grommet-icons";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogin } from "../utils/actions";
import { firebase } from "../utils/firebase";
export default function Navbar() {
  let dispatch = useDispatch();
  firebase.auth().onAuthStateChanged((user) => {
    dispatch(setLogin(!!user));
  });

  return (
    <Header background="brand" style={{ marginBottom: "2vh" }}>
      <Link to="/">
        <Button icon={<Home />} hoverIndicator />
      </Link>
      <Link to="/create">
        <Button icon={<Upload />} hoverIndicator />
      </Link>
      <Link to="/saved">
        <Button icon={<Bookmark />} hoverIndicator />
      </Link>
      <Link to="/account">
        <Button icon={<User />} hoverIndicator />
      </Link>
    </Header>
  );
}
