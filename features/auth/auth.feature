Feature: Authentication tests
    Scenario: Register with payload
            Given I have a payload
                | name       | email          | password | role |
                | tony stark | stark@stark.fr | ironman  | user |
            When I request "POST" "/users/register" with payload
            Then The response status should be 200
            And I should have an object with the following attributes
                | name       | email          | password | role |
                | tony stark | stark@stark.fr | ironman  | user |

        Scenario: Login with correct credentials
            Given I have a payload
                | name       | email          | password | role |
                | tony stark | stark@stark.fr | ironman  | user |

            When I request "POST" "/users/authenticate" with payload
            Then The response status should be 200
            And I should have the "token" attribute

        Scenario: Login with invalid credentials
        Given I have a payload
                | name       | email          | password | role |
                | tony stark | stark@stark.fr | batman   | user |
                | tony stark | ironman@iron.av| ironman  | user |
                | tony stark | |  | user |
            When I request "POST" "/users/authenticate" with payload
            Then The response status should be 400