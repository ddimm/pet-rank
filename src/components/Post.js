import React, { useState } from "react";
import { Box, Heading, Paragraph, Stack, Button, Text } from "grommet";
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
    switch (status) {
      case statusTypes.LIKED: {
        db.collection("posts")
          .doc(post.id)
          .update({ points: post.points - 1 })
          .then(console.log("Successfully undid upvote"))
          .catch(console.log("Couldn't undo upvote"));
        setStatus(statusTypes.DEFAULT);
        post.points--;
        break;
      }
      case statusTypes.DISLIKED: {
        db.collection("posts")
          .doc(post.id)
          .update({ points: post.points + 2 })
          .then(console.log("Successfully changed downvote to upvote"))
          .catch(console.log("Couldn't change downvote to upvote"));
        setStatus(statusTypes.LIKED);
        post.points += 2;
        break;
      }
      default: {
        db.collection("posts")
          .doc(post.id)
          .update({ points: post.points + 1 })
          .then(console.log("Successfully upvoted"))
          .catch(console.log("Couldn't upvote"));
        setStatus(statusTypes.LIKED);
        post.points++;
      }
    }
  };

  const handleDislike = () => {
    switch (status) {
      case statusTypes.LIKED: {
        db.collection("posts")
          .doc(post.id)
          .update({ points: post.points - 2 })
          .then(console.log("Successfully changed upvote to downvote"))
          .catch(console.log("Couldn't change upvote to downvote"));
        setStatus(statusTypes.DISLIKED);
        post.points -= 2;
        break;
      }
      case statusTypes.DISLIKED: {
        db.collection("posts")
          .doc(post.id)
          .update({ points: post.points + 1 })
          .then(console.log("Successfully undid downvote"))
          .catch(console.log("Couldn't undo downvote"));
        setStatus(statusTypes.DEFAULT);
        post.points++;
        break;
      }
      default: {
        db.collection("posts")
          .doc(post.id)
          .update({ points: post.points - 1 })
          .then(console.log("Successfully downvoted"))
          .catch(console.log("Couldn't downvote"));
        setStatus(statusTypes.DISLIKED);
        post.points--;
      }
    }
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
            <Text alignSelf="center">{post.points}</Text>
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
