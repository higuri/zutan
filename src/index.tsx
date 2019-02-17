// index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import './index.css';
import App from './App';
import * as apikeys from './apikeys';

const apikeysValid = (() => {
  let retval = true;
  Object.keys(apikeys).forEach((key) => {
    if (apikeys[key] === '') {
      retval = false;
    }
  });
  return retval;
})();
const firebaseConfig = {
  apiKey: apikeys.GOOGLE_FIREBASE_API_KEY,
  authDomain: 'zu-tan.firebaseapp.com',
  projectId: 'zu-tan'
};
require("firebase/firestore");
let isMock = false;
console.log('process.env.REACT_APP_MOCK: ' + process.env.REACT_APP_MOCK);
console.log('process.env.PUBLIC_URL: ' + process.env.PUBLIC_URL);
if (process.env.REACT_APP_MOCK) {
  isMock = true;
}
if (!isMock) {
  if (!apikeysValid) {
    console.error('"apikeys.js" is not configured properly. ' +
      ' Follow the zutan/README.');
  }
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({
    timestampsInSnapshots: true
  });
}
ReactDOM.render(<App isMock={isMock} />, document.getElementById('root'));
