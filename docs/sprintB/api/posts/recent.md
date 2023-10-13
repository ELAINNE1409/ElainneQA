# Action

**Method:** Get

**URL:** http://localhost:5001/api/v1/posts/recent


# Description

Gets the most recent posts in the Domain Driven Designers forum website, as a user or a visitor.


# Requeat parameters

>
* **Headers**

| Key           | Value                            | Description          |
|-------------  |----------------------------------|----------------------|
| Authorization | acccess token                    | This header is optional for a user that wants to get popular posts.

>
* **Query parameters**

| Key           | Value                            | Description          |
|-------------  |----------------------------------|----------------------|
| Offset        | null                             | It specifies the number of posts to skip. Should be optional, but only assumes a null value. |


# Possible response codes and results

## Successful responses

>Response for a get recent posts request, for a visitor.

>Response for a get recent posts request, when the user is logged in and the access token is correct or is empty or is not included.

* **Status**

| Code | Description           |
|------|-----------------------|
| 200  | OK                    |


* **Body**

```json
{
    "posts": [
        {
            "slug": "string",
            "title": "string",
            "createdAt": "string",
            "memberPostedBy": {
                "reputation": "number",
                "user": {
                    "username": "string"
                }
            },
            "numComments": "number",
            "points": "number",
            "text": "string",
            "link": "",
            "type": "text",
            "wasUpvotedByMe": "boolean",
            "wasDownvotedByMe": "boolean"
        },
        {
            "slug": "string",
            "title": "string",
            "createdAt": "string",
            "memberPostedBy": {
                "reputation": "number",
                "user": {
                    "username": "string"
                }
            },
            "numComments": "number",
            "points": "number",
            "text": "string",
            "link": "",
            "type": "text",
            "wasUpvotedByMe": "boolean",
            "wasDownvotedByMe": "boolean"
        },
        {
            "slug": "string",
            "title": "string",
            "createdAt": "string",
            "memberPostedBy": {
                "reputation": "number",
                "user": {
                    "username": "string"
                }
            },
            "numComments": "number",
            "points": "number",
            "text": "string",
            "link": "",
            "type": "text",
            "wasUpvotedByMe": "boolean",
            "wasDownvotedByMe": "boolean"
        }
    ]
}
```

## Client error responses 

>Response for a get recent posts request, when the user is logged in but the access token expired or is not correct. 

* **Status**

| Code | Description           |
|------|-----------------------|
| 403  | Forbidden             |

* **Body**

```json 
{ 
    "message": "Token signature expired."
}
```

## Server error responses

>Response for a get recent posts request, when the offset parameter is not null. 

* **Status**

| Status Code   | Description           | 
|--------|-----------------------|---------------------------------|
| 500    | Internal Server Error                  |   


* **Body**

```json 
{ 
    "message": "An unexpected error occurred."
}
```

## Reference to related use cases and acceptance criteria

**User Story 01: Sort the posts**

* **Acceptance Criteria 1:** The sort functionality doesn't require an authentication.
* **Acceptance Criteria 2:** The visitor must be able to sort the posts based on two criteria: Popular and New.