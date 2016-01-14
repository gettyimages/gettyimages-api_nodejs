var assert = require("assert")
var ConnectSdk = require('../connectsdk.js')

describe('ConnectSdk', function() {

	this.timeout(10000)

	describe('images', function() {
	
		it ('can return a single image', function(done) {
			var connectSdk = new ConnectSdk(
				process.env.ConnectSDK_ApiKey, 
				process.env.ConnectSDK_ApiSecret)

			var images = connectSdk
				.images()
				.withId('200261415-001')
				
			images.execute(function(err, response) {
				if (err) throw err
				assert(response.images_not_found)
				assert.equal(response.images_not_found.length, 0)
				assert(response.images)
				assert.equal(response.images.length, 1)
				done()
			})
		})

		it ('can return multiple images', function(done) {

			var connectSdk = new ConnectSdk(
				process.env.ConnectSDK_ApiKey, 
				process.env.ConnectSDK_ApiSecret)

			var images = connectSdk
				.images()
				.withId('200261415-001')
				.withId('177996097')
				.withIds('73434397,146272813')
				
			images.execute(function(err, response) {
				if (err) throw err
				assert(response.images_not_found)
				assert.equal(response.images_not_found.length, 0)
				assert(response.images)
				assert.equal(response.images.length, 4)
				done()
			})
		})
		
		it ('can return all available response fields', function(done) {
				
			var connectSdk = new ConnectSdk (
				process.env.ConnectSDK_ApiKey,
				process.env.ConnectSDK_ApiSecret,
				process.env.ConnectSDK_UserName, 
				process.env.ConnectSDK_UserPassword)

			var images = connectSdk
				.images()
				.withId('200261415-001')
				.withResponseField('summary_set')
				.withResponseField('detail_set')
				.withResponseField('display_set')
				.withResponseField('artist')
				.withResponseField('artist_title')
				.withResponseField('asset_family')
				.withResponseField('caption')
				.withResponseField('city')
				.withResponseField('collection_id')
				.withResponseField('collection_name')
				.withResponseField('color_type')
				.withResponseField('comp')
				.withResponseField('copyright')
				.withResponseField('country')
				.withResponseField('credit_line')
				.withResponseField('date_created')
				.withResponseField('date_submitted')
				.withResponseField('download_sizes')
				.withResponseField('downloads')
				.withResponseField('editorial_source')
				.withResponseField('id')
				.withResponseField('keywords')
				.withResponseField('largest_downloads')
				.withResponseField('license_model')
				.withResponseField('max_dimensions')
				.withResponseField('quality_rank')
				.withResponseField('preview')
				.withResponseField('allowed_use')
				.withResponseField('state_province')
				.withResponseField('thumb')
				.withResponseField('title')
				.withResponseField('uri_oembed')
				
			images.execute(function(err, response) {
				if (err) throw err
				assert(response.images_not_found)
				assert.equal(response.images_not_found.length, 0)
				assert(response.images)
				assert.equal(response.images.length, 1)
				done()
			})
		})
		
		it ('throws an SdkException when ids are not specified', function(done) {

			var connectSdk = new ConnectSdk(
				process.env.ConnectSDK_ApiKey, 
				process.env.ConnectSDK_ApiSecret)

			var images = connectSdk
				.images()
				
			assert.throws(function() {
				images.execute(function(err, response) {})
			}, 
			/SdkException: must specify at least one image id/)

			done()
		})
	})
})