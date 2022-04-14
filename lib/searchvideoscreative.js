"use strict";
var querystring = require("querystring");
var SdkException = require("./sdkexception.js");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class SearchVideosCreative extends GettyApiRequest {
    constructor(credentials, hostName) {
        super(credentials, hostName);
        this.ageOfPeople = [];
        this.collectionCodes = [];
        this.collectionsFilterType = null;
        this.excludeEditorialUseOnly = false;
        this.excludeNudity = false;
        this.fields = [];
        this.formatAvailable = null;
        this.frameRates = [];
        this.keywordIds = [];
        this.licenseModels = [];
        this.page = 0;
        this.pageSize = 0;
        this.phrase = null;
        this.productTypes = [];
        this.safeSearch = false;
        this.sortOrder = null;
        this.headers = {};
    }

    execute() {
        var params = {};
        addParameter(params, "age_of_people", this.ageOfPeople);
        addParameter(params, "collection_codes", this.collectionCodes);
        addParameter(params, "collections_filter_type", this.collectionsFilterType);
        addParameter(params, "exclude_editorial_use_only", this.excludeEditorialUseOnly)
        addParameter(params, "exclude_nudity", this.excludeNudity);
        addParameter(params, "fields", this.fields);
        addParameter(params, "format_available", this.formatAvailable);
        addParameter(params, "frame_rates", this.frameRates);
        addParameter(params, "keyword_ids", this.keywordIds);
        addParameter(params, "license_models", this.licenseModels);
        addParameter(params, "page", this.page);
        addParameter(params, "page_size", this.pageSize);
        addParameter(params, "phrase", this.phrase);
        addParameter(params, "product_types", this.productTypes);
        addParameter(params, "safe_search", this.safeSearch);
        addParameter(params, "sort_order", this.sortOrder);

        var path = "/v3/search/videos/creative";
        var query = querystring.stringify(params);
        path += "?";
        path += query;
        var webHelper = new WebHelper(this.credentials, this.hostName);
        return webHelper.get(path, this.headers);
    }
    
    withAcceptLanguage(language) {
        this.headers["Accept-Language"] = language;
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

    withExcludeEditorialUseOnly(excludeEditorialUseOnly){
        this.excludeEditorialUseOnly = excludeEditorialUseOnly;
        return this;
    }

    withExcludeNudity(excludeNudity) {
        this.excludeNudity = excludeNudity;
        return this;
    }

    withResponseField(field) {
        this.fields[this.fields.length] = field;
        return this;
    }

    withFormatAvailable(formatAvailable) {
        this.formatAvailable = formatAvailable;
        return this;
    }

    withFrameRate(frameRate) {
        this.frameRates = frameRate;
        return this;
    }

    withKeywordId(keywordId) {
        this.keywordIds[this.keywordIds.length] = keywordId;
        return this;
    }

    withLicenseModel(licenseModel) {
        this.licenseModels[this.licenseModels.length] = licenseModel;
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

    withProductType(productType) {
        this.productTypes[this.productTypes.length] = productType;
        return this;
    }

    withSafeSearch(safeSearch) {
        this.safeSearch = safeSearch;
        return this;
    }

    withSortOrder(sortOrder) {
        this.sortOrder = sortOrder;
        return this;
    }


}

function addParameter(params, key, value) {
    if (value && value.length > 0) {
        if (value.constructor === Array) {
            params[key] = value.join(",");
        } else {
            params[key] = value;
        }
    }
}

module.exports = SearchVideosCreative;