// ResultRow.tsx

import React, { Component } from 'react';
import styled from 'styled-components';
import ResultCell from './ResultCell';

// ResultRowDiv
const ResultRowDiv = styled.div`
  width: 100%;
  display: flex;
  align-: center;
  justify-content: center;
`;

// ResultRow
interface ResultRowProps {
  imageURLs: string[];
  onImageClicked: (number) => void;
}
class ResultRow extends Component<ResultRowProps> {

  // render()
  render() {
    const resultCells = this.props.imageURLs.map((url, i) =>
      <ResultCell
        key={i.toString()}
        imageURL={url}
        onImageClicked={() => this.props.onImageClicked(i)} />
    );
    return (
      <ResultRowDiv>
        {resultCells}
      </ResultRowDiv>
    );
  }
}

export default ResultRow;
