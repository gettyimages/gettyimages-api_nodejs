// Type definitions for gettyimages-api
// Project: https://github.com/gettyimages/gettyimages-api_nodejs

/**
 * A value accepted by a builder that collects a list of parameters.
 *
 * The builders are named in the singular, however each one accepts either a
 * single value or an array of values. Both forms are supported.
 */
type ListValue = string | string[];

/**
 * A value accepted by a builder that collects a list of identifiers.
 *
 * Identifiers are accepted as strings or numbers.
 */
type IdListValue = string | number | Array<string | number>;

/** The credentials used to construct a client. */
interface Credentials {
    /** Your API key. Required. */
    apiKey: string;
    /** Your API secret. Required for all calls that need an access token. */
    apiSecret?: string;
    /** The username, when using the resource owner password grant. */
    username?: string;
    /** The password, when using the resource owner password grant. */
    password?: string;
    /** A refresh token, when refreshing an existing access token. */
    refresh_token?: string;
    /** A cached access token, to reuse between instances of the client. */
    token?: AccessToken;
}

/**
 * An access token.
 *
 * Read a token from the `token` property of the client and pass it back in as
 * `Credentials.token` to reuse it between instances of the client.
 */
interface AccessToken {
    access_token: string;
    token_type: string;
    /** The time at which the token expires. */
    expiration: Date;
    /** The lifetime of the token in seconds, as returned by the auth service. */
    expires_in?: number | string;
    [key: string]: unknown;
}

/**
 * The error thrown when a request is missing a required value.
 *
 * This type is not an `Error`. It is thrown synchronously from `execute()` and
 * from the client constructor.
 */
interface SdkException {
    message: string;
    toString(): string;
}

/** The base class for every request. */
declare class GettyApiRequest {
    /** The headers sent with the request. */
    headers: Record<string, string>;
    /** The query parameters sent with the request. */
    params: Record<string, string>;
    /** The host name the request is sent to. */
    hostName: string;
    /** Adds a query parameter to the request. */
    addParameter(key: string, value: string | number | boolean | Array<string | number>): void;
    /** Adds a query parameter that the SDK does not otherwise support. */
    withCustomParameter(key: string, value: string | number | boolean | Array<string | number>): this;
    /** Adds a header that the SDK does not otherwise support. */
    withCustomHeader(key: string, value: string): this;
}

/** Gets metadata for one or more images. */
declare class Images extends GettyApiRequest {
    /** The image ids to get. */
    ids: Array<string | number>;
    /** The response fields to return. */
    fields: string[];
    /** Adds an image id to the request. */
    withId(id: string | number): this;
    /** Adds one or more image ids to the request. */
    withIds(ids: IdListValue): this;
    /** Adds one or more response fields to the request. */
    withResponseField(field: ListValue): this;
    /** Sends the request. Throws when no image id is set. */
    execute(): Promise<any>;
}

/** Gets metadata for one or more videos. */
declare class Videos extends GettyApiRequest {
    /** The video ids to get. */
    ids: Array<string | number>;
    /** The response fields to return. */
    fields: string[];
    /** Adds a video id to the request. */
    withId(id: string | number): this;
    /** Adds one or more video ids to the request. */
    withIds(ids: IdListValue): this;
    /** Adds one or more response fields to the request. */
    withResponseField(field: ListValue): this;
    /** Sends the request. Throws when no video id is set. */
    execute(): Promise<any>;
}

/** Gets metadata for one or more events. */
declare class Events extends GettyApiRequest {
    /** The event ids to get. */
    ids: Array<string | number>;
    /** The response fields to return. */
    fields: string[];
    /** Adds an event id to the request. */
    withId(id: string | number): this;
    /** Adds one or more event ids to the request. */
    withIds(ids: IdListValue): this;
    /** Adds one or more response fields to the request. */
    withResponseField(field: ListValue): this;
    /** Sends the request. Throws when no event id is set. */
    execute(): Promise<any>;
}

/** Gets the collections available to you. */
declare class Collections extends GettyApiRequest {
    /** Sends the request. */
    execute(): Promise<any>;
}

/** Gets the list of countries. */
declare class Countries extends GettyApiRequest {
    /** Sends the request. */
    execute(): Promise<any>;
}

