import React from "react";
import { Header, Button } from "grommet";
import { Home, User, Bookmark, Upload } from "grommet-icons";
import { Link } from "react-router-dom";

export default function Navbar() {
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
