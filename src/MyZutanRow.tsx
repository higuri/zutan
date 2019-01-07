// MyZutanRow.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';

// RowDiv
const RowDiv = styled.div`
  margin: 10px 0;
`;

// WordImg
const WordImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
// MoreImgIconButton
const MoreImgIconButton = styled(IconButton)`
  && {
    margin-left: auto;
  }
` as any;

// MyZutanRowProps
interface MyZutanRowProps {
  // TODO: cleanup type.
  words: string[];
  word2urls: {[word: string]: string[]};
}

// MyZutanRow
class MyZutanRow extends Component<MyZutanRowProps> {

  // render()
  render() {
    return (
      <RowDiv>
        <Grid
          container
          spacing={8}>
        {
          this.props.words.map((word, i) => (
            <Grid key={i} item xs>
              <Card raised>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Word">
                      {word[0] && word[0].toUpperCase()}
                    </Avatar>
                  }
                  title={word}
                />
                <CardContent>
                 <WordImg src={this.props.word2urls[word][0]} />
                </CardContent>
                {
                //<CardActions>
                //  {
                //    1 < word2urls[word].length && (
                //      <MoreImgIconButton>
                //        <MoreHorizIcon />
                //      </MoreImgIconButton>
                //    )
                //  }
                //</CardActions>
                }
              </Card>
            </Grid>
          ))
        }
        </Grid>
      </RowDiv>
    );
  }
}

export default MyZutanRow;
