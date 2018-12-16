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
firebase.initializeApp(firebaseConfig);
ReactDOM.render(<App isMock={false} />, document.getElementById('root'));