/** Downloads an image. */
declare class ImagesDownloads extends GettyApiRequest {
    /** The id of the image to download. */
    id: string | number;
    /** The file type to download. */
    fileType: string;
    /** The height to download. */
    height: string | number;
    /** The id of the product to download against. */
    productId: string | number;
    /** The type of the product to download against. */
    productType: string;
    /** Sets the file type to download. */
    withFileType(fileType: string): this;
    /** Sets the id of the image to download. */
    withId(id: string | number): this;
    /** Sets the height to download. */
    withHeight(height: string | number): this;
    /** Sets the id of the product to download against. */
    withProductId(productId: string | number): this;
    /** Sets the type of the product to download against. */
    withProductType(productType: string): this;
    /** Sends the request. Throws when no image id is set. */
    execute(): Promise<any>;
}

/** Downloads a video. */
declare class VideoDownloads extends GettyApiRequest {
    /** The id of the video to download. */
    id: string | number;
    /** The id of the product to download against. */
    productId: string | number;
    /** The size to download. */
    size: string;
    /** Sets the id of the video to download. */
    withId(id: string | number): this;
    /** Sets the id of the product to download against. */
    withProductId(productId: string | number): this;
    /** Sets the size to download. */
    withSize(size: string): this;
    /** Sends the request. Throws when no video id is set. */
    execute(): Promise<any>;
}

/** Calls any endpoint of the API. */
declare class CustomRequest extends GettyApiRequest {
    /** The HTTP method to use. */
    method: string | null;
    /** The route to call, without the `/v3/` prefix. */
    route: string | null;
    /** The request body. */
    body: any;
    /** The query parameters to send. */
    queryParameters: Record<string, any>;
    /** Sets the HTTP method to use. */
    withMethod(method: "get" | "post" | "put" | "delete" | string): this;
    /** Sets the route to call, for example `search/images`. */
    withRoute(route: string): this;
    /** Sets the query parameters to send. */
    withQueryParameters(queryParameters: Record<string, any>): this;
    /** Sets the request body. */
    withBody(body: any): this;
    /** Sends the request. Throws when no route or no valid method is set. */
    execute(): Promise<any>;
}

/** Searches for images across the creative and editorial catalogs. */
declare class SearchImages extends GettyApiRequest {
    ageOfPeople: string[];
    artists: string[];
    collectionCodes: string[];
    collectionsFilterType: string | null;
    color: string | null;
    compositions: string[];
    embedContentOnly: boolean | null;
    ethnicities: string[];
    eventIds: Array<string | number>;
    excludeNudity: boolean | null;
    fields: string[];
    fileTypes: string[];
    graphicalStyles: string[];
    keywordIds: Array<string | number>;
    minimumSize: string | null;
    numberOfPeople: string[];
    orientations: string[];
    page: number;
    pageSize: number;
    phrase: string | null;
    prestigeContentOnly: boolean | null;
    productTypes: string[];
    sortOrder: string | null;
    specificPeople: string[];
    /** Sets the `Accept-Language` header. */
    withAcceptLanguage(language: string): this;
    withAgeOfPeople(ageOfPeople: ListValue): this;
    withArtist(artists: ListValue): this;
    withCollectionCode(collectionCode: ListValue): this;
    withCollectionsFilterType(collectionsFilterType: string): this;
    withColor(color: string): this;
    withComposition(composition: ListValue): this;
    withEmbedContentOnly(embedContentOnly: boolean): this;
    withEthnicity(ethnicity: ListValue): this;
    withEventId(eventId: IdListValue): this;
    withExcludeNudity(excludeNudity: boolean): this;
    withResponseField(field: ListValue): this;
    withFileType(fileType: ListValue): this;
    withGraphicalStyle(graphicalStyle: ListValue): this;
    withKeywordId(keywordId: IdListValue): this;
    withMinimumSize(minimumSize: string): this;
    withNumberOfPeople(numberOfPeople: ListValue): this;
    withOrientation(orientation: ListValue): this;
    withPage(page: number): this;
    withPageSize(pageSize: number): this;
    withPhrase(phrase: string): this;
    withPrestigeContentOnly(prestigeContentOnly: boolean): this;
    withProductType(productType: ListValue): this;
    withSortOrder(sortOrder: string): this;
    withSpecificPeople(specificPeople: ListValue): this;
    /** Sends the request. */
    execute(): Promise<any>;
}

