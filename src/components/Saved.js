import React, { useState, useEffect } from "react";
import { firebase } from "../utils/firebase";
import { Box, Text } from "grommet";
import Post from "./Post";

const db = firebase.firestore();
const auth = firebase.auth();

export default function Saved() {
  const [savedPosts, setSavedPosts] = useState(null);
  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("saved")
      .get()
      .then((querySnapshot) => {
        let postsTemp = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          postsTemp.push(doc.data());
        });
        setSavedPosts(postsTemp);
      })
      .catch(console.log("Couldn't load saved posts"));
  }, []);

  return (
    <Box>
      {!savedPosts && <Text>Loading...</Text>}
      {savedPosts &&
        savedPosts.map((post) => {
          return <Post post={post} key={post.title} />;
        })}
      {savedPosts && savedPosts.length === 0 && (
        <Text>You haven't saved any posts yet!</Text>
      )}
    </Box>
  );
}
