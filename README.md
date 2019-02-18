# Zutan
A vocabulary building web app utilizing images.

## Features
* Image search by words
* Save images in your word book

## Demo
https://higuri.github.io/zutan/
* Mock Image Search - Always returns same result
* No image saving across sessions

## Deployment (on your site)
### Preparation
#### Install Dependencies
```sh
yarn install
```
#### Set your api keys to `apikeys.js`
TODO
```js
export const GOOGLE_FIREBASE_API_KEY = 'YOUR_KEY_HERE'; 
export const GOOGLE_CUSTOM_SEARCH_API_KEY = 'YOUR_KEY_HERE'; 
export const GOOGLE_CUSTOM_SEARCH_ENGINE_ID = 'YOUR_KEY_HERE';
```
#### Set your site URL to `package.json`
```json
  ...
  "homepage": "YOUR_SITE_URL_HERE",
  ...
```

### Build
```sh
yarn build
```
The `build` directory is ready to be deployed.

## Development
### `yarn start`
Runs the app in the development mode.
You can run the mock version by `yarn start:mock`.

### `yarn build`
Builds the app for production to the `build` directory.
You can build the mock version by `yarn build:mock`.

### And more commands...
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Built With
* [React][react-url] - Building user interfaces
* [React Router][rrouter-url] - Routing
* [Firebase][firebase-url] - Authentication, Realtime Database
* [Google Custom Search][cse-url] - Image search engine
* [Material-UI][mui-url] - A set of React components 
* [Pixels][pix-url] - Sample images for mock version

<!-- Markdown link -->
[react-url]: https://reactjs.org/
[rrouter-url]: https://github.com/ReactTraining/react-router
[firebase-url]: https://firebase.google.com/
[mui-url]: https://material-ui.com/
[cse-url]: https://developers.google.com/custom-search/
[pix-url]: https://www.pexels.com/
