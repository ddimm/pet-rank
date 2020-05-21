import React, { useState } from "react";
import { Tabs, Tab, Box } from "grommet";

export default function Create() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Tabs>
        <Tab title="image">
          <Box></Box>
        </Tab>
        <Tab title="text">Text post</Tab>
      </Tabs>
    </div>
  );
}
