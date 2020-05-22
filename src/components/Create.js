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
import { firebase } from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
export default function Create() {
  const [textPost, setTextPost] = useState({ title: "", body: "" });
  const [imagePost, setImagePost] = useState({ title: "" });
  const handleTextChange = (nextValue) => {
    setTextPost(nextValue);
  };
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
  };

  const handleImageChange = (nextValue) => {
    setImagePost(nextValue);
  };
  const handleImageSubmit = () => {
    console.log(imagePost);
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
            <FormField name="textTitle" label="Title">
              <TextInput name="title" />
            </FormField>
            <FormField name="body" label="Body">
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
            <FormField name="imageTitle" label="Title">
              <TextInput name="title" />
            </FormField>

            <Button type="submit" primary label="Post" />
          </Form>
        </Tab>
      </Tabs>
    </Box>
  );
}
