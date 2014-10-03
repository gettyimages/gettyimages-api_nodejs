var Credentials = require('./lib/credentials.js')
var Download = require('./lib/download.js')
var Images = require('./lib/images.js')
var SdkException = require('./lib/sdkexception.js')
var Search = require('./lib/search.js')

module.exports = ConnectSdk

function ConnectSdk(apiKey, apiSecret, username, password, hostName) {

	if (!apiKey) {
		throw new SdkException('must specify an apiKey')
	}
	
	if (!apiSecret) {
		throw new SdkException('must specify an apiSecret')
	}
	
	if (!hostName) {
		hostName = 'connect.gettyimages.com'
	}
	
	var credentials = new Credentials(apiKey, apiSecret, username, password, hostName)
	
	this.download = function() {
		return new Download(credentials, hostName)
	}

	this.getAccessToken = function(next) {
		credentials.getAccessToken(function(err, accessToken) {
			if (err) {
				next(err, null)
			} else {
				next(null, accessToken)
			}
		})
	}

	this.images = function() {
		return new Images(credentials, hostName)
	}

	this.search = function() {
		return new Search(credentials, hostName)
	}
}