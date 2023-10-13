# Action

**Method:** Post 

**URL:** http://localhost:5001/api/v1/comments/:commentId/reply

# Description

Reply to a comment.

# Request Parameters

>
* **Headers**

| Key           | Value                            | Description          |
|-------------  |----------------------------------|----------------------|
| Authorization | acccess token                    | The access token is necessary to reply to a comment.|


>
* **Query parameters**

| Key           | Value                            | Description          |
|-------------  |----------------------------------|----------------------|
| slug        | string                            | postID |

>
* **Body**

| Key           | Value                            | Description          |
|-------------  |----------------------------------|----------------------|
| Comment | String                  | Writing a comment |
| ParentCommentId | String                  | Identifying the parent comment ID |


# Possible response codes and results


## Successful responses

>Response for an existing user with a valid password and username
  

| Status Code   | Description           | 
|-----------------------|---------------------------------|
| 200    | OK                    |    




## Client error responses

> Response for trying to reply to a comment with an expired token.

 | Status Code   | Description           | 
|------------------------|---------------------------------|
| 403   | Forbidden             |   


* **Body**

```json 
{ 
    "message": "Token signature expired."
}
```

## Client error responses

> Response for trying to reply to a comment with a slug that does not exist.

 | Status Code   | Description           | 
|------------------------|---------------------------------|
| 404   | Not Found          |   


* **Body**

```json 
{ 
    "message": "Couldn't find a post by slug {}."
}
```

## Server error responses

>Response for trying to reply to a comment with an empty  slug.

 | Status Code   | Description           | 
|------------------------|---------------------------------|
| 500   | Internal Server Error          |   


* **Body**

```json 
{ 
    "message": "TypeError: Cannot read property 'toString' of undefined"
}
```


## Reference to related use cases and acceptance criteria

**User Story 06:** Comment on a post

**AC1:** The user must be authenticated to comment on a post.
