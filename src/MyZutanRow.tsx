// MyZutanRow.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';
import MUIGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
import MUISearchIcon from '@material-ui/icons/Search';
import MUIDeleteIcon from '@material-ui/icons/Delete';

// RowDiv
const RowDiv = styled.div`
  margin: 10px 0;
`;
// GridList
const GridList = styled(MUIGridList)`
  flex-wrap: nowrap;
` as any;
// WordImg
// XXX: object-position
const WordImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  padding: 0 10px;
  object-fit: contain;
  object-position: 0 50%;
`;
// SearchIcon
const SearchIcon = styled(MUISearchIcon)`
  position: absolute;
  right: 5px;
` as any;
// DeleteIcon
const DeleteIcon = styled(MUIDeleteIcon)`
  position: absolute;
  right: 5px;
` as any;

////

// MyZutanRowProps
interface MyZutanRowProps {
  words: string[];
  word2urls: {[word: string]: string[]};
}

// MyZutanRowState
interface MyZutanRowState {
  anchorEl: HTMLElement | null;
}

// MyZutanRow
class MyZutanRow extends Component<MyZutanRowProps, MyZutanRowState> {

  // MyZutanRow()
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }
    this.onMenuClosed = this.onMenuClosed.bind(this);
    this.onShowMenuClicked = this.onShowMenuClicked.bind(this);
    this.onWeblioClicked = this.onWeblioClicked.bind(this);
  }

  // render()
  render() {
    const {words, word2urls} = this.props;
    const {anchorEl} = this.state;
    const bShow = Boolean(anchorEl);
    return (
      <RowDiv>
        <Grid container spacing={16}>{ words.map((word) => (
          <Grid key={word} item xs>
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
                            <SearchIcon />
                          </ListItemIcon>
                          <ListItemText primary="Weblio" />
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon>
                            <DeleteIcon />
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
                <GridList cols={1.2}>
                  {word2urls[word].map(url => (
                    <GridListTile key={url}>
                      <WordImg src={url} alt={word} />
                    </GridListTile>
                  ))}
                </GridList>
              </CardContent>
            </Card>
          </Grid>
        ))}</Grid>
      </RowDiv>
    );
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

export default MyZutanRow;
