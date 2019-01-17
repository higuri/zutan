// App.tsx

import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
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
  display: flex;
  justify-content: flex-end;
` as any;

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
    const isMock = this.props.isMock;
    const signInNeeded = isMock ?  false : !this.state.isSignedIn;
    // AppMain
    const AppMain = (
      <Router>
        <div>
          <Route render={({history}) => (
            <AppBar position="static">
              <AppToolbar>
                <IconButton
                  color="inherit"
                  onClick={() => history.push('/myzutan')}>
                  <PhotoLibraryIcon />
                </IconButton>
                <IconButton color="inherit"
                  onClick={() => history.push('/')}>
                  <HomeIcon />
                </IconButton>
              </AppToolbar>
            </AppBar>
          )} />
          <Route
            exact path="/" 
            render={() => <WordSearch isMock={isMock} />} />
          <Route
            path="/myzutan" 
            render={() => <MyZutan isMock={isMock} />} />
        </div>
      </Router>
    );
    // material-ui
    const generateClassName = createGenerateClassName();
    const jss = create({
      ...jssPreset(),
      insertionPoint: document.getElementById('jss-insertion-point')!
    });
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <AppDiv>
          {signInNeeded ?  <SignIn /> : AppMain}
        </AppDiv>
      </JssProvider>
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
}

export default App;
