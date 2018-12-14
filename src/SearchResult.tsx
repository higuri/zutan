// SearchResult.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import ResultRow from './ResultRow';

// SearchResultDiv 
const SearchResultDiv = styled.div`
  margin-top: 30px;
  width: 100%;
`;

/// SearchResultProps
interface SearchResultProps {
  imageURLs: string[];
  onImageClicked: (iRows: number, iCells: number) => void;
}

/// SearchResult
class SearchResult extends Component<SearchResultProps> {

  // render()
  render() {
    let resultRows: JSX.Element[] = [];
    let imageURLs: string[] = [];
    for (let i = 0; i < this.props.imageURLs.length; i++) {
      const url = this.props.imageURLs[i];
      imageURLs.push(url);
      if ((i !== 0 && (i+1) % 5 === 0) || i === this.props.imageURLs.length - 1) {
        const iRows = resultRows.length;
        resultRows.push(
          <ResultRow
            key={i.toString()}
            imageURLs={imageURLs}
            onImageClicked={
              (iCells) => this.props.onImageClicked(iRows, iCells)
            } />
        );
        imageURLs = [];
      }
    }
    return (
      <SearchResultDiv>
        {resultRows} 
      </SearchResultDiv>
    );
  }
}

export default SearchResult;
