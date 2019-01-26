// MyZutan.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import withWidth from '@material-ui/core/withWidth';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as firebase from 'firebase';

import {mockMyZutanObjects} from './mockData';
import AppBar from './AppBar';
import MyZutanRow from './MyZutanRow';

// MyZutanDiv
const MyZutanDiv = styled.div`
  margin: 10px;
`;
// ProgressDiv
const ProgressDiv = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

// MyZutan
interface MyZutanState {
  zutanObjects: any[];
  isZutanObjectsReady: boolean;
}
class MyZutan extends Component<any, MyZutanState> {

  // MyZutan
  constructor(props) {
    super(props);
    this.state = {
      zutanObjects: [],
      isZutanObjectsReady: false
    };
    this.onClickHome = this.onClickHome.bind(this);
    this.onClickMyZutan = this.onClickMyZutan.bind(this);
  }

  // componentDidMount()
  componentDidMount() {
    if (this.props.isMock) {
      this.loadZutanMockObjects();
    } else {
      this.loadZutanObjects();
    }
  }

  // render()
  render() {
    if (!this.state.isZutanObjectsReady) {
      return (
        <div>
          <AppBar
            onClickHome={this.onClickHome}
            onClickMyZutan={this.onClickMyZutan} />
          <ProgressDiv>
            <CircularProgress disableShrink />
          </ProgressDiv>
        </div>
      );
    } else {
      // words
      let words: string[] = [];
      let word2urls = {};
      this.state.zutanObjects.forEach((obj) => {
        if (word2urls.hasOwnProperty(obj.word)) {
          word2urls[obj.word].push(obj.imageURL);
        } else {
          word2urls[obj.word] = [obj.imageURL];
          words.push(obj.word);
        }
      })
      words.sort();
      // wordRows
      let wordRows: string[][] = [];
      const width = this.props.width;
      let unit;
      if (width === 'xs') {
        unit = 1;
      } else {
        unit = 3;
      }
      words.forEach((word, i) => {
        if (i % unit === 0) {
          wordRows.push([]);
        }
        wordRows[wordRows.length - 1].push(word);
      });
      //
      return (
        <div>
          <AppBar
            onClickHome={this.onClickHome}
            onClickMyZutan={this.onClickMyZutan} />
          <MyZutanDiv>
            {
              wordRows.map((words, i) => (
                <MyZutanRow
                  key={i}
                  words={words}
                  word2urls={word2urls}>
                </MyZutanRow>
              ))
            }
          </MyZutanDiv>
        </div>
      );
    }
  }

  // loadZutanObjects()
  private loadZutanObjects(): void {
    // TODO: props?
    const user = firebase.auth().currentUser; 
    if (user !== null) {
      const zutan = firebase.firestore()
        .collection('users').doc(user.uid)
        .collection('zutan');
      zutan.get().then((snapshot) => {
        let objs: any[] = []
        snapshot.forEach((doc) => {
          let data = doc.data()
          objs.push({
            word: data.word,
            imageURL: data.imageURL
          });
        })
        this.setState({
          zutanObjects: objs,
          isZutanObjectsReady: true
        });
      });
    }
  }
  
  // loadZutanMockObjects()
  private loadZutanMockObjects(): void {
    this.setState({
      zutanObjects: mockMyZutanObjects,
      isZutanObjectsReady: true
    });
  }

  // onClickHome()
  onClickHome() {
    this.props.history.push('/');
  }

  // onClickMyZutan()
  onClickMyZutan() {
    this.props.history.push('/myzutan');
  }
}

export default withWidth()(MyZutan);
