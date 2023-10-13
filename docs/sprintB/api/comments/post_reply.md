# Action

**Method:** POST



# Description

Comment on a post.

# Request Parameters


* **Headers**

| Key           | Value                            | Description                                                     |
|-------------  |----------------------------------|-----------------------------------------------------------------|
| Authorization | acccess token                    | It is required for the user to comment on a post.               |

* **Query Parameters**

| Parameter   | Type   | Description          |
|-------------|--------|----------------------|
|  slug    | string |   | postID              |

* **Body**

```json
{
  "slug": "string",
  "userId": "string",
  "comment": "string"
}
```

# Possible response codes and results


## Successful responses

>Response for a successful request with a valid postID.
  

| Code | Description           |
|------|-----------------------|
| 200  | OK                    | 

* **Body**

```text
OK
```

## Client error responses

>Response for a request with an expired token.

|Code     | Description | 
|---------|-------------|
| 403     | Forbidden   | 

* **Body**

```json
{
  "message": "Token signature expired."
}
```


>Response for a request with an invalid postID.

|Code     | Description |
|---------|-------------|
| 404     | Not Found   |

* **Body**

```json
{
  "message": "Couldn't find a post by slug {postID}."
}
```

## Server error responses

>Response for a request with an invalid number of characters in the comment.

|Code      | Description           |
|----------|-----------------------|
| 500      | Internal Server Error | 

* **Body**

```json
{
  "message": "TypeError: Cannot read property 'toString' of undefined"
}
```

## Reference to related use cases and acceptance criteria


**User Story 06:** Comment on a post

**Acceptance Criteria 1:** The user must be authenticated to comment on a post.

**Acceptance Criteria 2:** A comment must have between 20 and 10000 characters.

## Notes

The validation of the number of caracters in the comment is done in the frontend. The backend only checks if the comment is a string.