import { Button, Header } from "grommet";
import { Bookmark, Home, Upload, User } from "grommet-icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogin } from "../utils/actions";
import { firebase } from "../utils/firebase";
import { setPosts } from "../utils/actions";

export default function Navbar() {
  let dispatch = useDispatch();
  firebase.auth().onAuthStateChanged((user) => {
    dispatch(setLogin(!!user));
  });
  useEffect(() => {
    return firebase
      .firestore()
      .collection("posts")
      .orderBy("points", "desc")
      .get()
      .then((docs) => {
        dispatch(
          setPosts(
            docs.docs.map((doc) => {
              console.log(doc.data());
              return { ...doc.data(), id: doc.id };
            })
          )
        );
      });
  }, [dispatch]);
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
