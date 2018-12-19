// WordSearch.tsx

import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import * as firebase from 'firebase';

import SearchResult from './SearchResult';
import {GOOGLE_CUSTOM_SEARCH_API_KEY} from './apikeys';
import {GOOGLE_CUSTOM_SEARCH_ENGINE_ID} from './apikeys';
import logoImage from './images/logo.png';
import * as mockData from './mockData';

// LogoImg
const LogoImg = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
// MockVersionDiv
const MockVersionDiv = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
`;
// SearchFormDiv
const SearchFormDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// SearchTextField
const SearchTextField = styled(TextField)`
  && {
    margin-left: auto;
    margin-right: auto;
  }
` as any;
// SearchButton
const SearchButton = styled(Button)`
  && {
    margin-top: 20px;
  }
` as any;
const ImageDialog = styled(Dialog)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
` as any;
// SelectedImg
const SelectedImg = styled.img`
  width: 300px;
  object-fit: contain;
  margin: 20px;
`;
// AddButton
const AddButton = styled(Button)`
  && {
    height: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }
` as any;

// ImageURL
class ImageURL {
  // ImageURL
  constructor(
    public query: string,
    public fullsize: string,
    public thumbnail: string) {}
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
    this.onAddButtonClicked = this.onAddButtonClicked.bind(this);
    this.onImageClicked = this.onImageClicked.bind(this);
    this.onDialogClosed = this.onDialogClosed.bind(this);
  }

  // render()
  render() {
    const isMock = this.props.isMock;
    const thumbnailURLs = this.state.imageURLs.map(
      (url) => url.thumbnail
    );
    const selectedImgSrc = this.state.iSelectedImageURL === null ?
        "" : this.state.imageURLs[this.state.iSelectedImageURL!].thumbnail;
    return (
      <div>
        <LogoImg
          src={logoImage}
          alt="logo">
        </LogoImg>
        <MockVersionDiv>
          {isMock ? '--- Mock Version ---' : null}
        </MockVersionDiv>
        <SearchFormDiv>
          <SearchTextField
            autoFocus={true}
            variant="outlined"
            value={this.state.queryText}
            onChange={this.onTextInputChanged}
          />
          <SearchButton
            variant="outlined"
            onClick={this.onZuButtonClicked}>
            ZU
          </SearchButton>
        </SearchFormDiv>
        <SearchResult
          imageURLs={thumbnailURLs}
          onImageClicked={this.onImageClicked}
        />
        <ImageDialog
          open={this.state.iSelectedImageURL !== null}
          onClose={this.onDialogClosed}>
            <SelectedImg src={selectedImgSrc} />
            <AddButton
              color="primary"
              variant="contained"
              onClick={this.onAddButtonClicked}>
              ADD TO MY ZUTAN
              <AddIcon style={{marginLeft: '10px'}} />
            </AddButton>
        </ImageDialog>
      </div>
    );
  }

  // onZuButtonClicked()
  onZuButtonClicked(): void {
    if (this.props.isMock) {
      this.addMockResult();
    } else {
      this.startImageSearch(this.state.queryText);
    }
  }

  // onAddButtonClicked()
  onAddButtonClicked(): void {
    const iImageURLs = this.state.iSelectedImageURL;
    if (iImageURLs === null) {
      return;
    }
    const imageURL = this.state.imageURLs[iImageURLs];
		const zutanObject = {
			word: imageURL.query,
			// imageURL: imageURL.fullsize
			imageURL: imageURL.thumbnail
		};
		if (this.props.isMock) {
			this.addToMockObjects(zutanObject);
		} else {
			this.addToFirestore(zutanObject);
		}
    this.setState({iSelectedImageURL: null});
  }

  // onTextInputChanged()
  onTextInputChanged(evt) {
    this.setState({queryText: evt.target.value});
  }

  // onImageClicked()
  onImageClicked(iImages: number) {
    this.setState({iSelectedImageURL: iImages});
  }

  // onDialogClosed()
  onDialogClosed() {
    this.setState({iSelectedImageURL: null});
  }

	// addToFirestore()
	private addToFirestore(zutanObject: any): void {
    // TODO: error handling. async?
    const db = firebase.firestore();
    db.collection('users').doc('test-user')
      .collection('zutan').add(zutanObject);
	}

	// addToMockObjects()
	private addToMockObjects(zutanObject: any): void {
		mockData.zutanObjects.push(zutanObject);
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
        query, item.link, item.image.thumbnailLink)
      );
    }
    this.setState({imageURLs: urls});
  }

  // addMockResult()
  private addMockResult() {
    const query = 'apple';
    // queryText: 
    this.setState({queryText: query});
    // searchResult:
    const imageURLs = mockData.searchResult.map((item) => {
      return new ImageURL(
        query, item.link, item.thumbnailLink);
    });
    this.setState({imageURLs: imageURLs});
  }
}

export default WordSearch;
