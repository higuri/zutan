// WordSearch.tsx

import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as firebase from 'firebase';

import AppBar from './AppBar';
import SearchResult from './SearchResult';
import {GOOGLE_CUSTOM_SEARCH_API_KEY} from './apikeys';
import {GOOGLE_CUSTOM_SEARCH_ENGINE_ID} from './apikeys';
import zutanIcon from './images/zutan.svg';
import {mockSearchResult, mockMyZutanObjects} from './mockData';

// LogoImg
const LogoImg = styled.img`
  display: block;
  width: 225px;
  margin: 20px auto;
`;
// MockVersionDiv
const MockVersionDiv = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
`;
// ProgressDiv
const ProgressDiv = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
// SearchForm
const SearchForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// SearchTextField
const SearchTextField = styled(TextField)`
  margin-left: auto;
  margin-right: auto;
` as any;
// SearchButton
const SearchButton = styled(Button)`
  margin-top: 20px;
` as any;
const ImageDialog = styled(Dialog)`
  display: flex;
  flex-direction: column;
  align-items: center;
` as any;
// SelectedImg
const SelectedImg = styled.img`
  width: 300px;
  object-fit: contain;
  margin: 20px;
`;
// AddButton
const AddButton = styled(Button)`
  height: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
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
  isSearching: boolean;
  imageURLs: ImageURL[];
  iSelectedImageURL: number | null;
}
class WordSearch extends Component<any, WordSearchState> {

  // textField
  private textField: any;

  // WordSearch
  constructor(props) {
    super(props);
    this.state = {
      queryText: '',
      isSearching: false,
      imageURLs: [],
      iSelectedImageURL: null
    };
    this.textField = React.createRef();
    this.onTextInputChanged = this.onTextInputChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddButtonClicked = this.onAddButtonClicked.bind(this);
    this.onImageClicked = this.onImageClicked.bind(this);
    this.onMoreResultsClicked = this.onMoreResultsClicked.bind(this);
    this.onDialogClosed = this.onDialogClosed.bind(this);
    this.onClickHome = this.onClickHome.bind(this);
    this.onClickMyZutan = this.onClickMyZutan.bind(this);
  }

  // render()
  render() {
    const isMock = this.props.isMock;
    const isSearching = this.state.isSearching;
    const thumbnailURLs = this.state.imageURLs.map(
      (url) => url.thumbnail
    );
    const selectedImgSrc = this.state.iSelectedImageURL === null ?
        "" : this.state.imageURLs[this.state.iSelectedImageURL!].fullsize;
    return (
      <div>
        <AppBar
          onClickHome={this.onClickHome}
          onClickMyZutan={this.onClickMyZutan} />
        <LogoImg
          src={zutanIcon}
          alt="logo">
        </LogoImg>
        <MockVersionDiv>
          {isMock ? '--- Mock Version ---' : null}
        </MockVersionDiv>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchTextField
            autoFocus={true}
            inputRef={this.textField}
            type="search"
            variant="outlined"
            value={this.state.queryText}
            onChange={this.onTextInputChanged} />
          <SearchButton
            type="submit"
            variant="outlined">
            ZU
          </SearchButton>
        </SearchForm> { isSearching ?
        <ProgressDiv>
          <CircularProgress disableShrink />
        </ProgressDiv> :
        <SearchResult
          imageURLs={thumbnailURLs}
          onImageClicked={this.onImageClicked}
          onMoreResultsClicked={this.onMoreResultsClicked} /> }
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

  // onSubmit()
  onSubmit(e): void {
    e.preventDefault();
    this.textField.current.blur();
    this.setState({
      imageURLs: [],
      isSearching: true
    }, async () => {
      if (this.props.isMock) {
        this.addMockResult();
      } else {
        await this.startImageSearch(this.state.queryText);
      }
      this.setState({isSearching: false});
    });
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
			imageURL: imageURL.fullsize
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
  onImageClicked(iImages: number): void {
    this.setState({iSelectedImageURL: iImages});
  }

  // onMoreResultsClicked()
  onMoreResultsClicked(): void {
    if (!this.props.isMock) {
      this.startImageSearch(this.state.queryText);
    }
  }

  // onDialogClosed()
  onDialogClosed() {
    this.setState({iSelectedImageURL: null});
  }

  // onClickHome()
  onClickHome() {
    this.setState({
      queryText: '',
      imageURLs: []
    });
    this.props.history.push('/');
  }

  // onClickMyZutan()
  onClickMyZutan() {
    this.props.history.push('/myzutan');
  }

	// addToFirestore()
	private addToFirestore(zutanObject: any): void {
    // TODO: props?
    const user = firebase.auth().currentUser; 
    if (user !== null) {
      // TODO: error handling. async?
      const db = firebase.firestore();
      db.collection('users').doc(user.uid)
        .collection('zutan').add(zutanObject);
    }
	}

	// addToMockObjects()
	private addToMockObjects(zutanObject: any): void {
    mockMyZutanObjects.push({
      word: zutanObject.word,
      imageURL: zutanObject.imageURL
    });
	}

  // startImageSearch()
  async startImageSearch(query) {
    const imageURLs = this.state.imageURLs;
    const url = 'https://www.googleapis.com/customsearch/v1' +
      '?key=' + GOOGLE_CUSTOM_SEARCH_API_KEY + 
      '&cx=' + GOOGLE_CUSTOM_SEARCH_ENGINE_ID + 
      '&num=' + 10 +
      '&start=' + (imageURLs.length + 1) +
      '&searchType=image' +
      '&q=' + query;
    // console.log(url);
    const response = await fetch(url);
    const json = await response.json();
    // console.log(json);
    let urls: ImageURL[] = [];
    for (let i = 0; i < json.items.length; i++) {
      const item = json.items[i];
      urls.push(new ImageURL(
        query, item.link, item.image.thumbnailLink)
      );
    }
    this.setState({
      imageURLs: imageURLs.concat(urls)
    });
  }

  // addMockResult()
  private addMockResult() {
    const query = 'apple';
    // queryText: 
    this.setState({queryText: query});
    // searchResult:
    const imageURLs = mockSearchResult.map((item) => {
      return new ImageURL(
        query, item.full, item.thumb);
    });
    this.setState({imageURLs: imageURLs});
  }
}

export default WordSearch;
