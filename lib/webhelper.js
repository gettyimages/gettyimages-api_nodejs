var https = require('https')
var querystring = require('querystring')

module.exports = WebHelper

function WebHelper(credentials, hostName) {

	this.get = function(path, next) {
	
		var options = {
			hostname: hostName,
			method: 'GET', 
			path: path, 
			port: 443, 
			headers: { 
				'Api-Key': credentials.getApiKey(), 
				'Accept': 'application/json'
			}
		}
	
		if (credentials.getUsername() && credentials.getPassword()) {
			credentials.getAccessToken(function(err, response) {
				if (err) {
					next(err, null)
				} else {
					if (response.access_token) {
						options.headers.Authorization = 'Bearer ' + response.access_token
					}
					var request = beginRequest(options, next)	
					request.end()
				}
			})
		} else {
			var request = beginRequest(options, next)	
			request.end()
		}
	}
	
	this.postForm = function(postData, path, next) {
	
		var options = {
			hostname: hostName, 
			method: 'POST', 
			path: path, 
			port: 443, 
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded', 
				'Content-Length': postData.length
			}
		}

		var request = beginRequest(options, next)	
		request.write(postData)
		request.end()
	}
	
	this.postQuery = function(path, next) {
	
		credentials.getAccessToken(function(err, response) {
			if (err) {
				next(err, null)
			} else {
				var options = {
					hostname: hostName, 
					method: 'POST', 
					path: path, 
					port: 443, 
					headers: { 
						'Api-Key': credentials.getApiKey(),
						'Authorization': 'Bearer ' + response.access_token,
						'Content-Length': 0
					}
				}
				var request = beginRequest(options, next)	
				request.end()
			}
		})
	}
	
	function beginRequest(options, next) {

		return https.request(options, function(response) {	

			response.setEncoding('utf8')
			var str = ''

			response.on('data', function(chunk) {
				str += chunk
			})
			response.on('end', function() {
				next(null, JSON.parse(str))
			})
			response.on('error', function(err) {
				next(err, null)
			})
		})
	}
}