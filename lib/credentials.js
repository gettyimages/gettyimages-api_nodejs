var querystring = require('querystring')
var WebHelper = require('./webhelper.js')

module.exports = Credentials

function Credentials(apiKey, apiSecret, username, password, hostName) {
	
	var _accessToken = null
	var _apiKey = apiKey
	var _apiSecret = apiSecret
	var _username = username
	var _password = password
	
	this.getAccessToken = function(next) {

		if (!shouldRefreshToken()) {
			next(null, _accessToken)
		}
		
		var params = { 
			client_id: apiKey, 
			client_secret: apiSecret, 
			grant_type: 'client_credentials'
		}
		
		if (username && password) {
			params.username = username
			params.password = password
			params.grant_type = 'password'
		}
		
		var postData = querystring.stringify(params)
		var path = '/oauth2/token'
		
		var webHelper = new WebHelper(this, hostName)
		webHelper.postForm(postData, path, function(err, response) {
			if (err) {
				next(err, null)
			} else {
				var expireTime = new Date()
				expireTime.setSeconds(expireTime.getSeconds() + Number(response.expires_in))
				_accessToken = response
				_accessToken.expiration = expireTime
				next(null, _accessToken)
			}
		})
	}

	this.getApiKey = function() {
		return _apiKey
	}
	
	this.getPassword = function() {
		return _password
	}
	
	this.getUsername = function() {
		return _username
	}
	
	function shouldRefreshToken() {
		if (_accessToken && _accessToken.expiration) {
			return new Date(Date.now() - 5000) > _accessToken.expiration
		} else {
			return true
		}
	}
}