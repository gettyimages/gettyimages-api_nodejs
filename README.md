# Getty Images API Node.js SDK

[![](https://travis-ci.org/gettyimages/gettyimages-api_nodejs.svg?branch=master)](https://travis-ci.org/gettyimages/gettyimages-api_nodejs)
[![Code Climate](https://codeclimate.com/github/gettyimages/gettyimages-api_nodejs/badges/gpa.svg)](https://codeclimate.com/github/gettyimages/gettyimages-api_nodejs)
[![Join the chat at https://gitter.im/gettyimages/gettyimages-api_nodejs](https://badges.gitter.im/gettyimages/gettyimages-api_nodejs.svg)](https://gitter.im/gettyimages/gettyimages-api_nodejs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)[![Downloads](https://img.shields.io/npm/dm/gettyimages-api.svg)](http://npm-stat.com/charts.html?package=gettyimages-api)

## Prerequesites
* [Getty Images API account](https://api.gettyimages.com/member/register)
* [Node.js](http://nodejs.org)
* [NPM](http://npmjs.org)

## Getting Started
Create the following system environment variables using your Getty Images Connect credentials:

 *  **ConnectSDK_ApiKey**
 *  **ConnectSDK_ApiSecret**
 *  **ConnectSDK_UserName**
 *  **ConnectSDK_UserPassword**

The SDK is available as an [npm module](https://www.npmjs.com/package/gettyimages-api). Install globally with:

    $ npm install -g gettyimages-api

Or you may define the SDK as a dependency of your application by including it in a package.json file:

    { "dependencies" : {
        "connectsdk": "1.0.x"
        }
    }

## Examples

**Search for one or more images:**

    var connectSdk = new ConnectSdk (
        process.env.ConnectSDK_ApiKey,
        process.env.ConnectSDK_ApiSecret,
        process.env.ConnectSDK_UserName,
        process.env.ConnectSDK_UserPassword)

	var search = connectSdk
		.search()
		.images()
		.withPage(1)
		.withPageSize(1)
		.withPhrase('beach')

	search.execute(function(err, response) {
		if (err) throw err
		console.log(JSON.stringify(response.images[0]))
	})

**Get detailed information for one or more images:**

    var connectSdk = new ConnectSdk (
        process.env.ConnectSDK_ApiKey,
        process.env.ConnectSDK_ApiSecret,
        process.env.ConnectSDK_UserName,
        process.env.ConnectSDK_UserPassword)

	var images = connectSdk
		.images()
		.withId('200261415-001')

	images.execute(function(err, response) {
		if (err) throw err
		console.log(JSON.stringify(response.images[0]))
	})

**Download an image:**

    var connectSdk = new ConnectSdk (
        process.env.ConnectSDK_ApiKey,
        process.env.ConnectSDK_ApiSecret,
        process.env.ConnectSDK_UserName,
        process.env.ConnectSDK_UserPassword)

    var download = connectSdk
        .download()
        .withId('467073457')

    download.execute(function(err, response) {
        if (err) throw err
        console.log(response.uri)
    })

**Get an access token for use with the Getty Images Connect API:**

    var connectSdk = new ConnectSdk (
        process.env.ConnectSDK_ApiKey,
        process.env.ConnectSDK_ApiSecret,
        process.env.ConnectSDK_UserName,
        process.env.ConnectSDK_UserPassword)

    connectSdk.getAccessToken(function(err, response) {
        if (err) throw err
        console.log(response.access_token)
    })

## Help & Support

* [Getty Images API](http://developer.gettyimages.com/)
* [Contact Developer Support](mailto:developersupport@gettyimages.com)
* [Issue Tracker](https://github.com/gettyimages/gettyimages-api_nodejs/issues)
