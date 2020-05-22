import React, { useState, useEffect } from "react";
import { Box, Text, Heading } from "grommet";
import { firebase } from "../utils/firebase";
import AuthButton from "./AuthButton";
import Post from "./Post";
import ImagePost from "./ImagePost";
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
      <Box>
        {!posts && <Text>Loading...</Text>}
        {posts &&
          posts.map((post, index) => {
            if (post.type === "text") {
              return <Post key={index} title={post.title} body={post.body} />;
            } else if (post.type === "image") {
              return (
                <ImagePost
                  key={index}
                  title={post.title}
                  imageUrl={post.fileUrl}
                />
              );
            } else {
              return <Post key={index} title={"Error"} body={"error"} />;
            }
          })}
        {posts && posts.length === 0 && <Text>No posts :(</Text>}
      </Box>
    </Box>
  );
}
