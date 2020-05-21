import React from "react";
import { Grommet, Header, Button } from "grommet";
import { Home, User, Bookmark } from "grommet-icons";
import { Link } from "react-router-dom";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

export default function Navbar() {
  return (
    <Grommet theme={theme}>
      <Header background="brand">
        <Link to="/">
          <Button icon={<Home />} hoverIndicator />
        </Link>
        <Link to="/saved">
          <Button icon={<Bookmark />} hoverIndicator />
        </Link>
        <Link to="/account">
          <Button icon={<User />} hoverIndicator />
        </Link>
      </Header>
    </Grommet>
  );
}
