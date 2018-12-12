// App.js

import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import SignIn from './SignIn';
import WordSearch from './WordSearch';
import logoImage from './images/logo.png';

// App
class App extends Component {

  // App()
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    }
  }

  // render()
  render() {
    const isSignedIn = this.state.isSignedIn;
    return (
      <div className="App">
        <div className="logo">
          <img
            className="logo_img"
            src={logoImage}
            alt="logo">
          </img>
        </div>
        {isSignedIn ? <WordSearch /> : <SignIn />}
      </div>
    );
  }

  // componentDidMount()
  componentDidMount() {
    document.title = 'Zutan';
    this.addFirebaseAuthListener();
  }

  // addFirebaseAuthListener()
  addFirebaseAuthListener() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged:', user);
      if (user) {
        this.setState({isSignedIn: true});
      } else {
        this.setState({isSignedIn: false});
      }
    });
  }

}

export default App;
