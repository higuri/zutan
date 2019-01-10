// MyZutanRow.tsx

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// styles
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: '10px'
  },
  gridList: {
    flexWrap: 'nowrap'
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
    margin: '0 10px',
    objectFit: 'contain',
    objectPosition: '0 50%'
  }
}) as any;

// MyZutanRowProps
interface MyZutanRowProps {
  classes: any;
  // TODO
  // words: string[];
  // word2urls: {[word: string]: string[]};
  word: string;
  urls: string[];
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
    const { classes, word, urls } = this.props;
    const { anchorEl } = this.state;
    const bShow = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <Card key={word} raised>
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
                  }}>Weblio</MenuItem>
                  <MenuItem>Delete (TODO)</MenuItem>
                </Menu>
              </div>
            }
            title={word}
          />
          <CardContent>
            <GridList className={classes.gridList} cols={1.2}>
              {urls.map(url => (
                <GridListTile key={url}>
                  <img className={classes.img} src={url} alt={word} />
                </GridListTile>
              ))}
            </GridList>
          </CardContent>
        </Card>
      </div>
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

export default withStyles(styles)(MyZutanRow);