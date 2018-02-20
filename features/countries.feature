Feature: Countries
  In order to supply the right country codes to api calls
  as a developer that wants to programatically get assets by country
  I need be able to get the list of countries that are available

Scenario: Get Countries with Client Credentials
  Given I have an apikey
    And an apisecret
  When I retrieve countries
  Then I get a response back that has a list of countries
