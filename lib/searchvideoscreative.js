"use strict";
var querystring = require("querystring");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class SearchVideosCreative extends GettyApiRequest {
    constructor(credentials, hostName) {
        super(credentials, hostName);
        this.ageOfPeople = [];
        this.collectionCodes = [];
        this.collectionsFilterType = null;
        this.excludeEditorialUseOnly = null;
        this.excludeNudity = null;
        this.fields = [];
        this.formatAvailable = null;
        this.frameRates = [];
        this.keywordIds = [];
        this.licenseModels = [];
        this.page = 0;
        this.pageSize = 0;
        this.phrase = null;
        this.productTypes = [];
        this.safeSearch = null;
        this.sortOrder = null;
        this.headers = {};
        this.minClipLength = 0;
    }

    execute() {
        super.addParameter("age_of_people", this.ageOfPeople);
        super.addParameter("collection_codes", this.collectionCodes);
        super.addParameter("collections_filter_type", this.collectionsFilterType);
        super.addParameter("exclude_editorial_use_only", this.excludeEditorialUseOnly);
        super.addParameter("exclude_nudity", this.excludeNudity);
        super.addParameter("fields", this.fields);
        super.addParameter("format_available", this.formatAvailable);
        super.addParameter("frame_rates", this.frameRates);
        super.addParameter("keyword_ids", this.keywordIds);
        super.addParameter("license_models", this.licenseModels);
        super.addParameter("page", this.page);
        super.addParameter("page_size", this.pageSize);
        super.addParameter("phrase", this.phrase);
        super.addParameter("product_types", this.productTypes);
        super.addParameter("safe_search", this.safeSearch);
        super.addParameter("sort_order", this.sortOrder);
        super.addParameter("min_clip_length", this.minClipLength);

        var path = "/v3/search/videos/creative";
        var query = querystring.stringify(this.params);
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

    withMinClipLength(minLengthInSeconds) {
        this.minClipLength = minLengthInSeconds;
        return this;
    }
}

module.exports = SearchVideosCreative;