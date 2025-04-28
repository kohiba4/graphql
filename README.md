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

## Installation

## Prerequisites

Install Node.js and npm (Node Package Manager)

Steps

Clone the repository

git clone <https://learn.reboot01.com/git/aelmouja/graphql>
cd graphql

## Install project dependencies

`npm install`

Start the development server

`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

**Login:** Authenticate using your credentials to access data.

**Dashboard:** View an overview of your user statistics and charts.

**Profile Page:** Get detailed information about your Intra profile.

**Skill Chart:** Analyze your strengths and skill distribution.

**XP Growth:** Monitor your XP progression through time.

**Projects Timeline:** See a graphical timeline of finished projects with details.
