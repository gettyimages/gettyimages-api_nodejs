module.exports = SdkException

function SdkException(message) {
	this.toString = function() {
		return "SdkException: " + message
	}
}