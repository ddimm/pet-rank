import React, { useState, useEffect } from "react";
import { firebase } from "../utils/firebase";
export default function Homepage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .limit(20)
      .get()
      .then((posts) => {
        setData(
          posts.docs.map((value, index) => {
            return value.data();
          })
        );
      })
      .catch(() => {
        console.log("couldn't fetch posts");
      });
  }, []);
  if (data.length > 0) {
    return (
      <div>
        {data.map((item, index) => {
          return <pre key={index}>{JSON.stringify(item, null, 4)}</pre>;
        })}
      </div>
    );
  } else {
    return <div>Posts should go here</div>;
  }
}
