import { Box, Text } from "grommet";
import React from "react";
import { useSelector } from "react-redux";
import ImagePost from "./ImagePost";
import Post from "./Post";

export default function Homepage() {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <Box>
      {!posts && <Text>Loading...</Text>}
      {posts &&
        posts.map((post, index) => {
          if (post.type === "text") {
            return <Post key={index} post={post} />;
          } else if (post.type === "image") {
            return <ImagePost key={index} post={post} />;
          } else {
            return <Post key={index} post={post} />;
          }
        })}
      {posts && posts.length === 0 && <Text>No posts :(</Text>}
    </Box>
  );
}
