// App.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import * as firebase from 'firebase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
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
    this.onHomeButtonClicked = this.onHomeButtonClicked.bind(this);
  }

  // render()
  render() {
		const isMock = this.props.isMock;
    const signInNeeded = isMock ?  false : !this.state.isSignedIn;
    const isShowMyZutan = this.state.isShowMyZutan;
    const AppMain = (
      <div>
        <AppBar position="static">
          <AppToolbar>
            {/*
              isShowMyZutan ? (
                <TextField
                  placeholder="Zu..."
                  style={{backgroundColor: 'white'}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon
                          onClick={this.onSearchButtonClicked}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              ) : null
            */}
              
            <IconButton
              color="inherit"
              onClick={this.onMyZutanButtonClicked}>
              <PhotoLibraryIcon />
            </IconButton>
            <IconButton color="inherit"
              onClick={this.onHomeButtonClicked}>
              <HomeIcon />
            </IconButton>
          </AppToolbar>
        </AppBar>
        {
          isShowMyZutan ?
            <MyZutan isMock={isMock} /> : 
            <WordSearch isMock={isMock} />
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
    this.addFirebaseAuthListener();
  }

  // addFirebaseAuthListener()
  addFirebaseAuthListener() {
    firebase.auth().onAuthStateChanged((user) => {
      //console.log('onAuthStateChanged:', user);
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

  // onHomeButtonClicked()
  onHomeButtonClicked(): void {
    this.setState({isShowMyZutan: false});
  }
}

export default App;
