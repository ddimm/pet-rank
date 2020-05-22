import React, { useState } from "react";
import { Box, Heading, Paragraph, Stack, Button } from "grommet";
import { Dislike, Like, Bookmark } from "grommet-icons";
import { firebase } from "../utils/firebase";

const db = firebase.firestore();
const auth = firebase.auth();

const statusTypes = {
  LIKED: "liked",
  DISLIKED: "disliked",
  DEFAULT: "default",
};

export default function Post({ post }) {
  const [status, setStatus] = useState(statusTypes.DEFAULT);
  const [isSaved, setIsSaved] = useState(false);

  const isDisliked = () => {
    return status === statusTypes.DISLIKED;
  };

  const isLiked = () => {
    return status === statusTypes.LIKED;
  };

  const handleLike = () => {
    if (isLiked()) setStatus(statusTypes.DEFAULT);
    else setStatus(statusTypes.LIKED);
  };

  const handleDislike = () => {
    if (isDisliked()) setStatus(statusTypes.DEFAULT);
    else setStatus(statusTypes.DISLIKED);
  };

  const handleSave = () => {
    if (!isSaved) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("saved")
        .doc(post.id)
        .set({
          ...post,
        })
        .then(() => {
          console.log("Post successfully saved!");
        })
        .catch((error) => {
          console.error("Error saving post: ", error);
        });
    } else {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("saved")
        .doc(post.id)
        .delete()
        .then(() => {
          console.log("Post successfully saved!");
        })
        .catch((error) => {
          console.error("Error saving post: ", error);
        });
    }
    setIsSaved(!isSaved);
  };

  return (
    <Box
      border={{ color: "brand", size: "medium" }}
      background="light-3"
      elevation="medium"
      margin={{ vertical: "medium", horizontal: "xlarge" }}
      pad="medium"
      round="small"
    >
      <Stack anchor="top-right">
        <Stack anchor="bottom-right">
          <Box>
            <Heading>{post.title}</Heading>
            <Paragraph>{post.body}</Paragraph>
          </Box>
          <Box direction="row" gap="medium">
            <Button
              icon={<Like size="large" color={isLiked() ? "brand" : "plain"} />}
              hoverIndicator
              onClick={handleLike}
            />
            {post.points}
            <Button
              icon={
                <Dislike
                  size="large"
                  color={isDisliked() ? "status-critical" : "plain"}
                />
              }
              hoverIndicator
              onClick={handleDislike}
            />
          </Box>
        </Stack>
        <Button
          icon={
            <Bookmark size="medium" color={isSaved ? "accent-2" : "plain"} />
          }
          hoverIndicator
          onClick={handleSave}
        />
      </Stack>
    </Box>
  );
}
