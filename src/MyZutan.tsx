// MyZutan.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import withWidth from '@material-ui/core/withWidth';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import * as firebase from 'firebase';

import {mockMyZutanObjects} from './mockData';
import AppBar from './AppBar';

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
// WordImg
// XXX: object-position
const WordImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  padding: 0 10px;
  object-fit: contain;
  object-position: 0 50%;
`;
// ASearchIcon
const ASearchIcon = styled(SearchIcon)`
  position: absolute;
  right: 5px;
` as any;
// ADeleteIcon
const ADeleteIcon = styled(DeleteIcon)`
  position: absolute;
  right: 5px;
` as any;
// AGridList
const AGridList = styled(GridList)`
  flex-wrap: nowrap;
` as any;

// MyZutan
interface MyZutanState {
  zutanObjects: any[];
  anchorEl: HTMLElement | null;
  isZutanObjectsReady: boolean;
}
class MyZutan extends Component<any, MyZutanState> {

  // MyZutan
  constructor(props) {
    super(props);
    this.state = {
      zutanObjects: [],
      isZutanObjectsReady: false,
      anchorEl: null
    }
    this.onMenuClosed = this.onMenuClosed.bind(this);
    this.onShowMenuClicked = this.onShowMenuClicked.bind(this);
    this.onWeblioClicked = this.onWeblioClicked.bind(this);
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
      const width = this.props.width;
      let cols;
      switch (width) {
        case 'xs':
          cols = 1;
          break;
        case 'sm':
          cols = 3;
          break;
        default:
          cols = 4;
          break;
      }
      const {anchorEl} = this.state;
      const bShow = Boolean(anchorEl);
      //
      return (
        <div>
          <AppBar
            onClickHome={this.onClickHome}
            onClickMyZutan={this.onClickMyZutan} />
          <MyZutanDiv>
            <GridList cols={cols} cellHeight={300} spacing={16}> { words.map((word, i) =>
              <GridListTile key={word}>
                <Card raised>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="Word">
                        {word[0] && word[0].toUpperCase()}
                      </Avatar>
                    }
                    action={
                      <div>
                        <IconButton
                          onClick={this.onShowMenuClicked}>
                          <MoreVertIcon />
                        </IconButton>
                        <MenuList>
                          <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            open={bShow}
                            onClose={this.onMenuClosed}
                          >
                            <MenuItem onClick={() => {
                              this.onWeblioClicked(word)
                            }}>
                              <ListItemIcon>
                                <ASearchIcon />
                              </ListItemIcon>
                              <ListItemText primary="Weblio" />
                            </MenuItem>
                            <MenuItem>
                              <ListItemIcon>
                                <ADeleteIcon />
                              </ListItemIcon>
                              <ListItemText primary="Delete (TODO)" />
                            </MenuItem>
                          </Menu>
                        </MenuList>
                      </div>
                    }
                    title={word}
                  />
                  <CardContent>
                    <AGridList cols={1.2}>
                      {word2urls[word].map(url => (
                        <GridListTile key={url}>
                          <WordImg src={url} alt={word} />
                        </GridListTile>
                      ))}
                    </AGridList>
                  </CardContent>
                </Card>
              </GridListTile> )}
            </GridList>
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
  private onClickHome() {
    this.props.history.push('/');
  }

  // onClickMyZutan()
  private onClickMyZutan() {
    this.props.history.push('/myzutan');
  }

  // onMenuClosed()
  private onMenuClosed(): void {
    this.setState({ anchorEl: null });
  }

  // onShowMenuClicked()
  // TODO: any -> MouseEvent<HTMLElement> ??
  private onShowMenuClicked(evt: any): void {
    this.setState({ anchorEl: evt.currentTarget });
  }

  // onWeblioClicked()
  private onWeblioClicked(word: string): void {
    window.open('https://ejje.weblio.jp/content/' + word);
    this.onMenuClosed();
  }
}

export default withWidth()(MyZutan);
