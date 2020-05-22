import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Box, Text } from "grommet";
import { firebase } from "../utils/firebase";
// import { useSelector } from "react-redux"

const db = firebase.firestore();

export default function Homepage() {
  // const login = useSelector((state) => state.login);

  const [posts, setPosts] = useState();
  useEffect(() => {
    db.collection("posts")
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
    <Box>
      {!posts && <Text>Loading...</Text>}
      {posts &&
        posts.map((post) => {
          return <Post post={post} key={post.title} />;
        })}
      {posts && posts.length === 0 && <Text>No posts :(</Text>}
    </Box>
  );
}
