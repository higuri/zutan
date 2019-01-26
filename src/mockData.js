// mockData.js

// mockSearchResult:
const mockSearchResult = [
  {
    thumb: '/mockdata/apple0_thumb.jpg',
    full: '/mockdata/apple0_full.jpg'
  },
  {
    thumb: '/mockdata/apple1_thumb.png',
    full: '/mockdata/apple1_full.png'
  },
  {
    thumb: '/mockdata/apple2_thumb.png',
    full: '/mockdata/apple2_full.jpg'
  },
  {
    thumb: '/mockdata/apple3_thumb.jpg',
    full: '/mockdata/apple3_full.jpg'
  },
  {
    thumb: '/mockdata/apple4_thumb.png',
    full: '/mockdata/apple4_full.png'
  },
  {
    thumb: '/mockdata/apple5_thumb.png',
    full: '/mockdata/apple5_full.jpg'
  },
  {
    thumb: '/mockdata/apple6_thumb.png',
    full: '/mockdata/apple6_full.png'
  },
  {
    thumb: '/mockdata/apple7_thumb.png',
    full: '/mockdata/apple7_full.png'
  },
  {
    thumb: '/mockdata/apple8_thumb.png',
    full: '/mockdata/apple8_full.jpg'
  },
  {
    thumb: '/mockdata/apple9_thumb.png',
    full: '/mockdata/apple9_full.png'
  }
].map(obj => {
  return {
    thumb: process.env.PUBLIC_URL + obj.thumb,
    full: process.env.PUBLIC_URL + obj.full
  };
});

// mockMyZutanObjects
let mockMyZutanObjects = [
  {
    word: 'rice',
    imageURL: '/mockdata/rice0_full.jpg'
  },
  {
    word: 'run',
    imageURL: '/mockdata/run0_full.png'
  },
  {
    word: 'doggy',
    imageURL: '/mockdata/doggy0_full.jpg'
  },
  {
    word: 'doggy',
    imageURL: '/mockdata/doggy1_full.jpg'
  }
].map(obj => {
  return {
    word: obj.word,
    imageURL: process.env.PUBLIC_URL + obj.imageURL
  };
});

export {
  mockSearchResult,
  mockMyZutanObjects
}
