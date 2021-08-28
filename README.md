# Quizzr.io Front-end

## Overview
This repository contains the source code for the front-end portion of the Quizzr.io project, and it was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Certain components work with the back-end, but the connections to its endpoints have not been fully integrated yet. See the [quizzr-server](https://github.com/UMD-Summer-2021-ASR/quizzr-server) repository for more details on the back-end.
Features:
* A "play" option to answer questions. Currently, it only includes an option to play a sample audio file in sync with a transcript.
* A "record" option to record reading transcripts aloud. Currently, it uses a placeholder transcript. Submitting a recording will send a POST request to `/upload` at port `5000`.

## Installation
To install this application, clone this repository onto your machine and run `npm install` inside the newly-cloned repository. **Please ensure you are in the dev2 branch as this has the most up-to-date version**

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Connecting with the Back-end
Note: This assumes that you have the back-end installed. Please refer to the back-end's documentation for its installation instructions.\
To connect with the back-end, add a "proxy" entry in the package.json file with the value referring to the host name and port number of the Flask server (default 5000). In development mode, this would be "http://localhost:5000". Then, start up both the Flask and React app.

## Learn More

You can learn more about Create React App in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
