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

export default function Create() {
  const [textPost, setTextPost] = useState({ title: "", body: "" });
  const [imagePost, setImagePost] = useState({ title: "" });
  const handleTextChange = (nextValue) => {
    console.log(nextValue);
    setTextPost(nextValue);
  };
  const handleTextSubmit = () => {
    console.log(textPost);
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
