var assert = require("assert")
var ConnectSdk = require('../connectsdk.js')

describe('ConnectSdk', function() {
	this.timeout(10000);
	
	describe('download', function() {

		it ('can return a uri', function(done) {

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
				assert(response.uri)
				assert(response.uri.length > 0)
				done()
			})
		})
		
		it ('throws an SdkException when username is not specified', function(done) {

			var connectSdk = new ConnectSdk (
				process.env.ConnectSDK_ApiKey,
				process.env.ConnectSDK_ApiSecret,
				null, 
				process.env.ConnectSDK_UserPassword)

			assert.throws(
				function(){var download = connectSdk.download()}, 
				/SdkException: must specify a username/)

			done()
		})
		
		it ('throws an SdkException when password is not specified', function(done) {

			var connectSdk = new ConnectSdk (
				process.env.ConnectSDK_ApiKey,
				process.env.ConnectSDK_ApiSecret,
				process.env.ConnectSDK_UserName, 
				null)

			assert.throws(
				function(){var download = connectSdk.download()}, 
				/SdkException: must specify a password/)

			done()
		})
		
		it ('throws an SdkException when image id is not specified', function(done) {

			var connectSdk = new ConnectSdk (
				process.env.ConnectSDK_ApiKey,
				process.env.ConnectSDK_ApiSecret,
				process.env.ConnectSDK_UserName, 
				process.env.ConnectSDK_UserPassword)

			var download = connectSdk.download()

			assert.throws(function() {
				download.execute(function(err, response) {})
			}, 
			/SdkException: must specify an image id/)
			
			done()
		})
	})
})