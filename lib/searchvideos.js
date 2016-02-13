"use strict";
var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class SearchVideos extends GettyApiRequest {
    constructor(credentials, hostName) {
        super(credentials,hostName);
        this.assetFamily = null;
        this.excludeNudity = false;
        this.fields = [];
        this.licenseModels = [];
        this.page = 0;
        this.pageSize = 0;
        this.phrase = null;
        this.sortOrder = null;
        this.ageOfPeople = [];
        this.collectionCodes = [];
        this.collectionsFilterType = null;
        this.keywordIds = [];
        this.productTypes = [];
        this.specificPeople = [];
        this.formatAvailable = null;
    }
    
    creative() {
        this.assetFamily = "creative";
        return this;
    }
    
    editorial() {
        this.assetFamily = "editorial";
        return this;
    }
    
    execute(next) {
        var params = {};
        if (this.excludeNudity) {
            params.exclude_nudity = this.excludeNudity;
        }
        if (this.fields.length > 0) {
            params.fields = this.fields.join(",");
        }
        if (this.licenseModels.length > 0) {
            params.license_models = this.licenseModels.join(",");
        }
        if (this.page > 0) {
            params.page = this.page;
        }
        if (this.pageSize > 0) {
            params.page_size = this.pageSize;
        }
        if (this.phrase) {
            params.phrase = this.phrase;
        }
        if (this.sortOrder) {
            params.sort_order = this.sortOrder;
        }
        if (this.ageOfPeople.length > 0) {
            params.age_of_people = this.ageOfPeople.join(",");
        }
        if (this.collectionCodes.length > 0) {
            params.collection_codes = this.collectionCodes.join(",");
        }
        if (this.collectionsFilterType) {
            params.collections_filter_type = this.collectionsFilterType;
        }
        if (this.keywordIds.length > 0) {
            params.keyword_ids = this.keywordIds.join(",");
        }
        if (this.specificPeople.length > 0) {
            params.specific_people = this.specificPeople.join(",");
        }
        if (this.productTypes.length > 0) {
            params.product_types = this.productTypes.join(",");
        }
        if (this.formatAvailable) {
            params.format_available = this.formatAvailable;
        }
        
        var path = "/v3/search/videos";
        if (this.assetFamily) {
            path += "/";
            path += this.assetFamily;
        }
        var query = querystring.stringify(params);
        path += "?";
        path += query;
        var webHelper = new WebHelper(this.credentials, this.hostName);
        webHelper.get(path, function (err, response) {
            if (err) {
                next(err, null);
            } else {
                next(null, response);
            }
        });
    }
    
    withLicenseModel(licenseModel) {
        if (this.assetFamily === "editorial") {
            throw new SdkException(" must not be an editorial search to add a license model");
        }
        this.licenseModels[this.licenseModels.length] = licenseModel;
        return this;
    }
    
    withExcludeNudity(excludeNudity) {
        this.excludeNudity = excludeNudity;
        return this;
    }
    
    withPage(page) {
        this.page = page;
        return this;
    }
    
    withPageSize(pageSize) {
        this.pageSize = pageSize;
        return this;
    }
    
    withPhrase(phrase) {
        this.phrase = phrase;
        return this;
    }
    
    withResponseField(field) {
        this.fields[this.fields.length] = field;
        return this;
    }
    
    withSortOrder(sortOrder) {
        this.sortOrder = sortOrder;
        return this;
    }
    
    withAgeOfPeople(ageOfPeople) {
        this.ageOfPeople[this.ageOfPeople.length] = ageOfPeople;
        return this;
    }
    
    withCollectionCode(collectionCode) {
        this.collectionCodes[this.collectionCodes.length] = collectionCode;
        return this;
    }
    
    withCollectionsFilterType(collectionsFilterType) {
        this.collectionsFilterType = collectionsFilterType;
        return this;
    }
    
    withKeywordId(keywordId) {
        this.keywordIds[this.keywordIds.length] = keywordId;
        return this;
    }
    
    withProductType(productType) {
        this.productTypes[this.productTypes.length] = productType;
        return this;
    }
    
    withSpecificPerson(specificPerson) {
        if (this.assetFamily === "creative") {
            throw new SdkException("search images must be editorial or blended to add a specific person");
        }
        this.specificPeople[this.specificPeople.length] = specificPerson;
        return this;
    }
    
    withFormatAvailable(formatAvailable) {
        this.formatAvailable = formatAvailable;
        return this;
    }
}

module.exports = SearchVideos;