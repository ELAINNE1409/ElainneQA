## Action

**Method:** Post 

# URL

http://localhost:5001/api/v1/users/logout

# Description

As a users I want to logout from the Domain Driven Designers forum site.

# Parameters

| Parameter   | Type   | Description          |
|-------------|--------|----------------------|
|  No parameters| Authorization | acccess token|



# Possible response codes and results


## Successful response

>Response: The user session is terminated, and the user no longer has access to authenticated features. 

| Code | Description           | Response Message                |
|------|-----------------------|---------------------------------|
| 200  | OK                    |  { "accessToken": "...", "refreshToken": "..." }    | 


## Server error responses

>Response: There are no specific error response codes or results defined for the logout.

|Code  | Description    | Response Message         |
|-------------|--------|----------------------|
| 500      | Internal Server Error | { "message": "TypeError: Cannot read property 'toString' of undefined"};  |

## Client error response

>Response: The logout operation cannot be completed.

|Code  | Description    | Response Message         |
|-------------|--------|----------------------|
| 403....| The user is not authenticated | { "message": "token is invalid" }   |




## Reference to related use cases and acceptance criteria

**User story 11:** Perform a logout

**Acceptance Criteria 1:** After a successful logout, the user must not have access to the features that require authentication.

