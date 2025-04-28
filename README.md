# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```
graphql
├─ README.md
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
└─ src
   ├─ App.css
   ├─ App.js
   ├─ App.test.js
   ├─ components
   │  ├─ assets
   │  │  └─ background.png
   │  ├─ pages
   │  │  ├─ dashboard.jsx
   │  │  ├─ error.jsx
   │  │  ├─ finishedprojects.jsx
   │  │  ├─ login.jsx
   │  │  ├─ profile.jsx
   │  │  ├─ userskill.jsx
   │  │  └─ xpovertime.jsx
   │  └─ queries.jsx
   ├─ finishedprojects.css
   ├─ index.css
   ├─ index.js
   ├─ loginform.css
   ├─ logo.svg
   ├─ profile.css
   ├─ reportWebVitals.js
   ├─ setupTests.js
   ├─ skillchart.css
   └─ xpchart.css

```

# GraphQL

## Overview

The GraphQL project is a React-based web application that displays user information fetched from the Intra API using GraphQL queries.It visualizes user data through interactive charts, graphs, and figures for clear and engaging insights.This project was developed by aelmouja.

## Features

**User Authentication:** Log in with your Intra credentials.

**Profile Overview:** View profile details like name, email, campus, and audit ratio.

**Skill Distribution:** Visual representation of user skills using a radar chart.

**XP Over Time:** Analyze XP growth and evolution through scatter and line charts.

**Completed Projects Timeline:** Track project completions in a time-based scatter plot.

## Technologies Used

**Frontend:** React.js

**GraphQL:** Data fetching from the Intra API

**ApexCharts:** Charting library for data visualization

**CSS:** Styling and layout

**JavaScript:** Application logic and dynamic behavior

## Project Structure

graphql
├─ README.md
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
└─ src
   ├─ App.css
   ├─ App.js
   ├─ App.test.js
   ├─ components
   │  ├─ assets
   │  │  └─ background.png
   │  ├─ pages
   │  │  ├─ dashboard.jsx
   │  │  ├─ error.jsx
   │  │  ├─ finishedprojects.jsx
   │  │  ├─ login.jsx
   │  │  ├─ profile.jsx
   │  │  ├─ userskill.jsx
   │  │  └─ xpovertime.jsx
   │  └─ queries.jsx
   ├─ finishedprojects.css
   ├─ index.css
   ├─ index.js
   ├─ loginform.css
   ├─ logo.svg
   ├─ profile.css
   ├─ reportWebVitals.js
   ├─ setupTests.js
   ├─ skillchart.css
   └─ xpchart.css

## Installation

## Prerequisites

Install Node.js and npm (Node Package Manager)

Steps

Clone the repository

git clone <https://learn.reboot01.com/git/aelmouja/graphql>
cd graphql

## Install project dependencies

npm install

Start the development server

npm start

Open http://localhost:3000 in your browser.

## Usage

**Login:** Authenticate using your credentials to access data.

**Dashboard:** View an overview of your user statistics and charts.

**Profile Page:** Get detailed information about your Intra profile.

**Skill Chart:** Analyze your strengths and skill distribution.

**XP Growth:** Monitor your XP progression through time.

**Projects Timeline:** See a graphical timeline of finished projects with details.
