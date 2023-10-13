# Action

**Method:** GET

# URL

http://localhost:5001/api/v1/posts/?slug={slug}


# Description

Get post by slug in the Domain Driven Designers forum website.


# Request Parameters 

>
* **Headers**

Not applicable.

>
* **Query parameters**

| Key        | Value     | Description                          |
|------------|-----------|--------------------------------------|
|  slug      | string    | Identifier of the post to retrieve   | 

>
* **Body**
Not applicable.



# Possible response codes and results

## Successful responses 

1. Response for a successful request with a valid slug - text post.

| Status Code | Description           |               
|-------------|-----------------------|
| 200         | OK                    | 
  
**Response Message**

```json
{
  "post": {
    "slug": "string",
    "title": "string",
    "createdAt": "date",
    "memberPostedBy": {
      "reputation": 0,
      "user": {
        "username": "string"
      }
    },
    "numComments": "number",
    "points": "number",
    "text": "string",
    "link": "",
    "type": "string",
    "wasUpvotedByMe": "boolean",
    "wasDownvotedByMe": "boolean"
  }
}
```


2. Response for a successful request with a valid slug - link post.

| Code | Description           |
|------|-----------------------|
| 200  | OK                    | 

**Response Message**
```json
{
  "post": {
    "slug": "string",
    "title": "string",
    "createdAt": "date",
    "memberPostedBy": {
      "reputation": 0,
      "user": {
        "username": "string"
      }
    },
    "numComments": "number",
    "points": "number",
    "text": "",
    "link": "link",
    "type": "link",
    "wasUpvotedByMe": "boolean",
    "wasDownvotedByMe": "boolean"
  }
}
```
   
## Client error responses

 - Not applicable.

## Server error responses

>Response for non existing slug

|Code  | Description    | Response Message         |
|-------------|--------|----------------------|
| 500      | Internal Server Error | {"message": "Couldn't find a post by slug {undefined}."}  |

>Response for invalid slug

|Code  | Description    | Response Message         |
|-------------|--------|----------------------|
| 500      | Internal Server Error | {"message":"Couldn't find a post by slug {invalid slug}."
"}  |

>Response for a empty slug

|Code  | Description    | Response Message         |
|-------------|--------|----------------------|
| 500      | Internal Server Error | {"message":"Couldn't find a post by slug {}."
"}  |


## Reference to related use cases and acceptance criteria

**User Story 008:** View post

**AC1:** When selecting the post's title, the visitor must be redirected to the details.










