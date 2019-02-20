// mockData.js

// mockSearchResult:
const mockSearchResult = [
  '/mockdata/apple01.jpg',
  '/mockdata/apple02.jpg',
  '/mockdata/apple03.jpg',
  '/mockdata/apple04.jpg',
  '/mockdata/apple05.jpg',
  '/mockdata/apple06.jpg',
  '/mockdata/apple07.jpg',
  '/mockdata/apple08.jpg',
  '/mockdata/apple09.jpg',
  '/mockdata/apple10.jpg'
].map(fpath => process.env.PUBLIC_URL + fpath);

// mockMyZutanObjects
let mockMyZutanObjects = [
  {
    word: 'doggy',
    imageURL: '/mockdata/doggy01.jpg'
  },
  {
    word: 'doggy',
    imageURL: '/mockdata/doggy02.jpg'
  },
  {
    word: '麵條',
    imageURL: '/mockdata/noodle01.jpg'
  },
  {
    word: '麵條',
    imageURL: '/mockdata/noodle02.jpg'
  },
  {
    word: '군중',
    imageURL: '/mockdata/crowd01.jpg'
  },
  {
    word: '군중',
    imageURL: '/mockdata/crowd02.jpg'
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
