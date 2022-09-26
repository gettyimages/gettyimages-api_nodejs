"use strict";

const _credentials = new WeakMap();
const _hostName = new WeakMap();

class GettyApiRequest {
    constructor(credentials, hostName) {
        this.credentials = credentials;
        this.hostName = hostName;
        this.headers = {};
        this.params = {};
    }

    get hostName() {
        return _hostName.get(this);
    }

    set hostName(value) {
        _hostName.set(this,value);
    }

    get credentials() {
        return _credentials.get(this);
    }

    set credentials(value) {
        _credentials.set(this,value);
    }  
    
    addParameter(key, value) {
        let formattedValue = value;
        if (Number.isInteger(value) && value !== 0){
            formattedValue = value.toString();
        }
        if (typeof formattedValue === "boolean" || (formattedValue && formattedValue.length > 0)) {
            if (formattedValue.constructor === Array) {
                this.params[key] = formattedValue.join(",");
            } else {
                this.params[key] = formattedValue;
            }
        }
    }

    withCustomParameter(key, value) {
        this.addParameter(key, value);
        return this;
    }

    withCustomHeader(key, value) {
        this.headers[key] = value;
        return this;
    }
}

module.exports = GettyApiRequest;