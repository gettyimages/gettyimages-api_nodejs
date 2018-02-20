Feature: Search for Videos
	As a consumer of the SDK
	I want to search for videos
	So I can use the videos in my application

Scenario Outline: SDK client performs video searches
Given I have an apikey
And an api secret
And a <searchtype> video search
And a search phrase
When the video search is executed
Then the status is success
And video search results are returned

Examples:
| searchtype |
| blended    |
| creative   |
| editorial  |

Scenario: SDK client can specify the largest downloads field on video search
  Given I have an apikey
  And an api secret
  And a username
  And a password
  And a blended video search
  And largest_downloads field is specified
  When the video search is executed
  Then the status is success
  And video search results are returned
  And the largest_download field is returned

Scenario: SDK client can specify age of people filter on video search
  Given I have an apikey
  And an api secret
  And a blended video search
  And age of people filter is specified
  When the video search is executed
  Then the status is success
  And video search results are returned

Scenario: SDK client can specify collection codes filter on video search
  Given I have an apikey
  And an api secret
  And a blended video search
  And collection codes filter is specified
  When the video search is executed
  Then the status is success
  And video search results are returned

Scenario: SDK client can specify exclude nudity filter on video search
  Given I have an apikey
  And an api secret
  And a blended video search
  And exclude nudity filter is specified
  When the video search is executed
  Then the status is success
  And video search results are returned

Scenario: SDK client can specify format filter on video search
  Given I have an apikey
  And an api secret
  And a blended video search
  And format filter is specified
  When the video search is executed
  Then the status is success
  And video search results are returned

Scenario: SDK client can specify product type filter on video search
  Given I have an apikey
  And an api secret
  And a username
  And a password
  And a blended video search
  And product type filter is specified
  When the video search is executed
  Then the status is success
  And video search results are returned

Scenario: SDK client can specify specific people filter on video search
  Given I have an apikey
  And an api secret
  And a blended video search
  And specific people filter is specified
  When the video search is executed
  Then the status is success
  And video search results are returned

Scenario: SDK client can specify sort order on video search
Given I have an apikey
And an api secret
And a blended video search
And sort order is specified
When the video search is executed
Then the status is success
And video search results are returned

Scenario: SDK client can specify paging info on video search
Given I have an apikey
And an api secret
And a blended video search
And page number is specified
And page size is specified
When the video search is executed
Then the status is success
And video search results are returned

Scenario: SDK client can specify license model filter on creative video search
Given I have an apikey
And an api secret
And a creative video search
And license model filter is specified
When the video search is executed
Then the video search status is success
And video search results are returned