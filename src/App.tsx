// App.tsx

import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import styled from 'styled-components'
import * as firebase from 'firebase';
import SignIn from './SignIn';
import WordSearch from './WordSearch';
import MyZutan from './MyZutan';

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
    const isMock = this.props.isMock;
    const signInNeeded = isMock ?  false : !this.state.isSignedIn;
    // material-ui
    const generateClassName = createGenerateClassName({
      // XXX: Without this, the style of <Grid> in SearchResultRow 
      //      will break in production build.
      // # cleaner fix needed
      dangerouslyUseGlobalCSS: true
    });
    const jss = create({
      ...jssPreset(),
      insertionPoint: document.getElementById('jss-insertion-point')!
    });
    // AppMain
    const AppMain = (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Route exact path="/" render={({history}) =>
            <WordSearch
              history={history}
              isMock={isMock} />}
          />
          <Route path="/myzutan" render={({history}) =>
            <MyZutan
              history={history}
              isMock={isMock} />}
          />
        </div>
      </Router>
    );
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
