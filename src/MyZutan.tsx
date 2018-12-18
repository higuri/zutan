// MyZutan.tsx

import React, { Component } from 'react';
import * as firebase from 'firebase';

// MyZutan
interface MyZutanState {
  items: any[];
  isItemsReady: boolean;
}
class MyZutan extends Component<any, MyZutanState> {

  // MyZutan
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isItemsReady: false
    };
    const zutan = firebase.firestore()
      .collection('users').doc('test-user')
      .collection('zutan');
    zutan.get().then((snapshot) => {
      let items: any[] = []
      snapshot.forEach((doc) => {
        let data = doc.data()
        items.push({
          word: data.word,
          imageURL: data.imageURL
        });
      })
      this.setState({
        items: items,
        isItemsReady: true
      });
    });
  }

  // render()
  render() {
    if (!this.state.isItemsReady) {
      // TODO: loading
      return null;
    }
    const elems = this.state.items.map((item) => {
      return (
        <div>
          <h2>{item.word}</h2>
          <img src={item.imageURL} />
        </div>
      )
    });
    return <div>{elems}</div>;
  }
}

export default MyZutan;
