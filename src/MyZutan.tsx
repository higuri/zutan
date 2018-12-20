// MyZutan.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import * as firebase from 'firebase';
import * as mockData from './mockData';

const ImagesDiv = styled.div`
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: flex-start;
` as any;
// ImageCard
const ImageCard = styled(Card)`
  && {
    margin: 5px;
  }
` as any;
// WordImg
const WordImg = styled.img`
  display: block;
  width: 100px;
  object-fit: contain;
`;
// MoreImgIconButton
const MoreImgIconButton = styled(IconButton)`
  && {
    margin-left: auto;
  }
` as any;

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
    return (
      <ImagesDiv>
        {
          words.map((word, i) => (
            <ImageCard
              raised
              key={i} >
							<CardHeader
								avatar={
									<Avatar aria-label="Word">
										{word[0] && word[0].toUpperCase()}
									</Avatar>
								}
								title={word}
							/>
              <CardContent>
               <WordImg src={word2urls[word][0]} />
              </CardContent>
              <CardActions>
                {
                  1 < word2urls[word].length && (
                    <MoreImgIconButton>
                      <MoreHorizIcon />
                    </MoreImgIconButton>
                  )
                }
              </CardActions>
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
