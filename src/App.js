import { Grommet, Box } from "grommet";
import React from "react";
import { Provider, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { createStore } from "redux";
import "./App.css";
import Account from "./components/Account";
import Create from "./components/Create";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Saved from "./components/Saved";
import { reducer } from "./utils/reducers";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const theme = {
  global: {
    colors: { brand: "#228BE6" },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};
function App() {
  return (
    <Provider store={store}>
      <Grommet theme={theme}>
        <Router>
          <Box fill>
            <Navbar />
            <Box flex overflow="auto">
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/login" component={Login} />

                <PrivateRoute exact path="/saved">
                  <Saved />
                </PrivateRoute>

                <PrivateRoute exact path="/create">
                  <Create />
                </PrivateRoute>
                <PrivateRoute exact path="/account">
                  <Account />
                </PrivateRoute>
              </Switch>
            </Box>
          </Box>
        </Router>
      </Grommet>
    </Provider>
  );
}

function PrivateRoute({ children, ...rest }) {
  const login = useSelector((state) => state.login);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (login) {
          return children;
        } else {
          return (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          );
        }
      }}
    />
  );
}

export default App;
