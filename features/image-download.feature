Feature: Image Download
  In order to serve image content on my site
  as a developer consuming the sdk
  I need to be able to download images

Scenario: Attempt download with Client Credentials
Given I have an apikey
And an apisecret
When I request for any image to be downloaded
Then the url for the image is returned

Scenario: Download image with Resource Owner credentials
Given I have an apikey
And an apisecret
And a username
And a password
When I request for any image to be downloaded
Then the url for the image is returned

Scenario Outline: Download image with file type specified
Given I have an apikey
And an apisecret
And a username
And a password
And I specify a file type of <value>
When I request for any image to be downloaded
Then the url for the image is returned
And the url has a <value> file type
Examples:
| value |
| eps   |
| jpg   |

Scenario: Download image with height specified
Given I have an apikey
And an apisecret
And a username
And a password
And a pixel height
When I request for any image to be downloaded
Then the url for the image is returned

Scenario: Download largest image 
Given I have an apikey
And an apisecret
And a username
And a password
When I request for any image to be downloaded
Then the url for the image is returned