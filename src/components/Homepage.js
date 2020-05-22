import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Box, Text } from "grommet";
import { firebase } from "../utils/firebase";

const db = firebase.firestore();

export default function Homepage() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    db.collection("posts").onSnapshot((querySnapshot) => {
      let postsTemp = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
        postsTemp.push(doc.data());
      });
      setPosts(postsTemp);
    });
  }, []);

  return (
    <Box>
      {/* <Post
        title="This is a title"
        body="Lorem ipsum dolor sit amet,
              consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua."
      /> */}
      {!posts && <Text>Loading...</Text>}
      {posts &&
        posts.map((post) => {
          return <Post title={post.title} body={post.body} />;
        })}
      {posts && posts.length === 0 && <Text>No posts :(</Text>}
    </Box>
  );
}
