// App.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import * as firebase from 'firebase';
import SignIn from './SignIn';
import WordSearch from './WordSearch';

// AppDiv
const AppDiv = styled.div`
  width: 100%;
  height: 100%;
`;

// App
interface AppState {
  isSignedIn: boolean;
}
class App extends Component<any, AppState> {

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
      <AppDiv>
        {isSignedIn ? <WordSearch /> : <SignIn />}
      </AppDiv>
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
