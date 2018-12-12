// ResultCell

import React, { Component } from 'react';
import './ResultCell.css';

// ResultCell
class ResultCell extends Component {

  // render()
  render() {
    // TODO: button style
    return (
      <div className="result_cell">
        <button
          onClick={this.props.onImageClicked}>
          <img
            className="result_image"
            src={this.props.imageUrl}
            alt="search result">
          </img>
        </button>
      </div>
    );
  }
}

export default ResultCell;
