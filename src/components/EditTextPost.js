import React, { useState } from "react";
import {
  Box,
  Heading,
  Stack,
  Button,
  Layer,
  Form,
  FormField,
  TextInput,
  TextArea,
} from "grommet";
import { firebase } from "../utils/firebase";

const db = firebase.firestore();

export default function EditTextPost({ post }) {
  const [edit, setEdit] = useState(false);
  const [newPost, setNewPost] = useState({
    title: post.title,
    body: post.body,
  });
  const handleEdit = () => {
    setEdit(true);
  };
  const handlePostChange = (nextValue) => {
    console.log(nextValue);
    setNewPost(nextValue);
  };
  const handleSave = () => {
    db.collection("posts")
      .doc(post.id)
      .update({ title: newPost.title, body: newPost.body })
      .then(console.log("Successfully edited post"))
      .catch(console.log("Couldn't edit post"));
    setEdit(false);
  };
  return (
    <Box
      border={{ color: "brand", size: "medium" }}
      background="light-3"
      elevation="medium"
      margin={{ vertical: "small", horizontal: "small" }}
      pad="small"
      round="small"
    >
      <Stack anchor="bottom-right">
        <Box fill={true}>
          <Heading level={4}>{newPost.title}</Heading>
        </Box>
        <Box direction="row" gap="medium">
          <Button
            color="neutral-2"
            secondary
            label="Edit"
            onClick={handleEdit}
          />
        </Box>
      </Stack>
      {edit && (
        <Layer
          margin="small"
          onEsc={() => setEdit(false)}
          onClickOutside={() => setEdit(false)}
        >
          <Form
            value={newPost}
            onChange={handlePostChange}
            onSubmit={handleSave}
          >
            <FormField name="title" label="Title" required={true}>
              <TextInput name="title" />
            </FormField>
            <FormField name="body" label="Body" required={false}>
              <TextArea name="body" />
            </FormField>
            <Button primary label="Save" type="submit" />
            <Button label="Cancel" onClick={() => setEdit(false)} />
          </Form>
        </Layer>
      )}
    </Box>
  );
}
