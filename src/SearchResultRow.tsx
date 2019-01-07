// SearchResultRow.tsx

import React, { Component } from 'react';
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// RowDiv
const RowDiv = styled.div`
  margin: 10px 0;
`;

// ResultImg
const ResultImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  object-fit: contain;
`;

// SearchResultRowProps
interface SearchResultRowProps {
  imageURLs: string[];
  onImageClicked: (iImages: number) => void;
}

// SearchResultRow
class SearchResultRow extends Component<SearchResultRowProps> {

  // render()
  render() {
    return (
      <RowDiv>
        <Grid
          container
          spacing={8}>
        {
          this.props.imageURLs.map((url, i) => (
            <Grid key={i} item xs>
              <Card
                raised
                onClick={() => this.props.onImageClicked(i)}>
                <CardContent>
                  <ResultImg src={url} />
                </CardContent>
              </Card>
            </Grid>
          ))
        }
        </Grid>
      </RowDiv>
    );
  }
}

export default SearchResultRow;
