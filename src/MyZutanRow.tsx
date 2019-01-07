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
import IconButton from '@material-ui/core/IconButton';

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

// MyZutanRow
class MyZutanRow extends Component<MyZutanRowProps> {

  // render()
  render() {
    const { classes, word, urls } = this.props;
    return (
      <div className={classes.root}>
        <Card key={word} raised>
          <CardHeader
            avatar={
              <Avatar aria-label="Word">
                {word[0] && word[0].toUpperCase()}
              </Avatar>
            }
            title={word}
          />
          <CardContent>
            <GridList className={classes.gridList} cols={1.2}>
              {urls.map(url => (
                <GridListTile key={url}>
                  <img src={url} alt={word} />
                </GridListTile>
              ))}
            </GridList>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(MyZutanRow);
