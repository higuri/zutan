// MyZutan.tsx

import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as mockData from './mockData';

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
    const elems = this.state.zutanObjects.map((item, i) => {
      return (
        <div key={i}>
          <h2>{item.word}</h2>
          <img src={item.imageURL} />
        </div>
      )
    });
    return <div>{elems}</div>;
  }

  // loadZutanObjects()
  private loadZutanObjects(): void {
    const zutan = firebase.firestore()
      .collection('users').doc('test-user')
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
  
  // loadZutanMockObjects()
  private loadZutanMockObjects(): void {
    this.setState({
      zutanObjects: mockData.zutanObjects,
      isZutanObjectsReady: true
    });
  }
}

export default MyZutan;
