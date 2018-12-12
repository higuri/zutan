// ResultRow

import React, { Component } from 'react';
import './ResultRow.css';
import ResultCell from './ResultCell';

// ResultRow
class ResultRow extends Component {

  // render()
  render() {
    const resultCells = this.props.imageUrls.map((url, i) =>
      <ResultCell
        key={i.toString()}
        imageUrl={url}
        onImageClicked={() => this.props.onImageClicked(i)} />
    );
    return <div className="result_row">{resultCells}</div>;
  }
}

export default ResultRow;
