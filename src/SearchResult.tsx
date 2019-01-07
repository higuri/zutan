// SearchResult.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import Fab from '@material-ui/core/Fab';
import withWidth from '@material-ui/core/withWidth';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchResultRow from './SearchResultRow';

// ResultDiv
const ResultDiv = styled.div`
  margin: 30px 0;
`;
// MoreResultsDiv
const MoreResultsDiv = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: center;
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
    const width = this.props.width;
    let unit;
    switch (width) {
      case 'xs':
        unit = 2;
        break;
      case 'sm':
        unit = 3;
        break;
      default:
        unit = 4;
        break;
    }
    let rows: string[][] = [];
    this.props.imageURLs.forEach((url, i) => {
      if (i % unit === 0) {
        rows.push([]);
      }
      rows[rows.length - 1].push(url);
    });
    //
    return (
      <ResultDiv>
        {
          rows.map((urls, i) => (
            <SearchResultRow
              key={i}
              imageURLs={urls}
              onImageClicked={(j) => {
                this.props.onImageClicked(i*unit + j);
              }}>
            </SearchResultRow>
          ))
        }
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
      </ResultDiv>
    );
  }
}

export default withWidth()(SearchResult);
