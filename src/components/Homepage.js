import React from "react";
import Post from "./Post";
import { Box } from "grommet";

export default function Homepage() {
  return (
    <Box>
      <Post
        title="This is a title"
        body="Lorem ipsum dolor sit amet,
              consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua."
      />
    </Box>
  );
}
