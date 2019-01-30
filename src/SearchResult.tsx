// SearchResult.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import withWidth from '@material-ui/core/withWidth';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

// ResultDiv
const ResultDiv = styled.div`
  margin: 10px;
`;
// MoreResultsDiv
const MoreResultsDiv = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: center;
`;
// ResultImg
const ResultImg = styled.img`
  object-fit: contain;
  display: block;
  margin: auto;
`;

// SearchResultProps
interface SearchResultProps {
  width: string;
  imageURLs: string[];
  onImageClicked: (iImages: number) => void;
  onMoreResultsClicked: () => void;
}

// SearchResult
class SearchResult extends Component<SearchResultProps> {

  // render()
  render() {
    const imageURLs = this.props.imageURLs;
    const width = this.props.width;
    let cols;
    switch (width) {
      case 'xs':
        cols = 2;
        break;
      case 'sm':
        cols = 4;
        break;
      default:
        cols = 5;
        break;
    }
    //
    return (
      <ResultDiv>
        <GridList cols={cols} spacing={16}> { imageURLs.map((url, i) =>
          <GridListTile key={url}>
            <Card onClick={() => this.props.onImageClicked(i)}>
              <CardContent>
                <ResultImg src={url} />
              </CardContent>
            </Card>
          </GridListTile>)}
        </GridList> { (0 < this.props.imageURLs.length) && 
        <MoreResultsDiv>
          <Fab
            variant="extended"
            onClick={this.props.onMoreResultsClicked}>
            <KeyboardArrowDownIcon />
            More Results
          </Fab>
        </MoreResultsDiv> }
      </ResultDiv>
    );
  }
}

export default withWidth()(SearchResult);
