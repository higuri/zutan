// index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import './index.css';
import App from './App';
import * as config from './config';

console.log('process.env.REACT_APP_MOCK: ' + process.env.REACT_APP_MOCK);
console.log('process.env.PUBLIC_URL: ' + process.env.PUBLIC_URL);

let isMock = false;
if (process.env.REACT_APP_MOCK) {
  isMock = true;
} else {
  require("firebase/firestore");
  // @ts-ignore: will always return 'true' when config.js set.
  const isValidConfig = (config.GOOGLE_CUSTOM_SEARCH_API_KEY !== '' && config.GOOGLE_CUSTOM_SEARCH_ENGINE_ID !== '' && Object.keys(config.FIREBASE_CONFIG).filter(v => v === '').length === 0);
  if (isValidConfig) {
    firebase.initializeApp(config.FIREBASE_CONFIG);
    firebase.firestore().settings({
      timestampsInSnapshots: true
    });
  } else {
    console.error('"config.js" is not configured properly. ' +
      ' Follow the zutan/README.');
  }
}
ReactDOM.render(<App isMock={isMock} />, document.getElementById('root'));
