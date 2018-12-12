// ResultCell

import React, { Component } from 'react';
import './ResultCell.css';

// ResultCell
class ResultCell extends Component {

  // render()
  render() {
    return (
      <div className="result_cell">
        <img
          className="result_image"
          src={this.props.imageUrl}
          alt="search result">
        </img>
      </div>
    );
  }
}

export default ResultCell;
