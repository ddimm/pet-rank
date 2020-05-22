import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  TextArea,
  Button,
  Form,
  FormField,
  TextInput,
} from "grommet";
import { useHistory } from "react-router-dom";
import { firebase } from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
const storeageRef = firebase.storage().ref();
export default function Create() {
  const [textPost, setTextPost] = useState({ title: "", body: "" });
  const [imagePost, setImagePost] = useState({ title: "", file: null });
  const handleTextChange = (nextValue) => {
    setTextPost(nextValue);
  };
  const history = useHistory();
  const handleTextSubmit = () => {
    //write post to firestore
    firebase
      .firestore()
      .collection("posts")
      .doc(uuidv4())
      .set({
        userId: firebase.auth().currentUser.uid,
        dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
        points: 10,
        type: "text",
        createdBy: firebase.auth().currentUser.displayName,
        ...textPost,
      })
      .then(() => {
        console.log("text post submitted");
      })
      .catch(() => {
        console.log("text post not submitted");
      });
    history.push("/");
  };

  const handleImageChange = (nextValue) => {
    console.log(nextValue);
    setImagePost(nextValue);
  };

  const handleImageSubmit = () => {
    console.log(imagePost);

    let filetoUpload = imagePost.file;

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
          firebase
            .firestore()
            .collection("posts")
            .doc(uuidv4())
            .set({
              userId: firebase.auth().currentUser.uid,
              dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
              points: 10,
              type: "image",
              createdBy: firebase.auth().currentUser.displayName,
              fileUrl: downloadUrl,
              title: imagePost.title,
            });
        });
      }
    );
    history.push("/");
  };

  return (
    <Box margin="large">
      <Tabs>
        <Tab title="text">
          <Form
            value={textPost}
            onChange={handleTextChange}
            onSubmit={handleTextSubmit}
          >
            <FormField name="title" label="Title" required={true}>
              <TextInput name="title" />
            </FormField>
            <FormField name="body" label="Body" required={false}>
              <TextArea name="body" />
            </FormField>
            <Button type="submit" primary label="Post" />
          </Form>
        </Tab>
        <Tab title="image">
          <Form
            value={imagePost}
            onSubmit={handleImageSubmit}
            onChange={handleImageChange}
          >
            <FormField name="title" label="Title" required={true}>
              <TextInput name="title" />
            </FormField>

            <input
              type="file"
              name="file"
              onChange={(e) => {
                setImagePost({ ...imagePost, file: e.target.files[0] });
              }}
            ></input>

            <Button type="submit" primary label="Post" />
          </Form>
        </Tab>
      </Tabs>
    </Box>
  );
}