/** Searches for images in the creative catalog. */
declare class SearchImagesCreative extends GettyApiRequest {
    ageOfPeople: string[];
    artists: string[];
    collectionCodes: string[];
    collectionsFilterType: string | null;
    color: string | null;
    compositions: string[];
    embedContentOnly: boolean | null;
    ethnicities: string[];
    excludeEditorialUseOnly: boolean | null;
    excludeNudity: boolean | null;
    fields: string[];
    fileTypes: string[];
    graphicalStyles: string[];
    keywordIds: Array<string | number>;
    minimumSize: string | null;
    numberOfPeople: string[];
    orientations: string[];
    page: number;
    pageSize: number;
    phrase: string | null;
    prestigeContentOnly: boolean | null;
    productTypes: string[];
    safeSearch: boolean | null;
    sortOrder: string | null;
    /** Sets the `Accept-Language` header. */
    withAcceptLanguage(language: string): this;
    withAgeOfPeople(ageOfPeople: ListValue): this;
    withArtist(artist: ListValue): this;
    withCollectionCode(collectionCode: ListValue): this;
    withCollectionsFilterType(collectionsFilterType: string): this;
    withColor(color: string): this;
    withComposition(composition: ListValue): this;
    withEmbedContentOnly(embedContentOnly: boolean): this;
    withEthnicity(ethnicity: ListValue): this;
    withExcludeEditorialUseOnly(excludeEditorialUseOnly: boolean): this;
    withExcludeNudity(excludeNudity: boolean): this;
    withResponseField(field: ListValue): this;
    withFileType(fileType: ListValue): this;
    withGraphicalStyle(graphicalStyle: ListValue): this;
    withKeywordId(keywordId: IdListValue): this;
    withMinimumSize(minimumSize: string): this;
    withNumberOfPeople(numberOfPeople: ListValue): this;
    withOrientation(orientation: ListValue): this;
    withPage(page: number): this;
    withPageSize(pageSize: number): this;
    withPhrase(phrase: string): this;
    withPrestigeContentOnly(prestigeContentOnly: boolean): this;
    withProductType(productType: ListValue): this;
    withSafeSearch(safeSearch: boolean): this;
    withSortOrder(sortOrder: string): this;
    /** Sends the request. */
    execute(): Promise<any>;
}

/** Searches for images in the editorial catalog. */
declare class SearchImagesEditorial extends GettyApiRequest {
    ageOfPeople: string[];
    artists: string[];
    collectionCodes: string[];
    collectionsFilterType: string | null;
    /** Not initialised by the constructor. Set it with `withColor`. */
    color?: string;
    compositions: string[];
    editorialSegments: string[];
    embedContentOnly: boolean | null;
    endDate: string | null;
    entityUris: Array<string | number>;
    ethnicities: string[];
    eventIds: Array<string | number>;
    excludeNudity: boolean | null;
    fields: string[];
    fileTypes: string[];
    graphicalStyles: string[];
    keywordIds: Array<string | number>;
    minimumQualityRank: number;
    minimumSize: string | null;
    numberOfPeople: string[];
    orientations: string[];
    page: number;
    pageSize: number;
    phrase: string | null;
    productTypes: string[];
    sortOrder: string | null;
    specificPeople: string[];
    startDate: string | null;
    /** Sets the `Accept-Language` header. */
    withAcceptLanguage(language: string): this;
    withAgeOfPeople(ageOfPeople: ListValue): this;
    withArtist(artist: ListValue): this;
    withCollectionCode(collectionCode: ListValue): this;
    withCollectionsFilterType(collectionsFilterType: string): this;
    withColor(color: string): this;
    withComposition(composition: ListValue): this;
    withEditorialSegments(editorialSegments: ListValue): this;
    withEmbedContentOnly(embedContentOnly: boolean): this;
    /** Sets the latest date to search, for example `2015-04-01`. */
    withEndDate(endDate: string): this;
    withEntityUris(entityUris: IdListValue): this;
    withEthnicity(ethnicity: ListValue): this;
    withEventId(eventId: IdListValue): this;
    withExcludeNudity(excludeNudity: boolean): this;
    withResponseField(field: ListValue): this;
    withFileType(fileType: ListValue): this;
    withGraphicalStyle(graphicalStyle: ListValue): this;
    withKeywordId(keywordId: IdListValue): this;
    withMinimumQualityRank(minimumQualityRank: number): this;
    withMinimumSize(minimumSize: string): this;
    withNumberOfPeople(numberOfPeople: ListValue): this;
    withOrientation(orientation: ListValue): this;
    withPage(page: number): this;
    withPageSize(pageSize: number): this;
    withPhrase(phrase: string): this;
    withProductType(productType: ListValue): this;
    withSortOrder(sortOrder: string): this;
    withSpecificPeople(specificPeople: ListValue): this;
    /** Sets the earliest date to search, for example `2015-04-01`. */
    withStartDate(startDate: string): this;
    /** Sends the request. */
    execute(): Promise<any>;
}

