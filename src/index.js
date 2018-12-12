import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import './index.css';
import App from './App';
import {GOOGLE_FIREBASE_API_KEY} from './apikeys.js';

const config = {
  apiKey: GOOGLE_FIREBASE_API_KEY,
  authDomain: 'zu-tan.firebaseapp.com',
  projectId: 'zu-tan',
};
firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));
