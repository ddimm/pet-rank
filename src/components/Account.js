import React from "react";
import { Box, Text, Heading } from "grommet";

export default function Account() {
  return (
    <Box
      border={{ color: "brand", size: "xlarge" }}
      pad="medium"
      animation="slideUp"
      style={{ margin: "4vw" }}
    >
      <Heading>Your Account</Heading>

      <Text>username</Text>
      <Text>uid</Text>
      <Text>email</Text>
    </Box>
  );
}
