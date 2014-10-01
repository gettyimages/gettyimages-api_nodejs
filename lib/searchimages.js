var querystring = require('querystring')
var SdkException = require('./sdkexception.js')
var WebHelper = require('./webhelper.js')

module.exports = SearchImages

function SearchImages(credentials, hostName) {

	var _assetFamily = null
	var _editorialSegments = []
	var _embedContentOnly = false
	var _excludeNudity = false
	var _fields = []
	var _graphicalStyles = []
	var _licenseModels = []
	var _orientations = []
	var _page = 0
	var _pageSize = 0
	var _phrase = null
	var _sortOrder = null
	
	this.creative = function() {
		_assetFamily = 'creative'
		return this;
	}

	this.editorial = function() {
		_assetFamily = 'editorial'
		return this;
	}

	this.execute = function(next) {

		if (!_phrase) {
			throw new SdkException('must specify a phrase')
		}
		
		var params = {}
		
		if (_editorialSegments.length > 0) {
			params.editorial_segments = _editorialSegments.join(',')
		}
		
		if (_embedContentOnly) {
			params.embed_content_only = _embedContentOnly
		}
		
		if (_excludeNudity) {
			params.exclude_nudity = _excludeNudity
		}
		
		if (_fields.length > 0) {
			params.fields = _fields.join(',')
		}
		
		if (_graphicalStyles.length > 0) {
			params.graphical_styles = _graphicalStyles.join(',')
		}
		
		if (_licenseModels.length > 0) {
			params.license_models = _licenseModels.join(',')
		}
		
		if (_orientations.length > 0) {
			params.orientations = _orientations.join(',')
		}
		
		if (_page > 0) {
			params.page = _page
		}
		
		if (_pageSize > 0) {
			params.page_size = _pageSize
		}
		
		if (_phrase) {
			params.phrase = _phrase
		}
		
		if (_sortOrder) {
			params.sort_order = _sortOrder
		}
		
		var path = '/v3/search/images'
		if (_assetFamily) {
			path += '/'
			path += _assetFamily
		}
		
		var query = querystring.stringify(params)
		path += '?'
		path += query
		
		var webHelper = new WebHelper(credentials, hostName)
		webHelper.get(path, function(err, response) {
			if (err) {
				next(err, null)
			} else {
				next(null, response)
			}
		})
	}
	
	this.withEditorialSegment = function(editorialSegment) {
		if (_assetFamily !== 'editorial') {
			throw new SdkException('search images must be editorial to add an editorial segment')
		}
		_editorialSegments[_editorialSegments.length] = editorialSegment
		return this;
	}
	
	this.withLicenseModel = function(licenseModel) {
		if (_assetFamily === 'editorial') {
			throw new SdkException('search images must not be editorial to add a license model')
		}
		_licenseModels[_licenseModels.length] = licenseModel
		return this;
	}

	this.withEmbedContentOnly = function(embedContentOnly) {
		_embedContentOnly = embedContentOnly
		return this
	}

	this.withExcludeNudity = function(excludeNudity) {
		_excludeNudity = excludeNudity
		return this
	}

	this.withGraphicalStyle = function(graphicalStyle) {
		_graphicalStyles[_graphicalStyles.length] = graphicalStyle
		return this;
	}

	this.withOrientation = function(orientation) {
		_orientations[_orientations.length] = orientation
		return this;
	}

	this.withPage = function(page) {
		_page = page
		return this
	}

	this.withPageSize = function(pageSize) {
		_pageSize = pageSize
		return this
	}

	this.withPhrase = function(phrase) {
		_phrase = phrase
		return this
	}

	this.withResponseField = function(field) {
		_fields[_fields.length] = field
		return this;
	}

	this.withSortOrder = function(sortOrder) {
		_sortOrder = sortOrder
		return this
	}
}