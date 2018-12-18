// App.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import * as firebase from 'firebase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SignIn from './SignIn';
import WordSearch from './WordSearch';
import MyZutan from './MyZutan';

// AppDiv
const AppDiv = styled.div`
  width: 100%;
  height: 100%;
`;

// AppToolbar
const AppToolbar = styled(Toolbar)`
  && {
    display: flex;
    justify-content: flex-end;
  }
` as any;

// App
interface AppState {
  isSignedIn: boolean;
  isShowMyZutan: boolean;
}
class App extends Component<any, AppState> {

  // App()
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      isShowMyZutan: false
    }
    this.onMyZutanButtonClicked = this.onMyZutanButtonClicked.bind(this);
  }

  // render()
  render() {
    const signInNeeded = this.props.isMock ?
      false : !this.state.isSignedIn;
    const isShowMyZutan = this.state.isShowMyZutan;
    const AppMain = (
      <div>
        <AppBar position="static">
          <AppToolbar>
            <IconButton
              color="inherit"
              onClick={this.onMyZutanButtonClicked}>
              <BookmarksIcon />
            </IconButton>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </AppToolbar>
        </AppBar>
        {
          isShowMyZutan ?
            <MyZutan /> : 
            <WordSearch isMock={this.props.isMock} />
        }
      </div>
    );
    return (
      <AppDiv>
        {signInNeeded ?  <SignIn /> : AppMain}
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

  // onMyZutanButtonClicked()
  onMyZutanButtonClicked(): void {
    this.setState({isShowMyZutan: true});
  }
}

export default App;
