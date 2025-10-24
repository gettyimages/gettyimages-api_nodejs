# Getty Images API Node.js SDK

[![npm version](https://badge.fury.io/js/gettyimages-api.svg)](https://badge.fury.io/js/gettyimages-api)
[![Downloads](https://img.shields.io/npm/dt/gettyimages-api.svg)](http://npm-stat.com/charts.html?package=gettyimages-api)
[![Coverage Status](https://coveralls.io/repos/github/gettyimages/gettyimages-api_nodejs/badge.svg)](https://coveralls.io/github/gettyimages/gettyimages-api_nodejs)
[![Open Hub](https://img.shields.io/badge/Open-Hub-0185CA.svg)](https://www.openhub.net/p/gettyimages-api_nodejs)

## Introduction

This SDK makes using the Getty Images [API](http://developers.gettyimages.com) easy. It handles credential management, makes HTTP requests and is written with a fluent style in mind. For more info about the API, see the [Documentation](https://developers.gettyimages.com/api/).

* Search for images and videos from our extensive creative and editorial catalogs.
* Get image, video, and event metadata.
* Download files using your Getty Images products (e.g., Editorial subscriptions, Easy Access, and Image Packs).
* Custom Request functionality that allows user to call any endpoint.

## Help & Support

* [Getty Images API](http://developers.gettyimages.com/)
* [Issue Tracker](https://github.com/gettyimages/gettyimages-api_nodejs/issues)

## Prerequisites

We will attempt to support all versions of NodeJS that are still supported.
See the [NodeJS Release Page](https://github.com/nodejs/release) for info on this.

* [Node.js (>= 14.20.1)](http://nodejs.org)
* [NPM (>= 8.15.0)](http://npmjs.org)

## Getting Started

### Obtain an API Key

If you don't already have an API key, fill out and submit the [contact form](http://engage.gettyimages.com/api-contact) to be connected to our Sales team.

### Installing the package

The SDK is available as an [npm package](https://www.npmjs.com/package/gettyimages-api). Install in your workspace with:

```sh
npm install --save gettyimages-api
```

## Usage Notes

In order to manage the lifetime of your access token and minimize the number of calls to auth (which eats into your throttle quota), only create an API client once and then reuse it for all calls.

As calls are asynchronous, use `await` when executing API calls, otherwise the calls will not use the cached token.

## Examples

Ensure that `"type": "module"` is set in your `package.json` to enable ES Modules and async/await support.

### Search for one or more images

```javascript
import api from "gettyimages-api";
const creds = { apiKey: "your_api_key", apiSecret: "your_api_secret" };
const client = new api(creds);

try {
    const response = await client.searchimagescreative()
        .withPage(1)
        .withPageSize(1)
        .withPhrase('beach')
        .execute();
    console.log(JSON.stringify(response.images[0]));
} catch (err) {
    console.error("An error occurred while searching for images:", err);
}
```

### Get detailed information for one or more images

```javascript
import api from "gettyimages-api";
const creds = { apiKey: "your_api_key", apiSecret: "your_api_secret" };
const client = new api(creds);

try {
    const response = await client.images().withId('200261415-001').execute();
    console.log(JSON.stringify(response.images[0]));
} catch (err) {
    console.error("An error occurred while retrieving image details:", err);
}
```

### Get download URL for an image

```javascript
import api from "gettyimages-api";
const creds = { apiKey: "your_api_key", apiSecret: "your_api_secret" };
const client = new api(creds);

try {
    const response = await client.downloadsimages().withId('503928206').execute();
    console.log(response.uri);
} catch (err) {
    console.error(err);
}
```

### Get details and download a video

```javascript
// Gets some info about a video and then downloads the Web version

import api from "gettyimages-api";
import https from "https";
import fs from "fs";

const creds = { apiKey: "your_api_key", apiSecret: "your_api_secret" };
const client = new api(creds);
const videoId = "459425248";

try {
    const response = await client.videos().withResponseField(["summary_set", "downloads"]).withId(videoId).execute();
    console.log("Title: " + response.title);
    console.log("Sizes: ");
    response.download_sizes.forEach((current) => {
        console.log(current.name + " - " + current.description);
    });

    const downloadResponse = await client.downloadsvideos().withId(videoId).withSize("lwf").execute();
    const downloadUri = downloadResponse.uri;
    await downloadFile(downloadUri);
    process.exit(0);

} catch (err) {
    console.error(err);
    process.exit(1);
}

async function downloadFile(url) {
    return new Promise((resolve, reject) => {
        const handleRequest = (currentUrl, redirectCount = 0) => {
            const maxRedirects = 5;

            if (redirectCount > maxRedirects) {
                return reject(new Error("Too many redirects"));
            }

            https.get(currentUrl, (response) => {
                // Handle redirects
                if ([301, 302, 307, 308].includes(response.statusCode)) {
                    const redirectUrl = response.headers.location;
                    if (!redirectUrl) {
                        return reject(new Error("Redirect location not provided"));
                    }
                    return handleRequest(redirectUrl, redirectCount + 1);
                }

                if (response.statusCode !== 200) {
                    return reject(new Error(`Failed to download file: HTTP ${response.statusCode}`));
                }

                const header = response.headers["content-disposition"];
                const outputPath = header.split("filename=")[1];
                const fileStream = fs.createWriteStream(outputPath);
                response.pipe(fileStream);

                fileStream.on("finish", () => {
                    fileStream.close(() => resolve());
                });

                fileStream.on("error", (err) => {
                    fs.unlink(outputPath, () => reject(err));
                });

                response.on("error", (err) => {
                    fs.unlink(outputPath, () => reject(err));
                });
            }).on("error", (err) => {
                reject(err);
            });
        };

        handleRequest(url);
    });
}

```

### Get an access token for use with the Getty Images API

```javascript
import api from "gettyimages-api";
const creds = { apiKey: "your_api_key", apiSecret: "your_api_secret" };
const client = new api(creds);

try {
    const response = await client.getAccessToken();
    console.log(response.access_token);
} catch (err) {
    console.error("An error occurred while retrieving the access token:", err);
}
```

### Use the custom request functionality

```javascript
import api from "gettyimages-api";
const creds = { apiKey: "your_api_key", apiSecret: "your_api_secret" };
const client = new api(creds);

try {
    const response = await client.customrequest()
        .withRoute("search/images")
        .withMethod("get")
        .withQueryParameters({ "phrase": "cat", "file_types": "eps" })
        .execute();
    console.log(JSON.stringify(response.images[0]));
} catch (err) {
    console.error("An error occurred while making the custom request:", err);
}
```

### Add custom parameter and header to a search request

```javascript
import api from "gettyimages-api";
const creds = { apiKey: "your_api_key", apiSecret: "your_api_secret" };
const client = new api(creds);

try {
    const response = await client.searchimagescreative()
        .withPage(1)
        .withPageSize(1)
        .withPhrase('beach')
        .withCustomParameter("safe_search", "true")
        .withCustomHeader("gi-country-code", "CAN")
        .execute();
    console.log(JSON.stringify(response.images[0], null, 1));
} catch (err) {
    console.error("An error occurred while searching for images:", err);
}
```

### Reuse a token between instantiations of the client

If you need to create new instances of the client between calls, such as in a
serverless environment, and want to cache the access token between uses, the SDK
supports this.

```javascript
import api from "gettyimages-api";
// Get the token from your cache. The following line is just an example.
let token = await getTokenFromCache();

const creds = { apiKey: "your_api_key", apiSecret: "your_api_secret", token: token };
const client = new api(creds);
const response = await client.searchimagescreative()
        .withPage(1)
        .withPageSize(1)
        .withPhrase('beach')
        .execute();
// get the token from the client, as it could have been updated if it was expired.
token = client.token;

// Store the token in a cache, e.g. Redis or memcached.
// The following is just an example.
await setTokenInCache(token);
```
