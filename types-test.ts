/*
 * Compile-time test for gettyimages-api.d.ts.
 *
 * This file is never run. It exists so that `tsc --noEmit` fails if a
 * declaration rejects a call that the SDK supports today. Every call form below
 * is taken from the AVA tests in `tests/` or from the examples in README.md.
 *
 * Add a case here whenever you change a signature in gettyimages-api.d.ts.
 */

import api from "./gettyimages-api";

const creds = { apiKey: "key", apiSecret: "secret" };
const client = new api(creds);

// The constructor overloads, per the README and lib/credentials.js.
new api({ apiKey: "key" });
new api({ apiKey: "key", apiSecret: "secret" });
new api({ apiKey: "key", apiSecret: "secret", username: "u", password: "p" });
new api({ apiKey: "key", apiSecret: "secret", refresh_token: "r" });
new api(creds, "api.gettyimages.com");
new api(creds, "api.gettyimages.com", "authentication.gettyimages.com");

// The `require` form must keep working alongside the default import.
import assignment = require("./gettyimages-api");
new assignment(creds);

// The token cache round-trip from the README: read the token off the client,
// then pass it back in when constructing the next one.
const cachedToken = client.token;
const reusedClient = new api({ apiKey: "key", apiSecret: "secret", token: cachedToken });
const accessToken: string = cachedToken.access_token;
const tokenType: string = cachedToken.token_type;
const expiration: Date = cachedToken.expiration;

async function auth(): Promise<void> {
    const token = await client.getAccessToken();
    if (token) {
        const value: string = token.access_token;
    }
}

// Responses are untyped, so reading an arbitrary field must compile.
async function responses(): Promise<void> {
    const response = await client.searchimages().withPhrase("beach").execute();
    console.log(response.images[0].id);
    console.log(response.result_count);
}

// Metadata requests: scalar and array ids, both strings and numbers.
client.images().withId("123").execute();
client.images().withIds("123").execute();
client.images().withIds(123).execute();
client.images().withIds(["456", "789"]).execute();
client.images().withResponseField("id").withResponseField(["id", "artist"]).execute();
client.videos().withId("101112").withResponseField(["summary_set", "downloads"]).execute();
client.videos().withIds([123, 456]).execute();
client.events().withId("123").withIds(["456", "789"]).withResponseField("id").execute();

// Requests with no parameters of their own.
client.collections().execute();
client.countries().execute();

// Downloads. Note the string height and the numeric product id, per the tests.
client.downloadsimages()
    .withId("503928206")
    .withFileType("jpg")
    .withHeight("592")
    .withHeight(592)
    .withProductId(5678)
    .withProductId("5678")
    .withProductType("easyaccess")
    .execute();
client.downloadsvideos().withId("123").withSize("hd1").withProductId(5678).execute();

// Custom requests, for each supported method.
client.customrequest().withRoute("search/images").withMethod("get")
    .withQueryParameters({ phrase: "cat", file_types: "eps" }).execute();
client.customrequest().withRoute("boards/123").withMethod("post")
    .withBody({ name: "this board", description: "some description" }).execute();
client.customrequest().withRoute("boards/123").withMethod("put").withBody({ name: "n" }).execute();
client.customrequest().withRoute("boards/123").withMethod("delete").execute();

// Image search across both catalogs. Singular builders take arrays.
client.searchimages()
    .withAcceptLanguage("en-us")
    .withAgeOfPeople(["adult", "newborn", "0-1_months"])
    .withArtist(["roman makhmutov", "Linda Raymond"])
    .withCollectionCode(["WRI", "ARF"])
    .withCollectionsFilterType("exclude")
    .withColor("#002244")
    .withComposition(["abstract", "headshot"])
    .withEmbedContentOnly(true)
    .withEthnicity(["black", "japanese"])
    .withEventId([1234, 5678])
    .withExcludeNudity(true)
    .withResponseField(["asset_family", "id"])
    .withFileType(["eps", "jpg"])
    .withGraphicalStyle(["fine_art", "illustration"])
    .withKeywordId([1234, 5678])
    .withMinimumSize("small")
    .withNumberOfPeople(["one", "group"])
    .withOrientation(["horizontal", "square"])
    .withPage(3)
    .withPageSize(50)
    .withPhrase("cat")
    .withPrestigeContentOnly(true)
    .withProductType(["easyaccess", "editorialsubscription"])
    .withSortOrder("newest")
    .withSpecificPeople("reggie jackson")
    .execute();

// The same builders called with single values rather than arrays.
client.searchimages()
    .withAgeOfPeople("adult")
    .withArtist("roman makhmutov")
    .withCollectionCode("WRI")
    .withComposition("headshot")
    .withEthnicity("black")
    .withEventId(1234)
    .withEventId("1234")
    .withFileType("jpg")
    .withGraphicalStyle("fine_art")
    .withKeywordId(1234)
    .withNumberOfPeople("one")
    .withOrientation("horizontal")
    .withProductType("easyaccess")
    .withResponseField("id")
    .withSpecificPeople(["reggie jackson", "babe ruth"])
    .execute();

