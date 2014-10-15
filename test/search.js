var assert = require("assert")
var ConnectSdk = require('../connectsdk.js')

describe('ConnectSdk', function() {

	describe('search', function() {

		it ('can return blended image results', function(done) {
	
			var connectSdk = new ConnectSdk(
				process.env.ConnectSDK_ApiKey, 
				process.env.ConnectSDK_ApiSecret)

			var search = connectSdk
				.search()
				.images()
				.withEmbedContentOnly('true')
				.withExcludeNudity('true')
				.withGraphicalStyle('fine_art')
				.withGraphicalStyle('photography')
				.withGraphicalStyle('illustration')
				.withLicenseModel('rights_managed')
				.withLicenseModel('royalty_free')
				.withOrientation('horizontal')
				.withOrientation('panoramic_horizontal')
				.withOrientation('panoramic_vertical')
				.withOrientation('square')
				.withOrientation('vertical')
				.withPage(1)
				.withPageSize(1)
				.withPhrase('beach')
					
			search.execute(function(err, response) {
				if (err) throw err
				assert(response.result_count)
				assert(response.result_count > 0)
				assert(response.images)
				assert.equal(response.images.length, 1)
				assert(response.images[0].id)
				done()
			})
		})
		
		it ('can return creative image results', function(done) {

			var connectSdk = new ConnectSdk(
				process.env.ConnectSDK_ApiKey, 
				process.env.ConnectSDK_ApiSecret)
			
			var search = connectSdk
				.search()
				.images()
				.creative()
				.withEmbedContentOnly('true')
				.withExcludeNudity('true')
				.withGraphicalStyle('fine_art')
				.withGraphicalStyle('photography')
				.withGraphicalStyle('illustration')
				.withLicenseModel('rights_managed')
				.withLicenseModel('royalty_free')
				.withOrientation('horizontal')
				.withOrientation('panoramic_horizontal')
				.withOrientation('panoramic_vertical')
				.withOrientation('square')
				.withOrientation('vertical')
				.withPage(1)
				.withPageSize(1)
				.withPhrase('beach')
				.withResponseField('asset_family')
					
			search.execute(function(err, response) {
				if (err) throw err
				assert(response.result_count)
				assert(response.result_count > 0)
				assert(response.images)
				assert.equal(response.images.length, 1)
				assert(response.images[0].id)
				assert(response.images[0].asset_family)
				assert.equal(response.images[0].asset_family, 'Creative')
				done()
			})
		})
		
		it ('can return editorial image results', function(done) {
		
			var connectSdk = new ConnectSdk(
				process.env.ConnectSDK_ApiKey, 
				process.env.ConnectSDK_ApiSecret)

			var search = connectSdk
				.search()
				.images()
				.editorial()
				.withEditorialSegment('archival')
				.withEditorialSegment('entertainment')
				.withEditorialSegment('news')
				.withEditorialSegment('publicity')
				.withEditorialSegment('royalty')
				.withEditorialSegment('sport')
				.withEmbedContentOnly('true')
				.withExcludeNudity('true')
				.withGraphicalStyle('photography')
				.withGraphicalStyle('illustration')
				.withOrientation('horizontal')
				.withOrientation('panoramic_horizontal')
				.withOrientation('panoramic_vertical')
				.withOrientation('square')
				.withOrientation('vertical')
				.withPage(1)
				.withPageSize(1)
				.withPhrase('beach')
				.withResponseField('asset_family')
				
			search.execute(function(err, response) {
				if (err) throw err
				assert(response.result_count)
				assert(response.result_count > 0)
				assert(response.images)
				assert.equal(response.images.length, 1)
				assert(response.images[0].id)
				assert(response.images[0].asset_family)
				assert.equal(response.images[0].asset_family, 'Editorial')
				done()
			})
		})
		
		it ('can return all available response fields', function(done) {
	
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
				.withResponseField('summary_set')
				.withResponseField('detail_set')
				.withResponseField('display_set')
				.withResponseField('asset_family')
				.withResponseField('caption')
				.withResponseField('collection_id')
				.withResponseField('collection_name')
				.withResponseField('comp')
				.withResponseField('id')
				.withResponseField('largest_downloads')
				.withResponseField('license_model')
				.withResponseField('max_dimensions')
				.withResponseField('people')
				.withResponseField('preview')
				.withResponseField('thumb')
				.withResponseField('title')
					
			search.execute(function(err, response) {
				if (err) throw err
				assert(response.result_count)
				assert(response.result_count > 0)
				assert(response.images)
				assert.equal(response.images.length, 1)
				done()
			})
		})
		
		it ('can return mutiple pages when reusing a search object', function(done) {
	
			var connectSdk = new ConnectSdk(
				process.env.ConnectSDK_ApiKey, 
				process.env.ConnectSDK_ApiSecret)

			var search = connectSdk
				.search()
				.images()
				.withPageSize(1)
				.withPhrase('beach')
				
			var prevId = null
			var currId = null
			
			for (page = 0; page < 5; page++) {
				search.withPage(page).execute(function(err, response) {
					if (err) throw err
					assert(response.result_count)
					assert(response.result_count > 1)
					assert(response.images)
					assert.equal(response.images.length, 1)
					assert(response.images[0].id)
					currId = response.images[0].id
					assert(prevId !== currId)
					prevId = currId
				})
			}

			done()
		})
		
		it ('throws an SdkException when an editorial segment is specified on a blended search', function(done) {

			var connectSdk = new ConnectSdk(
				process.env.ConnectSDK_ApiKey, 
				process.env.ConnectSDK_ApiSecret)
					
			assert.throws(function() {
				var search = connectSdk
					.search()
					.images()
					.withEditorialSegment('news')
			}, 
			/SdkException: search images must be editorial to add an editorial segment/)

			done()
		})
		
		it ('throws an SdkException when an editorial segment is specified on a creative search', function(done) {

			var connectSdk = new ConnectSdk(
				process.env.ConnectSDK_ApiKey, 
				process.env.ConnectSDK_ApiSecret)
				
			assert.throws(function() {
				var search = connectSdk
					.search()
					.images()
					.creative()
					.withEditorialSegment('news')
			}, 
			/SdkException: search images must be editorial to add an editorial segment/)
				
			done()
		})
		
		it ('throws an SdkException when a license model is specified on an editorial search', function(done) {

			var connectSdk = new ConnectSdk(
				process.env.ConnectSDK_ApiKey, 
				process.env.ConnectSDK_ApiSecret)
				
			assert.throws(function() {
				var search = connectSdk
					.search()
					.images()
					.editorial()
					.withLicenseModel('rights_managed')
			}, 
			/SdkException: search images must not be editorial to add a license model/)
				
			done()
		})
		
		it ('throws an SdkException when phrase is not specified', function(done) {

			var connectSdk = new ConnectSdk(
				process.env.ConnectSDK_ApiKey, 
				process.env.ConnectSDK_ApiSecret)

			var search = connectSdk
				.search()
				.images()
			
			assert.throws(function() {
				search.execute(function(err, response) {})
			}, 
			/SdkException: must specify a phrase/)
				
			done()
		})
	})
})