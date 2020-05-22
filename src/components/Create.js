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

export default function Create() {
  const [textPost, setTextPost] = useState({ title: "", body: "" });
  const [imagePost, setImagePost] = useState({ title: "" });

  const history = useHistory();

  const handleTextChange = (nextValue) => {
    console.log(nextValue);
    setTextPost(nextValue);
  };

  const handleTextSubmit = () => {
    console.log(textPost);
    //write post to firestore
    firebase
      .firestore()
      .collection("posts")
      .doc(uuidv4())
      .set({
        userId: firebase.auth().currentUser.uid,
        dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
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
            <FormField name="textTitle" label="Title" required={true}>
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
            <FormField name="imageTitle" label="Title" required={true}>
              <TextInput name="title" />
            </FormField>

            <Button type="submit" primary label="Post" />
          </Form>
        </Tab>
      </Tabs>
    </Box>
  );
}
