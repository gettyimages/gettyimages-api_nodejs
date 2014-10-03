var querystring = require('querystring')
var SdkException = require('./sdkexception.js')
var WebHelper = require('./webhelper.js')

module.exports = Images

function Images(credentials, hostName) {

	var _ids = []
	var _fields = []
	
	this.withId = function(id) {
		_ids[_ids.length] = id
		return this;
	}

	this.withIds = function(ids) {
		_ids.push.call(_ids, ids)
		return this;
	}

	this.withResponseField = function(field) {
		_fields[_fields.length] = field
		return this;
	}

	this.execute = function(next) {
		
		if (_ids.length === 0) {
			throw new SdkException('must specify at least one image id')
		}

		var path = '/v3/images/'
		
		var idList = _ids.join(',')
		path += idList	
		
		if (_fields.length > 0) {
			var params = {}
			params.fields = _fields.join(',')
			
			var query = querystring.stringify(params)
			path += '?'
			path += query
		}
		
		var webHelper = new WebHelper(credentials, hostName)
		webHelper.get(path, function(err, response) {
			if (err) {
				next(err, null)
			} else {
				next(null, response)
			}
		})
	}
}