/** Searches for videos across the creative and editorial catalogs. */
declare class SearchVideos extends GettyApiRequest {
    ageOfPeople: string[];
    collectionCodes: string[];
    collectionsFilterType: string | null;
    editorialVideoTypes: string[];
    excludeNudity: boolean | null;
    fields: string[];
    formatAvailable: string | null;
    frameRates: string[];
    keywordIds: Array<string | number>;
    licenseModels: string[];
    page: number;
    pageSize: number;
    phrase: string | null;
    productTypes: string[];
    sortOrder: string | null;
    specificPeople: string[];
    /** Sets the `Accept-Language` header. */
    withAcceptLanguage(language: string): this;
    withAgeOfPeople(ageOfPeople: ListValue): this;
    withCollectionCode(collectionCode: ListValue): this;
    withCollectionsFilterType(collectionsFilterType: string): this;
    withEditorialVideoType(editorialVideoType: ListValue): this;
    withExcludeNudity(excludeNudity: boolean): this;
    withResponseField(field: ListValue): this;
    withFormatAvailable(formatAvailable: string): this;
    withFrameRate(frameRate: ListValue): this;
    withKeywordId(keywordId: IdListValue): this;
    withLicenseModel(licenseModel: ListValue): this;
    withPage(page: number): this;
    withPageSize(pageSize: number): this;
    withPhrase(phrase: string): this;
    withProductType(productType: ListValue): this;
    withSortOrder(sortOrder: string): this;
    withSpecificPeople(specificPeople: ListValue): this;
    /** Sends the request. */
    execute(): Promise<any>;
}

/** Searches for videos in the creative catalog. */
declare class SearchVideosCreative extends GettyApiRequest {
    ageOfPeople: string[];
    collectionCodes: string[];
    collectionsFilterType: string | null;
    excludeEditorialUseOnly: boolean | null;
    excludeNudity: boolean | null;
    fields: string[];
    formatAvailable: string | null;
    frameRates: string[];
    keywordIds: Array<string | number>;
    licenseModels: string[];
    minClipLength: number;
    orientations: string[];
    page: number;
    pageSize: number;
    phrase: string | null;
    productTypes: string[];
    safeSearch: boolean | null;
    sortOrder: string | null;
    /** Sets the `Accept-Language` header. */
    withAcceptLanguage(language: string): this;
    withAgeOfPeople(ageOfPeople: ListValue): this;
    withCollectionCode(collectionCode: ListValue): this;
    withCollectionsFilterType(collectionsFilterType: string): this;
    withExcludeEditorialUseOnly(excludeEditorialUseOnly: boolean): this;
    withExcludeNudity(excludeNudity: boolean): this;
    withResponseField(field: ListValue): this;
    withFormatAvailable(formatAvailable: string): this;
    withFrameRate(frameRate: ListValue): this;
    withKeywordId(keywordId: IdListValue): this;
    withLicenseModel(licenseModel: ListValue): this;
    /** Sets the shortest clip length to search, in seconds. */
    withMinClipLength(minLengthInSeconds: number): this;
    withOrientation(orientation: ListValue): this;
    withPage(page: number): this;
    withPageSize(pageSize: number): this;
    withPhrase(phrase: string): this;
    withProductType(productType: ListValue): this;
    withSafeSearch(safeSearch: boolean): this;
    withSortOrder(sortOrder: string): this;
    /** Sends the request. */
    execute(): Promise<any>;
}

