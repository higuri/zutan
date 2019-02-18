# Zutan
A vocabulary building web app utilizing images.

## Features
* Search images on the Web by word
* Save images in your word book

## Demo
https://higuri.github.io/zutan/
* Mock Image Search - Always returns same result
* No image saving across sessions

## Deployment (on your site)
### Prerequisites
#### Firebase project
Create your Firebase project according to [documentation][firebase-url].
And set obtained keys or values to `FIREBASE_CONFIG` in `config.js`.
```js
...
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY_HERE',
  authDomain: 'YOUR_AUTH_DOMAIN_HERE',
  projectId: 'YOUR_PROJECT_ID_HERE'
};
...
```
#### Google Custom Search
Create and configure your Custom Search Engine according to [documentation][gcs-url].
And set an obtained API key and an engine ID to `config.js`.

```js
...
export const GOOGLE_CUSTOM_SEARCH_API_KEY = 'YOUR_API_KEY_HERE'; 
export const GOOGLE_CUSTOM_SEARCH_ENGINE_ID = 'YOUR_ENGINE_ID_HERE';
...
```

#### Set your site URL to `package.json`
```json
  ...
  "homepage": "YOUR_SITE_URL_HERE",
  ...
```

#### Install Dependencies
```sh
yarn install
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
This project was bootstrapped with [Create React App][crapp-url].
You can learn more in the [Create React App documentation][crappdoc-url].

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
[firebase-url]: https://firebase.google.com/docs/web/setup
[crapp-url]: https://github.com/facebook/create-react-app
[crappdoc-url]: https://facebook.github.io/create-react-app/docs/getting-started
[gcs-url]: https://developers.google.com/custom-search/v1/overview
