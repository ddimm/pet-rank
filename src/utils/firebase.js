const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
};

firebase.initializeApp(config);
export default firebase;
