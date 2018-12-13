// SignIn.tsx

import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

// SignIn
interface SignInState {
  firebaseUIShown: boolean;
}
class SignIn extends Component<any, SignInState> {

  // firebaseUI:
  private firebaseUI: firebaseui.auth.AuthUI;

  // firebaseUIConfig
  firebaseUIConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log('signInSuccessWithAuthResult:', authResult);
        this.firebaseUI.reset();
        return false;
      },
      uiShown: () => {
        this.setState({firebaseUIShown: true});
      }
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
  };


  // SignIn()
  constructor(props) {
    super(props);
    this.state = {
      firebaseUIShown: false
    }
    this.firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
  }

  // render()
  render() {
    const uiShown = this.state.firebaseUIShown;
    return (
      <div>
        <div className="firebaseui-auth-container"></div>
        {!uiShown && <div>Loading...</div>}
      </div>
    );
  }

  // componentDidMount()
  componentDidMount() {
    this.startFirebaseUI();
  }

  // componentWillUnmount()
  componentWillUnmount() {
    this.stopFirebaseUI();
  }

  // startFirebaseUI()
  startFirebaseUI() {
    this.firebaseUI.start(
      '.firebaseui-auth-container',
      this.firebaseUIConfig);
  }

  // stopFirebaseUI()
  stopFirebaseUI() {
    this.firebaseUI.reset();
  }
}

export default SignIn;
