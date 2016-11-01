# Getty Images API Node.js SDK

# Deprecated

As of November 2016, we will no longer be improving or maintaining the language-specific SDKs. The API is still alive and under active feature development. Current documentation can be found at [developers.gettyimages.com/api/docs/](http://developers.gettyimages.com/api/docs/).
SDK source code remains open source, providing a technology example of interaction with the Getty Images API. We will no longer take pull requests for these repositories, but feel free to fork them for your own modifications.
---


## Prerequesites
* [Getty Images API account](https://api.gettyimages.com/member/register)
* [Node.js](http://nodejs.org)
* [NPM](http://npmjs.org)

## Getting Started
The SDK is available as an [npm package](https://www.npmjs.com/package/gettyimages-api). Install in your workspace with:

    $ npm install --save gettyimages-api
## Sample App
There is a very simple sample app that uses the npm package [here](https://github.com/gettyimages/gettyimages-api_nodejs_sample).

## Examples
### Search for one or more images
```javascript
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
```javascript
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

```javascript
var api = require("gettyimages-api");
var creds = { apiKey: "your_api_key", apiSecret: "your_api_secret", username: "your_username", password: "your_password" };
var client = new api (creds);
client.downloads().images().withId('503928206').execute(
    function(err, response) {
        if (err) throw err
        console.log(response.uri)
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
client.videos().withResponseField("summary_set").withResponseField("downloads").withId(videoId).execute((err, response) => {
    if (!err) {
        console.log("Title: " + response.title);
        console.log("Sizes: ");
        response.download_sizes.forEach((current, index, arr) => {
            console.log(current.name + " - " + current.description);
        })
        client.downloads().videos().withId(videoId).withSize("ntsccm").execute((err, response) => {
            if (!err) {
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
            }
        });
    }
});
```
### Get an access token for use with the Getty Images Connect API
```javascript
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
