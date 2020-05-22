import { Box, Button, Heading, Image, Stack } from "grommet";
import { Bookmark, Dislike, Like } from "grommet-icons";
import React, { useState } from "react";

const statusTypes = {
  LIKED: "liked",
  DISLIKED: "disliked",
  DEFAULT: "default",
};

export default function ImagePost({ title, imageUrl }) {
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
    console.log("liked!", status);
  };

  const handleDislike = () => {
    if (isDisliked()) setStatus(statusTypes.DEFAULT);
    else setStatus(statusTypes.DISLIKED);
  };

  const handleSave = () => {
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
            <Heading>{title}</Heading>
            <Image src={imageUrl} />
          </Box>
          <Box direction="row" gap="medium">
            <Button
              icon={<Like size="large" color={isLiked() ? "brand" : "plain"} />}
              hoverIndicator
              onClick={handleLike}
            />
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
