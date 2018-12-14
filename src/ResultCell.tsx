// ResultCell.tsx

import React, { Component } from 'react';
import styled from 'styled-components'

// ResultCellDiv
const ResultCellDiv = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 10px;
`;

// ResultImg
const ResultImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

// ResultCell
interface ResultCellProps {
  imageURL: string;
  onImageClicked: () => void;
}
class ResultCell extends Component<ResultCellProps> {

  // render()
  render() {
    // TODO: button style
    return (
      <ResultCellDiv>
        <button
          onClick={this.props.onImageClicked}>
          <ResultImg
            src={this.props.imageURL}
            alt="search result">
          </ResultImg>
        </button>
      </ResultCellDiv>
    );
  }
}

export default ResultCell;
