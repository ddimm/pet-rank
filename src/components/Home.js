import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  return (
    <div>
      <h2>Posts</h2>
      <button
        onClick={() => {
          history.push("/create");
        }}
      >
        write post
      </button>
    </div>
  );
}
