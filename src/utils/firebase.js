const firebase = require("firebase");
const firebaseui = require("firebaseui");
// Required for side-effects
require("firebase/firestore");

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
};

firebase.initializeApp(config);
const ui = new firebaseui.auth.AuthUI(firebase.auth());

export { firebase, ui };
