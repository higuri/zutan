// SearchResult.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// SearchResultDiv 
const SearchResultDiv = styled.div`
  width: 80%;
  margin-top: 30px;
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
// ResultImg
const ResultImg = styled.img`
  width: 200px;
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
    const imageURLs = this.props.imageURLs;
    return (
      <SearchResultDiv>
        {
          imageURLs.map((url, i) => {
            return (
              <ImageCard
                raised
                key={i}
                onClick={() => this.props.onImageClicked(i)}>
                <CardContent>
                  <ResultImg src={url} />
                </CardContent>
              </ImageCard>
            )
          })
        }
      </SearchResultDiv>
    );
  }
}

export default SearchResult;
