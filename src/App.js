import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Header from "./components/Header";
import { reducer } from "./utils/reducers";

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <Header />
    </Provider>
  );
}

export default App;
