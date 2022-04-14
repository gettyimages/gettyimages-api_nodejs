"use strict";
var querystring = require("querystring");
var WebHelper = require("./webhelper.js");
var SearchRequest = require("./baseclasses/searchrequest.js");

class SearchVideosEditorial extends SearchRequest {
    constructor(credentials, hostName) {
        super(credentials, hostName);
        this.ageOfPeople = [];
        this.collectionCodes = [];
        this.collectionsFilterType = null;
        this.editorialVideoTypes = [];
        this.entityUris = [];
        this.excludeNudity = null;
        this.fields = [];
        this.formatAvailable = null;
        this.frameRates = [];
        this.keywordIds = [];
        this.page = 0;
        this.pageSize = 0;
        this.phrase = null;
        this.productTypes = [];
        this.sortOrder = null;
        this.specificPeople = [];
        this.headers = {};
    }

    execute() {
        var params = {};
        super.addParameter(params, "age_of_people", this.ageOfPeople);
        super.addParameter(params, "collection_codes", this.collectionCodes);
        super.addParameter(params, "collections_filter_type", this.collectionsFilterType);
        super.addParameter(params, "editorial_video_types", this.editorialVideoTypes);
        super.addParameter(params, "entity_uris", this.entityUris);
        super.addParameter(params, "exclude_nudity", this.excludeNudity);
        super.addParameter(params, "fields", this.fields);
        super.addParameter(params, "format_available", this.formatAvailable);
        super.addParameter(params, "frame_rates", this.frameRates);
        super.addParameter(params, "keyword_ids", this.keywordIds);
        super.addParameter(params, "page", this.page);
        super.addParameter(params, "page_size", this.pageSize);
        super.addParameter(params, "phrase", this.phrase);
        super.addParameter(params, "product_types", this.productTypes);
        super.addParameter(params, "sort_order", this.sortOrder);
        super.addParameter(params, "specific_people", this.specificPeople);

        var path = "/v3/search/videos/editorial";
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

    withEditorialVideoType(editorialVideoType) {
        this.editorialVideoTypes[this.editorialVideoTypes.length] = editorialVideoType;
        return this;
    }

    withEntityUris(entityUris) {
        this.entityUris[this.entityUris.length] = entityUris;
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

    withSortOrder(sortOrder) {
        this.sortOrder = sortOrder;
        return this;
    }

    withSpecificPeople(specificPeople) {
        this.specificPeople[this.specificPeople.length] = specificPeople;
        return this;
    }


}

module.exports = SearchVideosEditorial;
