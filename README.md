# Getty Images API Node.js SDK

## Prerequesites
* [Getty Images API account](https://api.gettyimages.com/member/register)
* [Node.js](http://nodejs.org)
* [NPM](http://npmjs.org)

## Getting Started
The SDK is available as an [npm package](https://www.npmjs.com/package/gettyimages-api). Install in your workspace with:

```sh
$ npm install --save gettyimages-api
```

## Sample App
There is a very simple sample app that uses the npm package [here](https://github.com/gettyimages/gettyimages-api_nodejs_sample).

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

var creds = { apiKey: process.env.GettyImagesApi_ApiKey, apiSecret: process.env.GettyImagesApi_ApiSecret, username: process.env.GettyImagesApi_UserName, password: process.env.GettyImagesApi_UserPassword };
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
## Help & Support

* [Getty Images API](http://developers.gettyimages.com/)
* [Contact Developer Support](mailto:developersupport@gettyimages.com)
* [Issue Tracker](https://github.com/gettyimages/gettyimages-api_nodejs/issues)
* [Discuss on Gitter](https://gitter.im/gettyimages/gettyimages-api_nodejs)
