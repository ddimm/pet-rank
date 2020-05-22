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
  const [isDeleted, setIsDeleted] = useState(false);
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

  const handleDelete = () => {
    db.collection("posts")
      .doc(post.id)
      .delete()
      .then(() => {
        console.log("Post successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    setIsDeleted(true);
  };
  if (!isDeleted)
    return (
      <Box
        border={{ color: "brand", size: "medium" }}
        background="light-3"
        elevation="medium"
        margin={{ vertical: "small", horizontal: "small" }}
        pad="small"
        round="small"
      >
        <Stack anchor="bottom-right" fill>
          <Box>
            <Heading level={4}>{newPost.title}</Heading>
          </Box>
          <Box gap="small">
            <Button
              color="neutral-2"
              secondary
              label="Edit"
              onClick={handleEdit}
            />
            <Button
              color="status-critical"
              primary
              label="Delete"
              onClick={handleDelete}
            />
          </Box>
        </Stack>
        {edit && (
          <Layer
            margin="small"
            onEsc={() => setEdit(false)}
            onClickOutside={() => setEdit(false)}
          >
            <Box gap="small" margin="medium" width="40vw">
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
                <Box gap="small" direction="row">
                  <Button primary label="Save" type="submit" />
                  <Button label="Cancel" onClick={() => setEdit(false)} />
                </Box>
              </Form>
            </Box>
          </Layer>
        )}
      </Box>
    );

  return <></>;
}
