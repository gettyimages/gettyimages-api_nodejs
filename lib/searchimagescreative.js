"use strict";

var querystring = require("querystring");
var WebHelper = require("./webhelper.js");
var GettyApiRequest = require("./baseclasses/gettyApiRequest.js");

class SearchImagesCreative extends GettyApiRequest {
    constructor(credentials, hostName) {
        super(credentials, hostName);
        this.ageOfPeople = [];
        this.artists = [];
        this.collectionCodes = [];
        this.collectionsFilterType = null;
        this.color = null;
        this.compositions = [];
        this.embedContentOnly = null;
        this.ethnicities = [];
        this.excludeEditorialUseOnly = null;
        this.excludeNudity = null;
        this.fields = [];
        this.fileTypes = [];
        this.graphicalStyles = [];
        this.keywordIds = [];
        this.minimumSize = null;
        this.numberOfPeople = [];
        this.orientations = [];
        this.page = 0;
        this.pageSize = 0;
        this.phrase = null;
        this.prestigeContentOnly = null;
        this.productTypes = [];
        this.sortOrder = null;
        this.safeSearch = null;
    }

    execute() {
        super.addParameter("age_of_people", this.ageOfPeople);
        super.addParameter("artists", this.artists);
        super.addParameter("collection_codes", this.collectionCodes);
        super.addParameter("collections_filter_type", this.collectionsFilterType);
        super.addParameter("color", this.color);
        super.addParameter("compositions", this.compositions);
        super.addParameter("embed_content_only", this.embedContentOnly);
        super.addParameter("ethnicity", this.ethnicities);
        super.addParameter("exclude_editorial_use_only", this.excludeEditorialUseOnly);
        super.addParameter("exclude_nudity", this.excludeNudity);
        super.addParameter("fields", this.fields);
        super.addParameter("file_types", this.fileTypes);
        super.addParameter("graphical_styles", this.graphicalStyles);
        super.addParameter("keyword_ids", this.keywordIds);
        super.addParameter("minimum_size", this.minimumSize);
        super.addParameter("number_of_people", this.numberOfPeople);
        super.addParameter("orientations", this.orientations);
        super.addParameter("page", this.page);
        super.addParameter("page_size", this.pageSize);
        super.addParameter("phrase", this.phrase);
        super.addParameter("prestige_content_only", this.prestigeContentOnly);
        super.addParameter("product_types", this.productTypes);
        super.addParameter("safe_search", this.safeSearch);
        super.addParameter("sort_order", this.sortOrder);

        var path = "/v3/search/images/creative";
        var query = querystring.stringify(this.params);
        path += "?";
        path += query;
        var webHelper = new WebHelper(this.credentials, this.hostName);
        return webHelper.get(path,this.headers);
    }

    withAcceptLanguage(language) {
        this.headers["Accept-Language"] = language;
        return this;
    }

    withAgeOfPeople(ageOfPeople) {
        this.ageOfPeople[this.ageOfPeople.length] = ageOfPeople;
        return this;
    }
    withArtist(artist) {
        this.artists[this.artists.length] = artist;
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
    withColor(color) {
        this.color = color;
        return this;
    }
    withComposition(composition) {
        this.compositions[this.compositions.length] = composition;
        return this;
    }
    withEmbedContentOnly(embedContentOnly) {
        this.embedContentOnly = embedContentOnly;
        return this;
    }
    withEthnicity(ethnicity) {
        this.ethnicities[this.ethnicities.length] = ethnicity;
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
    withFileType(fileType) {
        this.fileTypes[this.fileTypes.length] = fileType;
        return this;
    }
    withGraphicalStyle(graphicalStyle) {
        this.graphicalStyles[this.graphicalStyles.length] = graphicalStyle;
        return this;
    }
    withKeywordId(keywordId) {
        this.keywordIds[this.keywordIds.length] = keywordId;
        return this;
    }
    withMinimumSize(minimumSize) {
        this.minimumSize = minimumSize;
        return this;
    }
    withNumberOfPeople(numberOfPeople) {
        this.numberOfPeople[this.numberOfPeople.length] = numberOfPeople;
        return this;
    }
    withOrientation(orientation) {
        this.orientations[this.orientations.length] = orientation;
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
    withPrestigeContentOnly(prestigeContentOnly) {
        this.prestigeContentOnly = prestigeContentOnly;
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

module.exports = SearchImagesCreative;
