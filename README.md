# frontend-nanodegree-feedreader
This repository contains a website for Frontend Nanodegree Project 6 Feedreader.

## About this project
This project contains a sample webapp that displays RSS feeds from multiple sources. The project is about testing this webapp using the Jasmine testing framework. Running the webapp will automatically run Jasmine, causing its output to show at the bottom of the page.

## How do I run this project?
Per project requirement, the project ships with "dist" directory that contains the distributable version of the web app. To run the app, simply open dist/index.html with Chrome (or equivalent browser).

Alternatively, you can build the project by following the steps below:
1. Check this project out from GitHub.
2. From project root, run `npm install`. This will download all npm dependencies required to build this project.
3. From project root, run `bower install`. This will download all dependencies required to run this project.
4. From project root, run `grunt`. This will build a minified website under `dist` directory.
5. Open dist/index.html with Chrome (or equivalent browser).

## About the tests
This project implements the following Jasmine tests:
* test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
* test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
* test that ensures the menu element is hidden by default.
* test that ensures the menu changes visibility when the menu icon is clicked. (this test was implemented with two separate specs)
* test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.

In addition, this project contains the following extra tests:
* test that ensures all of the RSS feeds are listed in the menu in the correct order
* test that ensures selecting the RSS feed from the menu closes the menu and updates page heading
