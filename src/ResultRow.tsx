// ResultRow.tsx

import React, { Component } from 'react';
import './ResultRow.css';
import ResultCell from './ResultCell';

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
    return <div className="result_row">{resultCells}</div>;
  }
}

export default ResultRow;
