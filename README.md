# Getty Images Connect SDK
###Node.js SDK for the  Getty Images Connect API

## Prerequesites
* [Getty Images Connect account](https://api.gettyimages.com/member/register)
* [Node.js](http://nodejs.org)
* [NPM](http://npmjs.org)

## Getting Started
Create the following system environment variables using your Getty Images Connect credentials:

 *  **ConnectSDK_ApiKey**
 *  **ConnectSDK_ApiSecret**
 *  **ConnectSDK_UserName**
 *  **ConnectSDK_UserPassword**

Install the Getty Images Connect SDK:

    $ npm install -g connectsdk

Test your install. From the ConnectSdk directory:

    $ npm test

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

* [Connect Getty Images API](http://api.gettyimages.com/)
* [Contact Developer Support](mailto:developersupport@gettyimages.com)