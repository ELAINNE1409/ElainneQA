# Action

**Method:** GET

**URL**

http://localhost:5001/api/v1/comments/{commentId}



# Description

This endpoint retrieves a comment by its ID.

# Request Parameters


* **Headers**

| Key           | Value                            | Description                                                     |
|-------------  |----------------------------------|-----------------------------------------------------------------|
| Authorization | acccess token                    | It is required for the user to retrieve a comment by its ID.    |

* **Query Parameters**

| Parameter   | Type   | Description                             |
|-------------|--------|-----------------------------------------|
| commentId   | string | Identifier of the comment to retrieve   |


# Possible response codes and results


## Successful responses

>Response for a successful request with a valid commentId.
  

| Code | Description           |
|------|-----------------------|
| 200  | OK                    | 

* **Body**

```json
{
    "comment": {
        "postSlug": "string",
        "commentId": "string",
        "parentCommentId": "string or null",
        "text": "string",
        "member": {
            "reputation": "number",
            "user": {
                "username": "string"
            }
        },
        "createdAt": "string",
        "childComments": "array of comments",
        "postTitle": "string",
        "points": "number",
        "wasUpvotedByMe": "boolean",
        "wasDownvotedByMe": "boolean"
    }
}
```


## Client error responses

>Response for an invalid commentId.

|Code  | Description | 
|------|-------------|
| 404  | Not Found   |

* **Body**

```json
{
    "message": "Couldn't find a comment by comment id {...}."
}
```

## Server error responses

>Response for an invalid request.

|Code  | Description           |
|------|-----------------------|
| 500  | Internal Server Error | 

* **Body**

```json
{
    "message": "An unexpected error occurred."
}
```


# Reference to related use cases and acceptance criteria



**User Story 08:** View post


**Acceptance Criteria 2:** The visitor must be able to access the details of post's comments through "creation date".
