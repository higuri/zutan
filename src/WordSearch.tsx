// WordSearch.tsx

import React, { Component } from 'react';
import './WordSearch.css';
import SearchResult from './SearchResult';
import {GOOGLE_CUSTOM_SEARCH_API_KEY} from './apikeys';
import {GOOGLE_CUSTOM_SEARCH_ENGINE_ID} from './apikeys';

// ImageURL
class ImageURL {
  // ImageURL
  constructor(public fullsize, public thumbnail) {
    this.fullsize = fullsize;
    this.thumbnail = thumbnail;
  }
}

// WordSearch
interface WordSearchState {
  queryText: string;
  imageURLs: ImageURL[];
}
class WordSearch extends Component<any, WordSearchState> {

  // WordSearch
  constructor(props) {
    super(props);
    this.state = {
      queryText: '',
      imageURLs: []
    };
    this.onTextInputChanged = this.onTextInputChanged.bind(this);
    this.onZuButtonClicked = this.onZuButtonClicked.bind(this);
    this.onImageClicked = this.onImageClicked.bind(this);
  }

  // render()
  render() {
    const thumbnailURLs = this.state.imageURLs.map(
      (url) => url.thumbnail
    );
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
          imageURLs={thumbnailURLs}
          onImageClicked={this.onImageClicked} />
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

  // onImageClicked()
  onImageClicked(iRows, iCells) {
    console.log('WordSearch.onImageClicked: ', iRows, iCells);
    const iImages = iRows * 5 + iCells;
    const imageURL = this.state.imageURLs[iImages];
    console.log('-> ', imageURL.fullsize);
  }

  // startImageSearch()
  async startImageSearch(query) {
    const response = await fetch(
      'https://www.googleapis.com/customsearch/v1' +
      '?key=' + GOOGLE_CUSTOM_SEARCH_API_KEY + 
      '&cx=' + GOOGLE_CUSTOM_SEARCH_ENGINE_ID + 
      '&searchType=image' +
      '&q=' + query);
    const json = await response.json();
    // console.log(json);
    let urls: ImageURL[] = [];
    for (let i = 0; i < json.items.length; i++) {
      const item = json.items[i];
      urls.push(new ImageURL(
        item.link, item.image.thumbnailLink)
      );
    }
    console.log(urls.length);
    this.setState({imageURLs: urls});
  }
}

export default WordSearch;
