# Action

**Method:** Post 

# URL

http://localhost:5001/api/v1/posts/

# Description

Create a post in the Domain Driven Designers forum website.

# Request Parameters

>
* **Headers**

Authorization: Access token

>
* **Query parameters**

Not applicable.

>
* **Body**

1. Text post

```json
{
  "title":"string",
  "postType":"string",
  "text":"string",
  "link":""
}
```

2. Link post

```json
{
  "title":"string",
  "postType":"link",
  "text":"",
  "link":"url"
}
```


# Possible response codes and results


## Successful responses

>Response for a post with a valid title, postType and text.
  

| Code | Description           | Response Message                |
|------|-----------------------|---------------------------------|
| 200  | OK                    |  OK                             | 



## Client error responses

>Response for a non authenticated user.

|Code  | Description    | Response Message         |
|-------------|--------|----------------------|
| 403     | Forbidden | {"message":"No access token provided"}   |

>Response for a invalid or expired token.

|Code  | Description    | Response Message         |
|-------------|--------|----------------------|
| 403     | Forbidden | {"message":"Token signature expired."}   

## Server error responses

>Response for non existing or invalid: title, postType and text ou link.

|Code  | Description    | Response Message         |
|-------------|--------|----------------------|
| 500      | Internal Server Error | { "message": "TypeError: Cannot read property 'toString' of undefined"};  |


## Reference to related use cases and acceptance criteria

**User Story 003:** Create a post

**AC1:** The user must be authenticated to create a post.

**AC2:** All requested data (title and text/link) must be filled in.

**AC3:** The title must have between 2 and 85 characters.

**AC4:** A text post type must have between 20 and 10000 characters.

**AC5:** For a text post type, text formatting options must be available and accessible (bold, italic, underline, hyperlink and code formatting).

**AC6:** A link post type must have between 8 and 500 characters.

**AC7:** When the submitted data is valid, success notifications must be displayed.

**AC8:** When the submitted data is invalid, insuccess notifications must be displayed.
