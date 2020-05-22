import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Box, Text } from "grommet";
import { firebase } from "../utils/firebase";
import ImagePost from "./ImagePost";

const db = firebase.firestore();

export default function Homepage() {
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
  );
}
