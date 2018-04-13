# Getty Images API Node.js SDK
[![npm version](https://badge.fury.io/js/gettyimages-api.svg)](https://badge.fury.io/js/gettyimages-api)
[![Downloads](https://img.shields.io/npm/dt/gettyimages-api.svg)](http://npm-stat.com/charts.html?package=gettyimages-api)
[![](https://travis-ci.org/gettyimages/gettyimages-api_nodejs.svg?branch=master)](https://travis-ci.org/gettyimages/gettyimages-api_nodejs)
[![Coverage Status](https://coveralls.io/repos/github/gettyimages/gettyimages-api_nodejs/badge.svg)](https://coveralls.io/github/gettyimages/gettyimages-api_nodejs)
[![Code Climate](https://codeclimate.com/github/gettyimages/gettyimages-api_nodejs/badges/gpa.svg)](https://codeclimate.com/github/gettyimages/gettyimages-api_nodejs)
[![Open Hub](https://img.shields.io/badge/Open-Hub-0185CA.svg)](https://www.openhub.net/p/gettyimages-api_nodejs)

## Introduction
This SDK makes using the Getty Images [API](http://developers.gettyimages.com) easy. It handles credential management, makes HTTP requests and is written with a fluent style in mind. For more info about the API, see the [Documentation](https://developers.gettyimages.com/api/).

* Search for images and videos from our extensive creative and editorial catalogs.
* Get image, video, and event metadata.
* Download files using your Getty Images products (e.g., Editorial subscriptions, Easy Access, Thinkstock Subscriptions, and Image Packs).
* Custom Request functionality that allows user to call any endpoint.

## Help & Support

* [Getty Images API](http://developers.gettyimages.com/)
* [Contact Developer Support](mailto:developersupport@gettyimages.com)
* [Issue Tracker](https://github.com/gettyimages/gettyimages-api_nodejs/issues)

## Prerequesites
* [Node.js](http://nodejs.org)
* [NPM](http://npmjs.org)

## Getting Started
The SDK is available as an [npm package](https://www.npmjs.com/package/gettyimages-api). Install in your workspace with:

```sh
$ npm install --save gettyimages-api
```

## Examples
### Search for one or more images

```javascript
var api = require("gettyimages-api");
var creds = { apiKey: "your_api_key", apiSecret: "your_api_secret", username: "your_username", password: "your_password" };
var client = new api (creds);
client.searchimages().withPage(1).withPageSize(1).withPhrase('beach')
    .execute().then(response => {
        console.log(JSON.stringify(response.images[0]));
    }, err => {
        throw err;
    });

```
### Get detailed information for one or more images

```javascript
var api = require("gettyimages-api");
var creds = { apiKey: "your_api_key", apiSecret: "your_api_secret", username: "your_username", password: "your_password" };
var client = new api (creds);
client.images().withId('200261415-001')
    .execute().then(response => {
        console.log(JSON.stringify(response.images[0]));
    }, err => {
        throw err;
    });

```
### Download an image

```javascript
var api = require("gettyimages-api");
var creds = { apiKey: "your_api_key", apiSecret: "your_api_secret", username: "your_username", password: "your_password" };
var client = new api (creds);
client.downloadsimages().withId('503928206')
    .execute().then(response => {
        console.log(response.uri);
    }, err => {
        throw err;
    });

```
### Get details and download a video

```javascript
// Gets some info about a video and then downloads the NTSC SD version

var api = require("gettyimages-api");
var https = require("https");
var fs = require("fs");

var creds = 
    { 
        apiKey: "your api key",
        apiSecret: "your api secret",
        username: "username",
        password: "password"
    };
var client = new api(creds);
var videoId = "459425248";
client.videos().withResponseField(["summary_set", "downloads"]).withId(videoId).execute().then(response => {
        console.log("Title: " + response.title);
        console.log("Sizes: ");
        response.download_sizes.forEach((current, index, arr) => {
            console.log(current.name + " - " + current.description);
        })
        client.downloadsvideos().withId(videoId).withSize("ntsccm").execute().then(response => {
            var downloadUri = response.uri;

            https.get(downloadUri, (res) => {
                if (res.statusCode === 200) {
                    var header = res.headers["content-disposition"];
                    var filename = header.split("filename=")[1];
                    console.log(filename);
                    var file = fs.createWriteStream("./" + filename);
                    res.on("data", (chunk) => {
                        file.write(chunk);
                    }).on("end", () => {
                        file.end();
                    });
                }
            });
        }, err => {
            throw err;
        });
    }, err => {
        throw err;
    });

```
### Get an access token for use with the Getty Images Connect API
```javascript
var api = require("gettyimages-api");
var creds = { apiKey: "your_api_key", apiSecret: "your_api_secret", username: "your_username", password: "your_password" };
var client = new api (creds);
client.getAccessToken().then(response => {
        console.log(response.access_token);
    }, err => {
        throw err;
    });
    
```
### Use the custom request functionality
```javascript
var api = require("gettyimages-api");
var creds = { apiKey: "your_api_key", apiSecret: "your_api_secret", username: "your_username", password: "your_password" };
var client = new api (creds);
client.customrequest().withRoute("search/images").withMethod("get").withQueryParameters({"phrase": "cat", "file_types": "eps"})
    .execute().then(response => {
        console.log(JSON.stringify(response.images[0]));
    }, err => {
        throw err;
    });
    
```


