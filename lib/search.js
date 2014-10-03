var SearchImages = require('./searchimages.js')

module.exports = Search

function Search(credentials, hostName) {
	this.images = function() {
		return new SearchImages(credentials, hostName)
	}
}