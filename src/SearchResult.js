// SearchResult.js

import React, { Component } from 'react';
import './SearchResult.css';
import ResultRow from './ResultRow';

// SearchResult
class SearchResult extends Component {

  // render()
  render() {
    let resultRows = [];
    let imageUrls = [];
    for (let i = 0; i < this.props.imageUrls.length; i++) {
      const url = this.props.imageUrls[i];
      imageUrls.push(url);
      if ((i !== 0 && (i+1) % 5 === 0) || i === this.props.imageUrls.length - 1) {
        resultRows.push(
          <ResultRow key={i.toString()} imageUrls={imageUrls} />
        );
        imageUrls = [];
      }
    }
    return (
      <div className="search_result">
        {resultRows} 
      </div>
    );
  }
}

export default SearchResult;
