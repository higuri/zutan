// WordSearch.js

import React, { Component } from 'react';
import './WordSearch.css';
import SearchResult from './SearchResult';
import {GOOGLE_CUSTOM_SEARCH_API_KEY} from './apikeys.js';

// WordSearch
class WordSearch extends Component {

  // WordSearch
  constructor(props) {
    super(props);
    this.state = {
      queryText: '',
      imageUrls: []
    };
    this.onTextInputChanged = this.onTextInputChanged.bind(this);
    this.onZuButtonClicked = this.onZuButtonClicked.bind(this);
  }

  // render()
  render() {
    return (
      <div>
        <div className="search_form">
          <input
            className="search_text"
            type="text"
            value={this.state.queryText}
            onChange={this.onTextInputChanged}>
          </input>
          <button
            className="search_button"
            onClick={this.onZuButtonClicked}>
            ZU
          </button>
        </div>
        <SearchResult
          imageUrls={this.state.imageUrls}>
        </SearchResult>
      </div>
    );
  }

  // onZuButtonClicked()
  onZuButtonClicked() {
    this.startImageSearch(this.state.queryText);
  }

  // onTextInputChanged()
  onTextInputChanged(evt) {
    this.setState({queryText: evt.target.value});
  }

  // startImageSearch()
  async startImageSearch(query) {
    const response = await fetch(
      'https://www.googleapis.com/customsearch/v1' +
      '?key=' + GOOGLE_CUSTOM_SEARCH_API_KEY + 
      '&searchType=image&q=' + query);
    const json = await response.json();
    let urls = [];
    for (let i = 0; i < json.items.length; i++) {
      const item = json.items[i];
      const imageURL = item.image.thumbnailLink;
      urls.push(imageURL);
    }
    console.log(urls.length);
    this.setState({imageUrls: urls});
  }
}

export default WordSearch;
