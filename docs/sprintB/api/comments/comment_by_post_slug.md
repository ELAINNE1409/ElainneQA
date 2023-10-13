# Action

**Method:** GET

**URL**

  * http://localhost:5001/api/v1/comments/?slug={postID}

# Description

This endpoint retrieves all the comments of a post.

# Request Parameters

* **Headers**

| Key           | Value                            | Description                                                     |
|-------------  |----------------------------------|-----------------------------------------------------------------|
| Authorization | acccess token                    | It is required for the user to retrieve the comments of a post. |

* **Query parameters**

| Parameter   | Type   | Description                                   |
|-------------|--------|-----------------------------------------------|
|  slug       | string | Identifier of the post comments to retrieve   | 


# Possible response codes and results


## Successful responses

>Response for a successful request with a valid post slug.
  

| Code | Description           |
|------|-----------------------|
| 200  | OK                    |

```json
{
  "comments": [
    {
      "postSlug": "string",
      "commentId": "string",
      "parentCommentId": "string",
      "text": "string",
      "member": {
        "reputation": "number",
        "user": {
          "username": "string"
        }
      },
      "createdAt": "string",
      "childComments": [],
      "postTitle": "string",
      "points": "number",
      "wasUpvotedByMe": "boolean",
      "wasDownvotedByMe": "boolean"
    }
  ]
}
```

>Response for an invalid post slug.

|Code  | Description |
|------|-------------|
| 200  | OK          | 

```json
{
  "comments": []
}
```

## Server error responses

>Response for an invalid request.

|Code  | Description           |
|------|-----------------------|
| 500  | Internal Server Error |

```json
{
  "message": "An unexpected error occurred."
}
```

# Reference to related use cases and acceptance criteria



**User Story 08:** View post

**Acceptance Criteria 1:** When selecting the post's title, the visitor must be redirected to the details.

**Acceptance Criteria 2:** The visitor must be able to access the details of post's comments through "creation date".
