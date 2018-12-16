// WordSearch.tsx

import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import SearchResult from './SearchResult';
import {GOOGLE_CUSTOM_SEARCH_API_KEY} from './apikeys';
import {GOOGLE_CUSTOM_SEARCH_ENGINE_ID} from './apikeys';
import logoImage from './images/logo.png';
import mockItems from './mockItems';

// LogoImg
const LogoImg = styled.img`
  display: block;
  width: 30%;
  height: auto;
  margin: auto;
`;
// MockModeDiv
const MockModeDiv = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  margin: 20px;
  font-size: 20px;
`;

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
  render() {
    const isMock = this.props.isMock;
    const thumbnailURLs = this.state.imageURLs.map(
      (url) => url.thumbnail
    );
    // TODO: styling with Grid
    return (
      <div>
        <LogoImg
          src={logoImage}
          alt="logo">
        </LogoImg>
        <MockModeDiv>
        {isMock ? 'MOCK MODE' : null}
        </MockModeDiv>
        <Grid
          container
          spacing={8}
          alignItems="center"
          justify="center">
          <Grid item xs={6}>
			  		<TextField
              autoFocus={true}
              fullWidth={true}
			  			variant="outlined"
              value={this.state.queryText}
              onChange={this.onTextInputChanged}
			  		/>
          </Grid>   
          <Grid item xs={2}>
            <Button
              variant="outlined"
              onClick={this.onZuButtonClicked}>
              ZU
            </Button>
          </Grid>   
        </Grid> 
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
    if (this.props.isMock) {
      this.addMockData();
    } else {
      this.startImageSearch(this.state.queryText);
    }
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
      console.log(`
        {
          link: '${item.link}',
          thumbnailLink: '${item.image.thumbnailLink}',
        },
      `);
      urls.push(new ImageURL(
        item.link, item.image.thumbnailLink)
      );
    }
    this.setState({imageURLs: urls});
  }

  // addMockData()
  private addMockData() {
    // queryText: 
    this.setState({queryText: 'apple'});
    // searchResult:
		const imageURLs = mockItems.map((item) => {
			return new ImageURL(
        item.link, item.thumbnailLink);
		});
    this.setState({imageURLs: imageURLs});
  }
}

export default WordSearch;
