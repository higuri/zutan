// MyZutan.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import withWidth from '@material-ui/core/withWidth';
import * as firebase from 'firebase';
import * as mockData from './mockData';
import MyZutanRow from './MyZutanRow';

// MyZutanDiv
const MyZutanDiv = styled.div`
  margin: 10px;
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
      // TODO: loading
      return null;
    }
    // sortedWords
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
    // TODO: rows for up(middle)
    /*
    const width = this.props.width;
    let unit;
    switch (width) {
      case 'xs':
        unit = 1;
        break;
      default:
        unit = 3;
        break;
    }
    words.forEach((word, i) => {
      if (i % unit === 0) {
        rows.push([]);
      }
      rows[rows.length - 1].push(word);
    });
    */
    //
    return (
      <MyZutanDiv>
        {
          words.map(word => (
            <MyZutanRow
              key={word}
              word={word}
              urls={word2urls[word]}>
            </MyZutanRow>
          ))
        }
      </MyZutanDiv>
    );
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
      zutanObjects: mockData.zutanObjects,
      isZutanObjectsReady: true
    });
  }
}

export default withWidth()(MyZutan);
