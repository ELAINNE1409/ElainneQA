# Action

**Method:** POST

# URL

http://localhost:5001/api/v1/comments/:commentld/downvote

# Description

Vote negatively on a comment on the DDD fórum.

# Parameters

| Parameter   | Type   | Description          |
|-------------|--------|----------------------|
| comment_id      | string | Comment id with negative vote |



# Possible response codes and results


## Successful responses

>Response for a successful request with a valid commentId.
  

| Code | Description           | Response Message                |
|------|-----------------------|---------------------------------|
| 200  | OK                    |  OK|
   | 


## Client error responses

>Response for a downvote of a comment request, when access token signature failed.

| Code    | Description    | Response Message         |
|---------|----------------|--------------------------|
| 403     | Forbidden      | {"message":"Token signature expired."}   |


| Code | Description           | Response Message                |
|------|-----------------------|---------------------------------|
| 404  | not found             | "Couldn't find a comment with id {:commentId}." |

## Client error responses

>Response 

|Code  | Description    | Response Message         |
|-------------|--------|----------------------|
| 400      | Bad request | {"message": "."}  |


## Server error responses

>Response for an invalid request.

|Code  | Description    | Response Message         |
|-------------|--------|----------------------|
| 500      | Internal Server Error | {"message": "An unexpected error occurred."}  |

# Reference to related use cases and acceptance criteria


**User Story 005:** Vote on a comment

**Acceptance Criteria 1:**  When the user submits a POST request to the /api/v1/comments/{commentId}/downvote route with a valid comment ID, the system must record the negative vote for the corresponding comment.
