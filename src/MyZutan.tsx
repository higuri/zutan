// MyZutan.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import * as firebase from 'firebase';
import * as mockData from './mockData';

const ImagesDiv = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
` as any;
// ImageCard
const ImageCard = styled(Card)`
  && {
    margin: 20px;
  }
` as any;
// WordImg
const WordImg = styled.img`
  width: 200px;
  object-fit: contain;
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
    return (
      <ImagesDiv>
        {
          this.state.zutanObjects.map((obj, i) => (
            /* TODO:  obj.word */
            <ImageCard
              raised
              key={i} >
							<CardHeader
								avatar={
									<Avatar aria-label="Word">
										{obj.word[0] && obj.word[0].toUpperCase()}
									</Avatar>
								}
								title={obj.word}
							/>
              <CardContent>
                <WordImg src={obj.imageURL} />
              </CardContent>
            </ImageCard>
          ))
        }
      </ImagesDiv>
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

export default MyZutan;
