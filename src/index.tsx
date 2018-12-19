// index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import './index.css';
import App from './App';
import {GOOGLE_FIREBASE_API_KEY} from './apikeys';

const firebaseConfig = {
  apiKey: GOOGLE_FIREBASE_API_KEY,
  authDomain: 'zu-tan.firebaseapp.com',
  projectId: 'zu-tan',
};
require("firebase/firestore");
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({
  timestampsInSnapshots: true
});
let isMock = false;
console.log('process.env.REACT_APP_MOCK: ' + process.env.REACT_APP_MOCK)
if (process.env.REACT_APP_MOCK) {
  isMock = true;
}
ReactDOM.render(<App isMock={isMock} />, document.getElementById('root'));
