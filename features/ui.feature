# Feature file for generic UI elements

Feature: UI Elements

Scenario: Display header bar
Given that I am a regular user
When I go to the home page
Then A white Div html element will be displayed at the top of the page
And It will be of Height 150px

Scenario: Display page header
Given That I am a regular user
When I go to the home page
Then A header 'Devtrac Global' will be displayed on the left side of the header bar