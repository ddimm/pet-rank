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
} from "grommet";
import { firebase } from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
const storeageRef = firebase.storage().ref();

const db = firebase.firestore();

export default function EditImagePost({ post }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newPost, setNewPost] = useState({
    title: post.title,
    fileUrl: post.fileUrl,
  });
  const handleEdit = () => {
    setEdit(true);
  };
  const handlePostChange = (nextValue) => {
    console.log(nextValue);
    setNewPost(nextValue);
  };
  const handleSave = () => {
    let filetoUpload = newPost.file;

    const newImageRef = storeageRef.child(`images/${uuidv4()}`);
    const metaData = {
      contentType: filetoUpload.type,
    };
    const uploadTask = newImageRef.put(filetoUpload, metaData);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      function (error) {
        console.log(error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          db.collection("posts").doc(post.id).update({
            fileUrl: downloadUrl,
            title: newPost.title,
          });
        });
      }
    );
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
            <Heading level={4}>{post.title}</Heading>
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
            <Form
              value={newPost}
              onChange={handlePostChange}
              onSubmit={handleSave}
            >
              <FormField name="title" label="Title" required={true}>
                <TextInput name="title" />
              </FormField>
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  setNewPost({ ...newPost, file: e.target.files[0] });
                }}
              ></input>
              <Button primary label="Save" onClick={handleSave} />
              <Button label="Cancel" onClick={() => setEdit(false)} />
            </Form>
          </Layer>
        )}
      </Box>
    );

  return <></>;
}
