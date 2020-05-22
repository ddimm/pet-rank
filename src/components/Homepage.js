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
