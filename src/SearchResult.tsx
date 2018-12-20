// SearchResult.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// SearchResultDiv 
const SearchResultDiv = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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

/// SearchResultProps
interface SearchResultProps {
  imageURLs: string[];
  onImageClicked: (iImages: number) => void;
}

/// SearchResult
class SearchResult extends Component<SearchResultProps> {

  // render()
  render() {
    return (
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
    );
  }
}

export default SearchResult;