client.searchimagescreative()
    .withAcceptLanguage("en-us")
    .withAgeOfPeople(["12-17_months", "mature_adult"])
    .withArtist(["roman makhmutov"])
    .withCollectionCode(["WRI"])
    .withCollectionsFilterType("exclude")
    .withColor("#002244")
    .withComposition(["abstract"])
    .withEmbedContentOnly(true)
    .withEthnicity(["japanese"])
    .withExcludeEditorialUseOnly(true)
    .withExcludeNudity(true)
    .withResponseField(["id"])
    .withFileType(["eps", "jpg"])
    .withGraphicalStyle(["illustration"])
    .withKeywordId([1234, 5678])
    .withMinimumSize("small")
    .withNumberOfPeople(["group"])
    .withOrientation(["horizontal", "vertical"])
    .withPage(3)
    .withPageSize(50)
    .withPhrase("cat")
    .withPrestigeContentOnly(true)
    .withProductType(["easyaccess"])
    .withSafeSearch(true)
    .withSortOrder("newest")
    .execute();

client.searchimageseditorial()
    .withAcceptLanguage("en-us")
    .withAgeOfPeople(["adult"])
    .withArtist(["Linda Raymond"])
    .withCollectionCode(["ARF"])
    .withCollectionsFilterType("exclude")
    .withColor("#002244")
    .withComposition(["headshot"])
    .withEditorialSegments(["archival", "publicity"])
    .withEmbedContentOnly(true)
    .withEndDate("2015-04-01")
    .withEntityUris([123, 456])
    .withEntityUris(["123", "456"])
    .withEthnicity(["black"])
    .withEventId([1234, 5678])
    .withExcludeNudity(true)
    .withResponseField(["id", "artist"])
    .withFileType(["jpg"])
    .withGraphicalStyle(["fine_art"])
    .withKeywordId([1234])
    .withMinimumQualityRank(2)
    .withMinimumSize("small")
    .withNumberOfPeople(["one"])
    .withOrientation(["horizontal"])
    .withPage(3)
    .withPageSize(50)
    .withPhrase("monkey")
    .withProductType(["editorialsubscription"])
    .withSortOrder("newest")
    .withSpecificPeople("reggie jackson")
    .withStartDate("2015-04-01")
    .execute();

client.searchvideos()
    .withAcceptLanguage("en-us")
    .withAgeOfPeople(["adult"])
    .withCollectionCode(["WRI"])
    .withCollectionsFilterType("exclude")
    .withEditorialVideoType("raw")
    .withEditorialVideoType(["raw", "produced"])
    .withExcludeNudity(true)
    .withResponseField(["id"])
    .withFormatAvailable("hd")
    .withFrameRate(["24", "29.97"])
    .withKeywordId([1234, 5678])
    .withLicenseModel(["rightsmanaged", "royaltyfree"])
    .withPage(3)
    .withPageSize(50)
    .withPhrase("cat")
    .withProductType(["easyaccess"])
    .withSortOrder("newest")
    .withSpecificPeople("reggie jackson")
    .execute();

client.searchvideoscreative()
    .withAcceptLanguage("en-us")
    .withAgeOfPeople(["adult"])
    .withCollectionCode(["WRI"])
    .withCollectionsFilterType("exclude")
    .withExcludeEditorialUseOnly(true)
    .withExcludeNudity(true)
    .withResponseField(["id"])
    .withFormatAvailable("hd")
    .withFrameRate(["24"])
    .withKeywordId([1234])
    .withLicenseModel(["royaltyfree"])
    .withMinClipLength(15)
    .withOrientation(["horizontal", "square"])
    .withPage(3)
    .withPageSize(50)
    .withPhrase("cat")
    .withProductType(["easyaccess"])
    .withSafeSearch(true)
    .withSortOrder("newest")
    .execute();

client.searchvideoseditorial()
    .withAcceptLanguage("en-us")
    .withAgeOfPeople(["adult"])
    .withCollectionCode(["ARF"])
    .withCollectionsFilterType("exclude")
    .withEditorialVideoType("raw")
    .withEndDate("2023-12-31")
    .withEntityUris([123, 456])
    .withExcludeNudity(true)
    .withResponseField(["id"])
    .withFormatAvailable("hd")
    .withFrameRate(["29.97"])
    .withKeywordId([5678])
    .withOrientation(["horizontal", "vertical"])
    .withPage(3)
    .withPageSize(50)
    .withPhrase("monkey")
    .withProductType(["editorialsubscription"])
    .withSortOrder("newest")
    .withSpecificPeople("reggie jackson")
    .withStartDate("2023-01-01")
    .execute();

// Custom parameters and headers come from the base class, so they must be
// available on every request and must preserve the concrete type when chained
// in any order.
client.searchimagescreative()
    .withPage(1)
    .withCustomParameter("safe_search", "true")
    .withCustomHeader("gi-country-code", "CAN")
    .withPageSize(1)
    .withPhrase("beach")
    .execute();

client.images().withCustomHeader("gi-country-code", "CAN").withId("123").execute();
client.customrequest().withCustomParameter("x", "y").withRoute("r").withMethod("get").execute();

// The base class members are part of the public surface.
const request = client.searchimages();
const headers: Record<string, string> = request.headers;
const params: Record<string, string> = request.params;
const host: string = request.hostName;
request.addParameter("phrase", "cat");
request.addParameter("page", 1);
request.addParameter("exclude_nudity", true);
request.addParameter("file_types", ["eps", "jpg"]);

// The data fields the search classes initialise are externally assignable.
request.page = 2;
request.pageSize = 10;
request.phrase = "cat";
request.fields = ["id"];
request.eventIds = [1234];
