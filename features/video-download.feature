Feature: Video Download
  In order to serve video content on my site
  as a developer consuming the sdk
  I need to be able to download videos

Scenario: Attempt download with Client Credentials
Given I have an apikey
And an apisecret
When I request for any video to be downloaded
Then the url for the video is returned

Scenario: Download video with Resource Owner credentials
Given I have an apikey
And an apisecret
And a username
And a password
When I request for any video to be downloaded
Then the url for the video is returned

Scenario: Download video with size specified
Given I have an apikey
And an apisecret
And a username
And a password
And a download size
When I request for any video to be downloaded
Then the url for the video is returned

Scenario: Download largest video 
Given I have an apikey
And an apisecret
And a username
And a password
When I request for any video to be downloaded
Then the url for the video is returned
