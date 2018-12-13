// ResultCell.tsx

import React, { Component } from 'react';
import './ResultCell.css';

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
      <div className="result_cell">
        <button
          onClick={this.props.onImageClicked}>
          <img
            className="result_image"
            src={this.props.imageURL}
            alt="search result">
          </img>
        </button>
      </div>
    );
  }
}

export default ResultCell;
