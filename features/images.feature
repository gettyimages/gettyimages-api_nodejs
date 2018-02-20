Feature: Image Details
  To create a rockin website with sweet images
  As a developer that wants to get some image details
  I'd need to be able to get detailed metadata about some images

Scenario: Resource Owner Credentials
	Given I have an apikey
	And an apisecret
	And a username
	And a password
	And I have an image id I want details on
	When I retrieve image details
	Then I get a response back that has my image details

Scenario: Client Credentials
	Given I have an apikey
	And an apisecret
	And I have an image id I want details on
	When I retrieve image details
	Then I get a response back that has my image details

Scenario: Specify fields in image detail request
	Given I have an apikey
	And an apisecret
	And I have an image id I want details on
	And I specify images field caption
	And I specify images field title
	When I retrieve image details
	Then I get a response back that has my image details
	And the response contains caption
	And the response contains title

Scenario: Specify multiple ids in batch image detail request
	Given I have an apikey
	And an apisecret
	And I have a list of image ids I want details on
	When I retrieve details for the images
	Then I get a response back that has details for multiple images

Scenario: SDK client throws an exception when an image is not found
	Given I have an apikey
	And an api secret
	And a username
	And a password
	And a non-existent image id
	When I retrieve image details
	Then an error is returned
	And the error explains that the image was not found