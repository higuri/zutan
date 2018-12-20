// SearchResult.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

// SearchResultDiv 
const SearchResultDiv = styled.div`
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
// ResultImg
const ResultImg = styled.img`
  width: 100px;
  object-fit: contain;
`;
const MoreResultsDiv = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: center;
`;

/// SearchResultProps
interface SearchResultProps {
  imageURLs: string[];
  onImageClicked: (iImages: number) => void;
  onMoreResultsClicked: () => void;
}

/// SearchResult
class SearchResult extends Component<SearchResultProps> {

  // render()
  render() {
    return (
      <div>
        <SearchResultDiv>
          {
            this.props.imageURLs.map((url, i) => (
              <ImageCard
                raised
                key={i}
                onClick={() => this.props.onImageClicked(i)}>
                <CardContent>
                  <ResultImg src={url} />
                </CardContent>
              </ImageCard>
            ))
          }
        </SearchResultDiv>
        {
          (0 < this.props.imageURLs.length) && (
            <MoreResultsDiv>
              <Fab
                variant="extended"
                onClick={this.props.onMoreResultsClicked}>
                <KeyboardArrowDownIcon />
                More Results
              </Fab>
            </MoreResultsDiv>
          )
        }
      </div>
    );
  }
}

export default SearchResult;
