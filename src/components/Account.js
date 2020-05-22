import React, { useState, useEffect } from "react";
import { Box, Text, Heading, Grid } from "grommet";
import { firebase } from "../utils/firebase";
import AuthButton from "./AuthButton";
import EditTextPost from "./EditTextPost";
import EditImagePost from "./EditImagePost";
const db = firebase.firestore();
export default function Account() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    db.collection("posts")
      .where("userId", "==", firebase.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        let postsTemp = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          postsTemp.push({ ...doc.data(), id: doc.id });
        });
        setPosts(postsTemp);
      })
      .catch(console.log("Couldn't load posts"));
  }, []);
  return (
    <Box
      border={{ color: "brand", size: "xlarge" }}
      pad="medium"
      animation="slideUp"
      style={{ margin: "4vw" }}
    >
      <Heading>Your Account</Heading>

      <Text>{firebase.auth().currentUser.displayName}</Text>
      <Text>{firebase.auth().currentUser.email}</Text>
      <AuthButton />
      <Heading>Your Posts</Heading>

      {!posts && <Text>Loading...</Text>}
      {posts && (
        <Grid rows="small" columns="medium" gap="small">
          {" "}
          {posts.map((post, index) => {
            if (post.type === "text")
              return <EditTextPost key={index} post={post} />;
            else return <EditImagePost key={index} post={post} />;
          })}
        </Grid>
      )}
      {posts && posts.length === 0 && (
        <Text>You haven't posted anything yet!</Text>
      )}
    </Box>
  );
}
