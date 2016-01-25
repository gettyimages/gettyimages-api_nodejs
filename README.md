# Getty Images API Node.js SDK

[![](https://travis-ci.org/gettyimages/gettyimages-api_nodejs.svg?branch=master)](https://travis-ci.org/gettyimages/gettyimages-api_nodejs)
[![Code Climate](https://codeclimate.com/github/gettyimages/gettyimages-api_nodejs/badges/gpa.svg)](https://codeclimate.com/github/gettyimages/gettyimages-api_nodejs)
[![Join the chat at https://gitter.im/gettyimages/gettyimages-api_nodejs](https://badges.gitter.im/gettyimages/gettyimages-api_nodejs.svg)](https://gitter.im/gettyimages/gettyimages-api_nodejs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)[![Downloads](https://img.shields.io/npm/dm/gettyimages-api.svg)](http://npm-stat.com/charts.html?package=gettyimages-api)

## Prerequesites
* [Getty Images API account](https://api.gettyimages.com/member/register)
* [Node.js](http://nodejs.org)
* [NPM](http://npmjs.org)

## Getting Started
The SDK is available as an [npm package](https://www.npmjs.com/package/gettyimages-api). Install in your workspace with:

    $ npm install gettyimages-api

## Examples
### Search for one or more images
```
var api = require("gettyimages-api");
var creds = { apiKey: "your_api_key", apiSecret: "your_api_secret", username: "your_username", password: "your_password" };
var client = new api (creds);
client.search().images().withPage(1).withPageSize(1).withPhrase('beach')
    .execute(function(err, response) {
        if (err) throw err
        console.log(JSON.stringify(response.images[0]));
    });
```
### Get detailed information for one or more images
```
var api = require("gettyimages-api");
var creds = { apiKey: "your_api_key", apiSecret: "your_api_secret", username: "your_username", password: "your_password" };
var client = new api (creds);
client.images().withId('200261415-001').execute(
    function(err, response) {
        if (err) throw err
        console.log(JSON.stringify(response.images[0]));
    });
```
### Download an image

```
var api = require("gettyimages-api");
var creds = { apiKey: "your_api_key", apiSecret: "your_api_secret", username: "your_username", password: "your_password" };
var client = new api (creds);
client.download().withId('467073457').execute(
    function(err, response) {
        if (err) throw err
        console.log(response.uri)
    });
```
### Get an access token for use with the Getty Images Connect API
```
var api = require("gettyimages-api");
var creds = { apiKey: "your_api_key", apiSecret: "your_api_secret", username: "your_username", password: "your_password" };
var client = new api (creds);
client.getAccessToken(function(err, response) {
    if (err) throw err
    console.log(response.access_token);
});
```
## Help & Support

* [Getty Images API](http://developers.gettyimages.com/)
* [Contact Developer Support](mailto:developersupport@gettyimages.com)
* [Issue Tracker](https://github.com/gettyimages/gettyimages-api_nodejs/issues)
* [Discuss on Gitter](https://gitter.im/gettyimages/gettyimages-api_nodejs)
