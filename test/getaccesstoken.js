var assert = require("assert")
var ConnectSdk = require('../connectsdk.js')
var Credentials = require('../lib/credentials.js')

describe('ConnectSdk', function() {
	
	describe('getAccessToken', function() {

		it ('can return an access token for client_credentials grant type', function(done) {

			var connectSdk = new ConnectSdk (
				process.env.ConnectSDK_ApiKey,
				process.env.ConnectSDK_ApiSecret)

			connectSdk.getAccessToken(function(err, response) {
				if (err) throw err
				assert(response.access_token)
				assert.equal(response.token_type, 'Bearer')
				assert(!response.refresh_token)
				assert.equal(response.expires_in, '1800')
				assert(response.expiration)
				done()
			})
		})

		it ('can return an access token for password grant type', function(done) {

			var connectSdk = new ConnectSdk (
				process.env.ConnectSDK_ApiKey,
				process.env.ConnectSDK_ApiSecret,
				process.env.ConnectSDK_UserName, 
				process.env.ConnectSDK_UserPassword)
																		
			connectSdk.getAccessToken(function(err, response) {
				if (err) throw err
				assert(response.access_token)
				assert.equal(response.token_type, 'Bearer')
				assert(response.refresh_token)
				assert.equal(response.expires_in, '1800')
				assert(response.expiration)
				done()
			})
		})
	})
})