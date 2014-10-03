var assert = require("assert")
var ConnectSdk = require('../connectsdk.js')

describe('ConnectSdk', function() {

	describe('constructor', function() {
	
		it ('can return a ConnectSdk instance for client_credentials grant type', function(done) {

			var connectSdk = new ConnectSdk (
				process.env.ConnectSDK_ApiKey,
				process.env.ConnectSDK_ApiSecret)
				
			assert(connectSdk)
					
			done()
		})
		
		it ('can return a ConnectSdk instance for password grant type', function(done) {
	
			var connectSdk = new ConnectSdk (
				process.env.ConnectSDK_ApiKey,
				process.env.ConnectSDK_ApiSecret,
				process.env.ConnectSDK_UserName, 
				process.env.ConnectSDK_UserPassword)
				
			assert(connectSdk)
					
			done()
		})
	
		it ('throws an SdkException when apiKey is not specifed', function(done) {

			assert.throws(
				function() {
					var connectSdk = new ConnectSdk (
					null,
					process.env.ConnectSDK_ApiSecret,
					process.env.ConnectSDK_UserName, 
					process.env.ConnectSDK_UserPassword)
			}, 
			/SdkException: must specify an apiKey/)

			done()
		})
		
		it ('throws an SdkException when apiSecret is not specifed', function(done) {

			assert.throws(
				function() {
					var connectSdk = new ConnectSdk (
					process.env.ConnectSDK_ApiKey,
					null,
					process.env.ConnectSDK_UserName, 
					process.env.ConnectSDK_UserPassword)
			}, 
			/SdkException: must specify an apiSecret/)

			done()
		})
	})
})