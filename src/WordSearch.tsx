// WordSearch.tsx

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
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
  iSelectedImageURL: number | null;
}
class WordSearch extends Component<any, WordSearchState> {

  // WordSearch
  constructor(props) {
    super(props);
    this.state = {
      queryText: '',
      imageURLs: [],
      iSelectedImageURL: null
    };
    this.onTextInputChanged = this.onTextInputChanged.bind(this);
    this.onZuButtonClicked = this.onZuButtonClicked.bind(this);
    this.onImageClicked = this.onImageClicked.bind(this);
    this.onDialogClosed = this.onDialogClosed.bind(this);
  }

  // render()
  // TODO: textfield, button styling (withStyles())
  render() {
    const thumbnailURLs = this.state.imageURLs.map(
      (url) => url.thumbnail
    );
    // TODO: cleanup img src (dialog)
    //       img styling
    return (
      <div>
        <div className="search_form">
					<TextField
						margin="normal"
						variant="outlined"
            value={this.state.queryText}
            onChange={this.onTextInputChanged}
					/>
          <Button
            variant="contained"
            color="default"
            onClick={this.onZuButtonClicked}>
            ZU
          </Button>
        </div>
        <SearchResult
          imageURLs={thumbnailURLs}
          onImageClicked={this.onImageClicked}
				/>
        <Dialog
          open={this.state.iSelectedImageURL !== null}
          onClose={this.onDialogClosed}>
          <img src={this.state.iSelectedImageURL === null ? "" : this.state.imageURLs[this.state.iSelectedImageURL!].fullsize} />
        </Dialog>
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
    const i = iRows * 5 + iCells;
    this.setState({iSelectedImageURL: i});
  }

  // onDialogClosed()
  onDialogClosed() {
    this.setState({iSelectedImageURL: null});
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
