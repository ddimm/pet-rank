import React from "react";
import { Box, Text, Heading } from "grommet";
import { firebase } from "../utils/firebase";
import AuthButton from "./AuthButton";
export default function Account() {
  return (
    <Box
      border={{ color: "brand", size: "xlarge" }}
      pad="medium"
      animation="slideUp"
      style={{ margin: "4vw" }}
    >
      <Heading>Your Account</Heading>

      <Text>{firebase.auth().currentUser.displayName}</Text>
      <Text>{firebase.auth().currentUser.uid}</Text>
      <Text>{firebase.auth().currentUser.email}</Text>
      <AuthButton />
    </Box>
  );
}
