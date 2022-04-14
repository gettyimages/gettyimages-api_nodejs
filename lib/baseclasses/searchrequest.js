var GettyApiRequest = require("./gettyApiRequest.js");
class SearchRequest extends GettyApiRequest {

    addParameter(params, key, value) {
        let formattedValue = value;
        if (Number.isInteger(value) && value !== 0){
            formattedValue = value.toString();
        }
        if (typeof formattedValue === "boolean" || (formattedValue && formattedValue.length > 0)) {
            if (formattedValue.constructor === Array) {
                params[key] = formattedValue.join(",");
            } else {
                params[key] = formattedValue;
            }
        }
    }
}

module.exports =  SearchRequest;