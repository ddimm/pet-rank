import React from "react";
import { Grommet, Header, Button, Menu } from "grommet";
import { Home } from "grommet-icons";

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
        <Button icon={<Home />} hoverIndicator />
        <Menu label="account" items={[{ label: "logout" }]} />
      </Header>
    </Grommet>
  );
}
