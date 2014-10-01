var querystring = require('querystring')
var SdkException = require('./sdkexception.js')
var WebHelper = require('./webhelper.js')

module.exports = Download

function Download(credentials, hostName) {

	if (!credentials.getUsername()) {
		throw new SdkException('must specify a username')
	}
	
	if (!credentials.getPassword()) {
		throw new SdkException('must specify a password')
	}
	
	var _id = null
	
	this.withId = function(id) {
		_id = id
		return this
	}

	this.execute = function(next) {

		if (!_id) {
			throw new SdkException('must specify an image id')
		}

		var path = '/v3/downloads/'
		path += _id
		path += '?auto_download=false'
		
		var webHelper = new WebHelper(credentials, hostName)
		webHelper.postQuery(path, function(err, response) {
			if (err) {
				next(err, null)
			} else {
				next(null, response)
			}
		})
	}
}