/** Searches for videos in the editorial catalog. */
declare class SearchVideosEditorial extends GettyApiRequest {
    ageOfPeople: string[];
    collectionCodes: string[];
    collectionsFilterType: string | null;
    editorialVideoTypes: string[];
    endDate: string | null;
    entityUris: Array<string | number>;
    excludeNudity: boolean | null;
    fields: string[];
    formatAvailable: string | null;
    frameRates: string[];
    keywordIds: Array<string | number>;
    orientations: string[];
    page: number;
    pageSize: number;
    phrase: string | null;
    productTypes: string[];
    sortOrder: string | null;
    specificPeople: string[];
    startDate: string | null;
    /** Sets the `Accept-Language` header. */
    withAcceptLanguage(language: string): this;
    withAgeOfPeople(ageOfPeople: ListValue): this;
    withCollectionCode(collectionCode: ListValue): this;
    withCollectionsFilterType(collectionsFilterType: string): this;
    withEditorialVideoType(editorialVideoType: ListValue): this;
    /** Sets the latest date to search, for example `2015-04-01`. */
    withEndDate(endDate: string): this;
    withEntityUris(entityUris: IdListValue): this;
    withExcludeNudity(excludeNudity: boolean): this;
    withResponseField(field: ListValue): this;
    withFormatAvailable(formatAvailable: string): this;
    withFrameRate(frameRate: ListValue): this;
    withKeywordId(keywordId: IdListValue): this;
    withOrientation(orientation: ListValue): this;
    withPage(page: number): this;
    withPageSize(pageSize: number): this;
    withPhrase(phrase: string): this;
    withProductType(productType: ListValue): this;
    withSortOrder(sortOrder: string): this;
    withSpecificPeople(specificPeople: ListValue): this;
    /** Sets the earliest date to search, for example `2015-04-01`. */
    withStartDate(startDate: string): this;
    /** Sends the request. */
    execute(): Promise<any>;
}

/**
 * The Getty Images API client.
 *
 * Create the client once and reuse it for all calls, so that the access token
 * is cached and the number of calls to auth is kept to a minimum.
 */
declare class GettyImagesApi {
    /**
     * @param credentials Your API key and secret. Throws when `apiKey` is missing.
     * @param hostName Defaults to `api.gettyimages.com`.
     * @param authHostName Defaults to `authentication.gettyimages.com`.
     */
    constructor(credentials: Credentials, hostName?: string, authHostName?: string);
    /** The credentials the client was created with. */
    credentials: Credentials;
    /** The host name requests are sent to. */
    hostName: string;
    /**
     * The current access token.
     *
     * Read this after a call to cache the token, as it is refreshed when it
     * expires.
     */
    readonly token: AccessToken;
    /** Gets an access token, refreshing it when a refresh token was supplied. */
    getAccessToken(): Promise<AccessToken | null>;
    /** Creates a request for image metadata. */
    images(): Images;
    /** Creates a request for video metadata. */
    videos(): Videos;
    /** Creates a video search across both catalogs. */
    searchvideos(): SearchVideos;
    /** Creates a creative video search. */
    searchvideoscreative(): SearchVideosCreative;
    /** Creates an editorial video search. */
    searchvideoseditorial(): SearchVideosEditorial;
    /** Creates an image search across both catalogs. */
    searchimages(): SearchImages;
    /** Creates a creative image search. */
    searchimagescreative(): SearchImagesCreative;
    /** Creates an editorial image search. */
    searchimageseditorial(): SearchImagesEditorial;
    /** Creates a request for the collections available to you. */
    collections(): Collections;
    /** Creates a request for the list of countries. */
    countries(): Countries;
    /** Creates a request for event metadata. */
    events(): Events;
    /** Creates a video download request. */
    downloadsvideos(): VideoDownloads;
    /** Creates an image download request. */
    downloadsimages(): ImagesDownloads;
    /** Creates a request against any endpoint of the API. */
    customrequest(): CustomRequest;
}

export = GettyImagesApi;
